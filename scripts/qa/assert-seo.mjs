#!/usr/bin/env node
/**
 * qa:seo — assert sitemap/robots/RSS/metadata helpers exist and category URLs are canonical.
 * Run: node scripts/qa/assert-seo.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const failures = [];

function read(rel) {
  return readFileSync(resolve(root, rel), "utf8");
}

function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

assert(existsSync(resolve(root, "src/app/sitemap.ts")), "missing sitemap.ts");
assert(existsSync(resolve(root, "src/app/robots.ts")), "missing robots.ts");
assert(existsSync(resolve(root, "src/app/rss.xml/route.ts")), "missing rss route");

const sitemap = read("src/app/sitemap.ts");
assert(sitemap.includes('"/news"'), "sitemap must include /news");
assert(!sitemap.includes("/category/"), "sitemap must not emit /category/*");
assert(sitemap.includes("getAllTags"), "sitemap must include tags");

const seo = read("src/lib/seo.ts");
assert(seo.includes("publishedTime"), "article OG must support publishedTime");
assert(seo.includes("noIndex"), "seo helper must support noIndex");

const robots = read("src/app/robots.ts");
assert(robots.includes("sitemap"), "robots.ts must reference sitemap");

const rss = read("src/app/rss.xml/route.ts");
assert(rss.includes("atom:link"), "RSS must include atom self link");
assert(rss.includes("guid isPermaLink"), "RSS items need stable permalink guid");

const layout = read("src/app/layout.tsx");
assert(layout.includes("application/rss+xml"), "layout metadata must advertise RSS");

if (failures.length) {
  console.error("[qa:seo] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:seo] ok");
