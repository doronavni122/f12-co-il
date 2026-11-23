#!/usr/bin/env node
/**
 * qa:smoke — post-deploy HTTP smoke against BASE_URL (default prod preview).
 * Run: BASE_URL=https://f12-co-il.vercel.app node scripts/qa/smoke-prod.mjs
 */
const base = (process.env.BASE_URL ?? "https://f12-co-il.vercel.app").replace(
  /\/$/,
  "",
);
const failures = [];

async function check(path, opts = {}) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      redirect: opts.follow === false ? "manual" : "follow",
      headers: { "user-agent": "f12-qa-smoke/1.0" },
    });
    const ok =
      opts.expectStatus != null
        ? res.status === opts.expectStatus
        : res.ok;
    if (!ok) {
      failures.push(`${path} → HTTP ${res.status}`);
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
    return res;
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
await check("/robots.txt", { includes: ["Sitemap:"] });
await check("/sitemap.xml", { includes: ["/news/", "/article/"] });
await check("/rss.xml", { includes: ["<rss", "he-IL"] });
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
