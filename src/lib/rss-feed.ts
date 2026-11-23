import { getAllArticles, getAuthor, getCategory } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { escapeXml } from "@/lib/xml";

function markdownToRssHtml(body: string): string {
  const blocks = body
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("> ")) {
        const quote = escapeXml(trimmed.replace(/^>\s?/gm, ""));
        return `<blockquote><p>${quote}</p></blockquote>`;
      }
      if (/^[-*]\s/m.test(trimmed) || /^\d+\.\s/m.test(trimmed)) {
        const items = trimmed
          .split("\n")
          .map((line) => line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""))
          .filter(Boolean)
          .map((item) => `<li>${inlineMarkdown(item)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`;
      }
      return `<p>${inlineMarkdown(trimmed.replaceAll("\n", " "))}</p>`;
    })
    .filter(Boolean);
  return blocks.join("\n");
}

function inlineMarkdown(value: string): string {
  return escapeXml(value)
    .replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replaceAll(/`(.+?)`/g, "<code>$1</code>");
}

export function buildRssXml(selfPath: "/rss.xml" | "/feed.xml"): string {
  const articles = getAllArticles();
  const selfUrl = `${siteConfig.url}${selfPath}`;
  const items = articles
    .map((article) => {
      const link = `${siteConfig.url}${article.href}`;
      const author = getAuthor(article.authorId);
      const category = getCategory(article.category);
      const imageUrl = article.image.startsWith("http")
        ? article.image
        : `${siteConfig.url}${article.image}`;
      const contentHtml = [
        `<p>${escapeXml(article.excerpt)}</p>`,
        markdownToRssHtml(article.body),
        `<p><img src="${escapeXml(imageUrl)}" alt="${escapeXml(article.imageAlt)}" width="1200" height="630" /></p>`,
      ].join("\n");

      return `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${escapeXml(link)}</link>
  <guid isPermaLink="true">${escapeXml(link)}</guid>
  <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
  <category>${escapeXml(category.name)}</category>
  <dc:creator>${escapeXml(author.name)}</dc:creator>
  <author>${escapeXml(`${siteConfig.contactEmail} (${author.name})`)}</author>
  <description>${escapeXml(article.excerpt)}</description>
  <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
  <enclosure url="${escapeXml(imageUrl)}" type="image/svg+xml" length="0" />
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>he</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

export function rssResponse(selfPath: "/rss.xml" | "/feed.xml"): Response {
  try {
    const xml = buildRssXml(selfPath);
    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[rss] failed to build feed", selfPath, error);
    return new Response("RSS feed unavailable", { status: 500 });
  }
}
