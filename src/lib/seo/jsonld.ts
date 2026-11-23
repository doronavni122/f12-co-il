import { siteConfig } from "@/lib/site";
import type { ArticleWithMeta } from "@/lib/content";
import type { Author } from "@/lib/content/schema";
import type { Category } from "@/lib/content/categories";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "he-IL",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og-default.svg`,
  };
}

export function newsArticleJsonLd(
  article: ArticleWithMeta,
  author: Author,
  category: Category,
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [`${siteConfig.url}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/og-default.svg`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}${article.href}`,
    articleSection: category.name,
    inLanguage: "he-IL",
  };
}
