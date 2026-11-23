#!/usr/bin/env node
/**
 * qa:design — assert RTL/Hebrew shell + brand CSS tokens in source.
 * Run: node scripts/qa/assert-design.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const failures = [];

function read(rel) {
  return readFileSync(resolve(root, rel), "utf8");
}

function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

const layout = read("src/app/layout.tsx");
assert(layout.includes('lang="he"'), "layout must set lang=he");
assert(layout.includes('dir="rtl"'), "layout must set dir=rtl");
assert(layout.includes("themeInitScript"), "layout must bootstrap theme before paint");

const css = read("src/app/globals.css");
assert(css.includes("--brand:"), "globals.css must define --brand");
assert(css.includes("@media print"), "globals.css must include print stylesheet");
assert(!css.includes("animation-fill-mode: both") && !/animate-rise[\s\S]*both/.test(css), "hero rise animations must not use fill-mode both (LCP)");

const categories = read("src/lib/content/categories.ts");
assert(
  !categories.includes('"/category/'),
  "category hrefs must be /news/* not /category/*",
);
assert(categories.includes('"/news/markets"'), "markets href must be /news/markets");

const header = read("src/components/layout/site-header.tsx");
assert(!header.includes('"use client"'), "SiteHeader should be a server component");

if (failures.length) {
  console.error("[qa:design] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:design] ok");
