#!/usr/bin/env node
/**
 * qa:smoke — post-deploy HTTP smoke against BASE_URL (default prod preview).
 * Run: BASE_URL=https://f12-co-il.vercel.app node scripts/qa/smoke-prod.mjs
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
      redirect: opts.follow === false ? "manual" : "follow",
      headers: { "user-agent": "f12-qa-smoke/1.0" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const ok =
      opts.expectStatus != null
        ? res.status === opts.expectStatus
        : res.ok;
    if (!ok) {
      failures.push(`${path} → HTTP ${res.status}`);
      await res.arrayBuffer().catch(() => undefined);
      return null;
    }
    if (opts.expectHeader) {
      const [key, value] = opts.expectHeader;
      const actual = res.headers.get(key);
      if (!actual || !actual.includes(value)) {
        failures.push(`${path} missing header ${key}~${value} (got ${actual})`);
      }
    }
    if (opts.includes) {
      const text = await res.text();
      for (const needle of opts.includes) {
        if (!text.includes(needle)) {
          failures.push(`${path} missing body: ${needle}`);
        }
      }
      return text;
    }
    // Drain body so undici sockets are released and Node can exit.
    await res.arrayBuffer().catch(() => undefined);
    return null;
  } catch (error) {
    failures.push(`${path} fetch error: ${error}`);
    return null;
  }
}

await check("/", {
  includes: ['lang="he"', 'dir="rtl"', "F12"],
  expectHeader: ["x-content-type-options", "nosniff"],
});
await check("/news", { includes: ["כל החדשות"] });
await check("/news/markets", { includes: ["שוק ההון"] });
await check("/robots.txt", {
  includes: ["Sitemap:", "news-sitemap.xml", "Googlebot-News"],
});
await check("/sitemap.xml", { includes: ["/news/", "/article/"] });
await check("/news-sitemap.xml", {
  includes: [
    'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
    "<news:news>",
    "/article/",
  ],
});
await check("/article/ta125-opens-higher-on-tech-leadership", {
  includes: ['"@type":"NewsArticle"', '"datePublished"', '"publisher"'],
});
await check("/rss.xml", { includes: ["<rss", "<language>he</language>", "content:encoded"] });
await check("/feed.xml", { includes: ["<rss", "atom:link", "content:encoded"] });
await check("/search", { includes: ["חיפוש"] });
await check("/newsletter", { includes: ["ניוזלטר"] });
await check("/tags", { includes: ["תגיות"] });
await check("/category/markets", { expectStatus: 308, follow: false });

if (failures.length) {
  console.error(`[qa:smoke] FAILED against ${base}`);
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log(`[qa:smoke] ok against ${base}`);
process.exit(0);
