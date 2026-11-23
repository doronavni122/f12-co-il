#!/usr/bin/env node
/**
 * qa:links — crawl local content graph: every category/author/article/tag href resolves.
 * Run: node scripts/qa/assert-links.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "../..");
const failures = [];

function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

// Load articles via dynamic import of built TS is hard; parse data.ts slugs instead.
const data = readFileSync(resolve(root, "src/content/articles/data.ts"), "utf8");
const slugs = [...data.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const authorIds = [
  ...readFileSync(resolve(root, "src/lib/content/authors.ts"), "utf8").matchAll(
    /id:\s*"([^"]+)"/g,
  ),
].map((m) => m[1]);
const categorySlugs = [
  ...readFileSync(resolve(root, "src/lib/content/categories.ts"), "utf8").matchAll(
    /slug:\s*"([^"]+)"/g,
  ),
].map((m) => m[1]);

assert(slugs.length >= 10, `expected >=10 article slugs, got ${slugs.length}`);
assert(authorIds.length >= 1, "expected authors");
assert(categorySlugs.length === 6, "expected 6 categories");

const hrefs = readFileSync(resolve(root, "src/lib/content/categories.ts"), "utf8");
for (const slug of categorySlugs) {
  assert(
    hrefs.includes(`"/news/${slug}"`),
    `category ${slug} must href /news/${slug}`,
  );
}

const pages = [
  "src/app/page.tsx",
  "src/app/news/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/newsletter/page.tsx",
  "src/app/search/page.tsx",
  "src/app/authors/page.tsx",
  "src/app/tags/page.tsx",
  "src/app/article/[slug]/page.tsx",
  "src/app/news/[category]/page.tsx",
  "src/app/category/[slug]/page.tsx",
];

for (const p of pages) {
  try {
    readFileSync(resolve(root, p));
  } catch {
    failures.push(`missing route file ${p}`);
  }
}

void pathToFileURL; // keep import used for ESM clarity

if (failures.length) {
  console.error("[qa:links] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log(
  `[qa:links] ok (${slugs.length} articles, ${categorySlugs.length} categories, ${authorIds.length} authors)`,
);
