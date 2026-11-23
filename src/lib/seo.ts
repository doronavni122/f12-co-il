import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { ArticleWithMeta } from "@/lib/content";
import { getAuthor, getCategory } from "@/lib/content";

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, alt: title, width: 1200, height: 630 }],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
  };
}

export function articleJsonLd(article: ArticleWithMeta) {
  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [
      article.image.startsWith("http")
        ? article.image
        : absoluteUrl(article.image),
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(`/authors/${author.id}`),
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/og-default.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(article.href),
    articleSection: category.name,
    keywords: article.tags.join(", "),
    inLanguage: "he-IL",
  };
}
