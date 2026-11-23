import { getAllArticles, getAuthor, getCategory } from "@/lib/content";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const articles = getAllArticles();
  const items = articles
    .map((article) => {
      const link = `${siteConfig.url}${article.href}`;
      const author = getAuthor(article.authorId);
      const category = getCategory(article.category);
      const imageUrl = article.image.startsWith("http")
        ? article.image
        : `${siteConfig.url}${article.image}`;
      return `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${escapeXml(link)}</link>
  <guid isPermaLink="true">${escapeXml(link)}</guid>
  <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
  <category>${escapeXml(category.name)}</category>
  <dc:creator>${escapeXml(author.name)}</dc:creator>
  <description>${escapeXml(article.excerpt)}</description>
  <enclosure url="${escapeXml(imageUrl)}" type="image/svg+xml" length="0" />
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>he-IL</language>
    <atom:link href="${escapeXml(`${siteConfig.url}/rss.xml`)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
