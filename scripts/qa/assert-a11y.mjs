#!/usr/bin/env node
/**
 * qa:a11y — static accessibility gates (lang/dir, labels, skip patterns).
 * Run: node scripts/qa/assert-a11y.mjs
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
assert(layout.includes('lang="he"') && layout.includes('dir="rtl"'), "html lang/dir required");

const header = read("src/components/layout/site-header.tsx");
assert(header.includes('aria-label="ניווט ראשי"'), "main nav needs aria-label");

const mobile = read("src/components/layout/mobile-nav.tsx");
assert(mobile.includes("aria-expanded"), "mobile menu needs aria-expanded");
assert(mobile.includes('aria-label="תפריט"'), "mobile menu button needs label");

const share = read("src/components/article/share-buttons.tsx");
assert(share.includes('aria-label="שיתוף"'), "share cluster needs aria-label");

const notFound = read("src/app/not-found.tsx");
assert(notFound.includes("robots"), "404 should set robots noindex");

if (failures.length) {
  console.error("[qa:a11y] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:a11y] ok");
