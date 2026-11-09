// Writes the project and article cards into projects.html and articles.html as
// static HTML, so search engines see them without running JavaScript.
// main.js re-renders the same cards in the browser (filters, animation).
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

inject("projects.html", "projects", ctx.SFS_PROJECTS.map((p) => R.card(p, true)).join(""));
inject("articles.html", "articles", ctx.SFS_ARTICLES.map(R.article).join(""));
