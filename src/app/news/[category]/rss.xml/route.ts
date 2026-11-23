import { isCategorySlug } from "@/lib/content";
import { buildCategoryRssXml, rssResponse } from "@/lib/rss-feed";

export async function GET(
  _request: Request,
  context: { params: Promise<{ category: string }> },
) {
  const { category } = await context.params;
  if (!isCategorySlug(category)) {
    console.error("[category-rss] invalid category", category);
    return new Response("Not found", { status: 404 });
  }
  try {
    const xml = buildCategoryRssXml(category);
    return rssResponse(`/news/${category}/rss.xml`, xml);
  } catch (error) {
    console.error("[category-rss] failed", category, error);
    return new Response("RSS feed unavailable", { status: 500 });
  }
}
