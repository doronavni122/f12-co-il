#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const failures = [];
function read(rel) { return readFileSync(resolve(root, rel), "utf8"); }
function assert(cond, msg) { if (!cond) failures.push(msg); }

assert(existsSync(resolve(root, "src/app/news-sitemap.xml/route.ts")), "missing news-sitemap.xml route");
assert(existsSync(resolve(root, "src/app/feed.xml/route.ts")), "missing feed.xml route");
assert(existsSync(resolve(root, "public/images/logo.png")), "missing PNG logo");
assert(existsSync(resolve(root, "public/images/og-default.png")), "missing PNG og-default");

const newsSitemap = read("src/app/news-sitemap.xml/route.ts");
assert(newsSitemap.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'), "news sitemap namespace");
assert(newsSitemap.includes("<news:news>"), "news:news");
assert(newsSitemap.includes("<news:publication_date>"), "publication_date");
assert(newsSitemap.includes("getRecentNewsArticles"), "recent filter");

const seo = read("src/lib/seo.ts");
assert(seo.includes('"@type": "NewsArticle"'), "NewsArticle");
assert(seo.includes("datePublished") && seo.includes("dateModified"), "dates");
assert(seo.includes('"@type": "Person"'), "Person author");
assert(seo.includes("mainEntityOfPage") && seo.includes("articleSection"), "page/section");
assert(seo.includes('inLanguage: "he"'), "inLanguage he");
assert(seo.includes("publishedTime") && seo.includes("modifiedTime"), "OG times");
assert(seo.includes("tags"), "OG tags");

const jsonld = read("src/lib/seo/jsonld.ts");
assert(jsonld.includes('"@type": "WebSite"'), "WebSite");
assert(jsonld.includes("NewsMediaOrganization"), "NewsMediaOrganization");
assert(jsonld.includes("sameAs") && jsonld.includes("logo"), "sameAs+logo");
assert(jsonld.includes("logoImage") || jsonld.includes("logo.png"), "PNG logo path");
assert(!jsonld.includes("og-default.svg"), "no SVG logo");
assert(jsonld.includes("publishingPrinciples") && jsonld.includes("/editorial-policy"), "editorial policy");
assert(jsonld.includes("correctionsPolicy") && jsonld.includes("/corrections"), "corrections");
assert(jsonld.includes("ownershipFundingInfo") && jsonld.includes("/about"), "about");
assert(jsonld.includes("BreadcrumbList") && jsonld.includes("personJsonLd"), "breadcrumb+person");
assert(jsonld.includes("categoryBreadcrumbJsonLd"), "category breadcrumb");

const site = read("src/lib/site.ts");
assert(site.includes('logoImage: "/images/logo.png"'), "logo png");
assert(site.includes('defaultOgImage: "/images/og-default.png"'), "og png");

const robots = read("src/app/robots.ts");
assert(robots.includes("Googlebot") && robots.includes("Googlebot-News"), "googlebots");
assert(robots.includes("news-sitemap.xml") && robots.includes("sitemap.xml"), "sitemaps");

const rss = read("src/lib/rss-feed.ts");
assert(rss.includes("content:encoded") && rss.includes("atom:link"), "rss content+atom");
assert(rss.includes("guid isPermaLink") && rss.includes("pubDate"), "guid+pubDate");
assert(rss.includes("<image>") && rss.includes("atom:updated"), "image+updated");

const articlePage = read("src/app/article/[slug]/page.tsx");
assert(articlePage.includes("dateTime={article.publishedAt}"), "visible date");
assert(articlePage.includes("publishedTime") && articlePage.includes("modifiedTime"), "OG article times");
assert(articlePage.includes("articleBreadcrumbJsonLd"), "article breadcrumb");

const authorPage = read("src/app/authors/[slug]/page.tsx");
assert(authorPage.includes("personJsonLd"), "author Person JSON-LD");
assert(existsSync(resolve(root, "src/app/news/[category]/rss.xml/route.ts")), "category RSS");

if (failures.length) {
  console.error("[qa:news] FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("[qa:news] ok");
