import type { MetadataRoute } from "next";
import { authors, categories, getAllArticles, getAllTags } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const articles = getAllArticles();
  const latestArticleDate =
    articles[0] != null
      ? new Date(articles[0].updatedAt ?? articles[0].publishedAt)
      : new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/search",
    "/newsletter",
    "/authors",
    "/news",
    "/tags",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: latestArticleDate,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : path === "/news" ? 0.9 : 0.6,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}${a.href}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}${c.href}`,
    lastModified: latestArticleDate,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const authorRoutes = authors.map((a) => ({
    url: `${base}/authors/${a.id}`,
    lastModified: latestArticleDate,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: `${base}/tags/${encodeURIComponent(tag.trim())}`,
    lastModified: latestArticleDate,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...tagRoutes,
    ...articleRoutes,
  ];
}
