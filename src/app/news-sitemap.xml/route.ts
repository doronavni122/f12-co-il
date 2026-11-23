import { getRecentNewsArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { escapeXml } from "@/lib/xml";

/** Google News sitemap: articles from the last 2 days only. */
export function GET() {
  try {
    const articles = getRecentNewsArticles(2);
    const urls = articles
      .map((article) => {
        const loc = `${siteConfig.url}${article.href}`;
        return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteConfig.name)}</news:name>
        <news:language>he</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(article.publishedAt)}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=900, s-maxage=900",
      },
    });
  } catch (error) {
    console.error("[news-sitemap] failed to build", error);
    return new Response("News sitemap unavailable", { status: 500 });
  }
}
