import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/absolute-url";
import type { ArticleWithMeta } from "@/lib/content";
import { getAuthor, getCategory } from "@/lib/content";
import { publisherLogo } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site";

export { absoluteUrl };

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
  const pageUrl = absoluteUrl(article.href);
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : absoluteUrl(article.image);
  const dateModified = article.updatedAt ?? article.publishedAt;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [
      {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    ],
    datePublished: article.publishedAt,
    dateModified,
    author: {
      "@type": "Person",
      "@id": absoluteUrl(`/authors/${author.id}#person`),
      name: author.name,
      url: absoluteUrl(`/authors/${author.id}`),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: publisherLogo,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    articleSection: category.name,
    keywords: article.tags.join(", "),
    inLanguage: "he",
    isAccessibleForFree: true,
  };
}

export {
  articleBreadcrumbJsonLd,
  breadcrumbListJsonLd,
  organizationJsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonld";
