import type { MetadataRoute } from "next";
import { authors, categories, getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const SITE_LAST_MODIFIED = new Date("2026-11-23T12:00:00+02:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/search",
    "/newsletter",
    "/authors",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${base}${a.href}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}${c.href}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const authorRoutes = authors.map((a) => ({
    url: `${base}/authors/${a.id}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];
}
