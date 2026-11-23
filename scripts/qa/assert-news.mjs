#!/usr/bin/env node
/**
 * qa:news — assert Google News surfaces: news sitemap, NewsArticle JSON-LD, robots, feed.
 * Run: node scripts/qa/assert-news.mjs
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

assert(
  existsSync(resolve(root, "src/app/news-sitemap.xml/route.ts")),
  "missing news-sitemap.xml route",
);
assert(
  existsSync(resolve(root, "src/app/feed.xml/route.ts")),
  "missing feed.xml route",
);

const newsSitemap = read("src/app/news-sitemap.xml/route.ts");
assert(
  newsSitemap.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'),
  "news sitemap must declare Google news namespace (http, not https)",
);
assert(newsSitemap.includes("<news:news>"), "news sitemap must emit news:news");
assert(
  newsSitemap.includes("<news:publication_date>"),
  "news sitemap must include publication_date",
);
assert(
  newsSitemap.includes("getRecentNewsArticles"),
  "news sitemap must filter to recent articles",
);

const seo = read("src/lib/seo.ts");
assert(seo.includes('"@type": "NewsArticle"'), "articleJsonLd must use NewsArticle");
assert(seo.includes("datePublished"), "NewsArticle must include datePublished");
assert(seo.includes("dateModified"), "NewsArticle must include dateModified");
assert(seo.includes('"@type": "Person"'), "NewsArticle author must be Person");
assert(seo.includes("mainEntityOfPage"), "NewsArticle must include mainEntityOfPage");
assert(seo.includes("articleSection"), "NewsArticle must include articleSection");
assert(seo.includes('inLanguage: "he"'), "NewsArticle inLanguage must be he");
assert(seo.includes("publisher"), "NewsArticle must include publisher");
assert(seo.includes("ImageObject"), "schema images/logo should use ImageObject");

const jsonld = read("src/lib/seo/jsonld.ts");
assert(jsonld.includes('"@type": "WebSite"'), "layout must expose WebSite JSON-LD");
assert(
  jsonld.includes("NewsMediaOrganization") || jsonld.includes('"@type": "Organization"'),
  "layout must expose Organization JSON-LD",
);
assert(jsonld.includes("sameAs"), "Organization should include sameAs when available");
assert(jsonld.includes("logo"), "Organization must include logo");

const robots = read("src/app/robots.ts");
assert(robots.includes("Googlebot"), "robots must allow Googlebot");
assert(robots.includes("Googlebot-News"), "robots must allow Googlebot-News");
assert(robots.includes("news-sitemap.xml"), "robots must list news-sitemap.xml");
assert(robots.includes("sitemap.xml"), "robots must list sitemap.xml");

const rss = read("src/lib/rss-feed.ts");
assert(rss.includes("content:encoded"), "RSS must include substantial content:encoded");
assert(rss.includes("atom:link"), "RSS must include atom:link");
assert(rss.includes("guid isPermaLink"), "RSS must include permalink guid");
assert(rss.includes("pubDate"), "RSS must include pubDate");
assert(rss.includes("dc:creator") || rss.includes("<author>"), "RSS must include author");
assert(rss.includes("<category>"), "RSS must include category");

const articlePage = read("src/app/article/[slug]/page.tsx");
assert(articlePage.includes("dateTime={article.publishedAt}"), "article must show publish date");
assert(articlePage.includes("authors/"), "article byline must link author URL");
assert(articlePage.includes("publishedTime"), "article OG must set published_time");
assert(articlePage.includes("modifiedTime"), "article OG must set modified_time");

if (failures.length) {
  console.error("[qa:news] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:news] ok");
