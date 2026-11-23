#!/usr/bin/env node
/**
 * qa:news — post-deploy Google News smoke against BASE_URL (default prod).
 * Run: BASE_URL=https://f12-co-il.vercel.app pnpm qa:news
 */
const base = (process.env.BASE_URL ?? "https://f12-co-il.vercel.app").replace(
  /\/$/,
  "",
);
const FETCH_TIMEOUT_MS = 15_000;
const failures = [];

async function check(path, opts = {}) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "f12-qa-news/1.0" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      failures.push(`${path} → HTTP ${res.status}`);
      await res.arrayBuffer().catch(() => undefined);
      return null;
    }
    const text = await res.text();
    if (opts.includes) {
      for (const needle of opts.includes) {
        if (!text.includes(needle)) {
          failures.push(`${path} missing body: ${needle}`);
        }
      }
    }
    return text;
  } catch (error) {
    failures.push(`${path} fetch error: ${error}`);
    return null;
  }
}

const robots = await check("/robots.txt", {
  includes: ["Sitemap:", "news-sitemap.xml", "Googlebot-News"],
});

const newsSitemap = await check("/news-sitemap.xml", {
  includes: [
    'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
    "<news:news>",
    "<news:publication>",
    "<news:language>he</news:language>",
    "<news:publication_date>",
    "<news:title>",
    "/article/",
  ],
});

let articlePath = "/article/ta125-opens-higher-on-tech-leadership";
if (newsSitemap) {
  const match = newsSitemap.match(/\/article\/[a-z0-9-]+/i);
  if (match) articlePath = match[0];
}

await check(articlePath, {
  includes: [
    '"@type":"NewsArticle"',
    '"datePublished"',
    '"dateModified"',
    '"headline"',
    '"author"',
    '"publisher"',
    '"inLanguage":"he"',
  ],
});

await check("/sitemap.xml", {
  includes: ["/article/"],
});

if (robots && !robots.includes("news-sitemap.xml")) {
  failures.push("robots.txt must advertise news-sitemap.xml");
}

if (failures.length) {
  console.error(`[qa:news] FAILED against ${base}`);
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log(`[qa:news] ok against ${base}`);
process.exit(0);
