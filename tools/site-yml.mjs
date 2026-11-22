// Parses and validates a library's site.yml against tools/site.schema.json.
// Used by tools/fetch-libraries.mjs (website build) and tools/validate-site.mjs
// (CI of each library, through .github/workflows/library-release.yml).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const schema = JSON.parse(fs.readFileSync(path.join(here, "site.schema.json"), "utf8"));

async function loadYamlParser() {
  try {
    return (await import("yaml")).parse;
  } catch {
    throw new Error('the "yaml" package is missing: run "npm install" in the website repository');
  }
}

// Validator for the subset of JSON Schema used by site.schema.json:
// type, required, properties, additionalProperties: false, items, enum,
// minLength, maxLength, maxItems, pattern.
export function validate(value, node = schema, where = "site.yml") {
  const errors = [];
  const type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;

  if (node.type && node.type !== type) {
    errors.push(`${where}: expected ${node.type}, got ${type}`);
    return errors;
  }
  if (node.enum && !node.enum.includes(value)) {
    errors.push(`${where}: "${value}" is not one of ${node.enum.join(", ")}`);
  }
  if (type === "string") {
    if (node.minLength !== undefined && value.length < node.minLength) errors.push(`${where}: is empty`);
    if (node.maxLength !== undefined && value.length > node.maxLength) {
      errors.push(`${where}: longer than ${node.maxLength} characters (${value.length})`);
    }
    if (node.pattern && !new RegExp(node.pattern).test(value)) {
      errors.push(`${where}: "${value}" does not match ${node.pattern}`);
    }
  }
  if (type === "array") {
    if (node.maxItems !== undefined && value.length > node.maxItems) {
      errors.push(`${where}: more than ${node.maxItems} items (${value.length})`);
    }
    if (node.items) value.forEach((v, i) => errors.push(...validate(v, node.items, `${where}[${i}]`)));
  }
  if (type === "object") {
    for (const key of node.required || []) {
      if (!(key in value)) errors.push(`${where}: missing "${key}"`);
    }
    for (const [key, v] of Object.entries(value)) {
      const child = node.properties && node.properties[key];
      if (child) errors.push(...validate(v, child, `${where}.${key}`));
      else if (node.additionalProperties === false) {
        errors.push(`${where}: unknown field "${key}"` + (where === "site.yml" ? hint(key) : ""));
      }
    }
  }
  return errors;
}

function hint(key) {
  if (["status", "stable", "version"].includes(key)) return " (taken from GitHub Releases)";
  if (["featured", "homeSection", "order"].includes(key)) return " (set by the website in projects.js)";
  return "";
}

// Returns { data, errors }. data is null when the file is not valid.
export async function parseSiteYml(text) {
  const parse = await loadYamlParser();
  let data;
  try {
    data = parse(text);
  } catch (e) {
    return { data: null, errors: [`site.yml: not valid YAML: ${e.message.split("\n")[0]}`] };
  }
  if (data === null || data === undefined) data = {};
  const errors = validate(data);
  return { data: errors.length ? null : data, errors };
}
