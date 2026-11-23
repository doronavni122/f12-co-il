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
assert(existsSync(resolve(root, "src/app/feed.xml/route.ts")), "missing feed.xml route");
assert(
  existsSync(resolve(root, "src/app/news-sitemap.xml/route.ts")),
  "missing news-sitemap.xml route",
);

const sitemap = read("src/app/sitemap.ts");
assert(sitemap.includes('"/news"'), "sitemap must include /news");
assert(!sitemap.includes("/category/"), "sitemap must not emit /category/*");
assert(sitemap.includes("getAllTags"), "sitemap must include tags");

const seo = read("src/lib/seo.ts");
assert(seo.includes("publishedTime"), "article OG must support publishedTime");
assert(seo.includes("noIndex"), "seo helper must support noIndex");
assert(seo.includes("NewsArticle"), "seo must expose NewsArticle JSON-LD");

const robots = read("src/app/robots.ts");
assert(robots.includes("sitemap"), "robots.ts must reference sitemap");
assert(robots.includes("news-sitemap.xml"), "robots.ts must reference news sitemap");

const rssLib = read("src/lib/rss-feed.ts");
assert(rssLib.includes("atom:link"), "RSS must include atom self link");
assert(rssLib.includes("guid isPermaLink"), "RSS items need stable permalink guid");
assert(rssLib.includes("content:encoded"), "RSS must include content:encoded");

const layout = read("src/app/layout.tsx");
assert(layout.includes("application/rss+xml"), "layout metadata must advertise RSS");
assert(layout.includes("/feed.xml"), "layout metadata must advertise /feed.xml");

if (failures.length) {
  console.error("[qa:seo] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:seo] ok");
