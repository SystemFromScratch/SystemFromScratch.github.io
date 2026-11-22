// Writes the project and article cards into projects.html and articles.html as
// static HTML, so search engines see them without running JavaScript.
// main.js re-renders the same cards in the browser (filters, animation).
// The cards include the library data in libraries.js (tools/fetch-libraries.mjs).
// It also updates every element with a data-release="owner/repo" attribute in
// the HTML pages (e.g. the library cards on the home page) to the latest version.
// Run: node tools/prerender.mjs   (also runs in the deploy workflow)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const site = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "website");
const read = (p) => fs.readFileSync(path.join(site, p), "utf8");

const ctx = { document: { addEventListener() {} } };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(read("assets/js/projects.js"), ctx);
if (fs.existsSync(path.join(site, "assets/js/libraries.js"))) {
  vm.runInContext(read("assets/js/libraries.js"), ctx);
}
vm.runInContext(read("assets/js/main.js"), ctx);
const R = ctx.SFS_RENDER;
if (!R) throw new Error("main.js does not expose window.SFS_RENDER");

// Static copies are visible without JavaScript, so they skip the reveal animation.
const noReveal = (html) => html.replace(/ reveal"/g, '"');

function inject(file, name, html) {
  const src = read(file);
  const re = new RegExp(`(<!-- prerender:${name} -->)[\\s\\S]*?(<!-- /prerender:${name} -->)`);
  if (!re.test(src)) throw new Error(`markers for ${name} missing in ${file}`);
  fs.writeFileSync(path.join(site, file), src.replace(re, `$1${noReveal(html)}$2`));
  console.log(`${file}: ${name} prerendered`);
}

const projects = R.merge(ctx.SFS_PROJECTS, ctx.SFS_LIBRARIES);
inject("projects.html", "projects", projects.map((p) => R.card(p, true)).join(""));
inject("articles.html", "articles", ctx.SFS_ARTICLES.map(R.article).join(""));

// <span class="meta is-stable" data-release="AntonVynohradov/isotp-c">v2.0.1 · Stable</span>
// gets the version of the latest release as its text; on elements with the class
// "meta" the is-stable class follows the release (green or amber dot).
const libraries = ctx.SFS_LIBRARIES || {};
const escapeHtml = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const RELEASE_RE = /<([a-z]+)\b([^>]*?\sdata-release="([^"]+)"[^>]*)>([^<]*)<\/\1>/g;
for (const file of fs.readdirSync(site).filter((f) => f.endsWith(".html"))) {
  const src = read(file);
  let count = 0;
  const out = src.replace(RELEASE_RE, (all, tag, attrs, repo, text) => {
    const lib = libraries[R.repoKey(`https://github.com/${repo}`)];
    if (!lib || !lib.release) return all;
    count++;
    const stable = !lib.release.prerelease;
    attrs = attrs.replace(/\sclass="([^"]*)"/, (m, cls) => {
      const list = cls.split(/\s+/).filter((c) => c && c !== "is-stable");
      if (list.includes("meta") && stable) list.push("is-stable");
      return ` class="${list.join(" ")}"`;
    });
    return `<${tag}${attrs}>${escapeHtml(R.releaseStatus(lib.release))}</${tag}>`;
  });
  if (out !== src) fs.writeFileSync(path.join(site, file), out);
  if (count) console.log(`${file}: ${count} release label(s) updated`);
}
