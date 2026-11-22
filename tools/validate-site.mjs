// Checks a library's site.yml against tools/site.schema.json.
// Run: node tools/validate-site.mjs path/to/site.yml
// A missing file is not an error: the website then keeps the description
// written in website/assets/js/projects.js.
import fs from "node:fs";
import { parseSiteYml } from "./site-yml.mjs";

const file = process.argv[2] || "site.yml";

if (!fs.existsSync(file)) {
  console.log(`::notice::${file} not found: the website keeps the description from projects.js`);
  process.exit(0);
}

const { errors } = await parseSiteYml(fs.readFileSync(file, "utf8"));
if (errors.length) {
  for (const e of errors) console.log(`::error file=${file}::${e}`);
  console.log(`${file}: ${errors.length} error(s)`);
  process.exit(1);
}
console.log(`${file}: OK`);
