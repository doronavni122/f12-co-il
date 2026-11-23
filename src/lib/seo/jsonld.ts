import { absoluteUrl } from "@/lib/absolute-url";
import type { ArticleWithMeta, Author, CategorySlug } from "@/lib/content";
import { getCategory } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const publisherLogo = {
  "@type": "ImageObject" as const,
  url: absoluteUrl(siteConfig.logoImage),
  width: siteConfig.logoWidth,
  height: siteConfig.logoHeight,
  caption: `${siteConfig.name} logo`,
};

const sameAs = [
  `https://x.com/${siteConfig.twitterHandle.replace(/^@/, "")}`,
];

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "he",
    publisher: { "@id": `${siteConfig.url}/#organization` },
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
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: publisherLogo,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.defaultOgImage),
      width: 1200,
      height: 630,
      caption: `${siteConfig.name} — default social image`,
    },
    description: siteConfig.description,
    foundingDate: "2026",
    sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: siteConfig.editorialEmail,
        availableLanguage: ["Hebrew", "he"],
        url: absoluteUrl("/contact"),
      },
      {
        "@type": "ContactPoint",
        contactType: "corrections",
        email: siteConfig.correctionsEmail,
        availableLanguage: ["Hebrew", "he"],
        url: absoluteUrl("/corrections"),
      },
    ],
    publishingPrinciples: absoluteUrl("/editorial-policy"),
    ethicsPolicy: absoluteUrl("/editorial-policy"),
    correctionsPolicy: absoluteUrl("/corrections"),
    masthead: absoluteUrl("/about"),
    ownershipFundingInfo: absoluteUrl("/about"),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: "IL",
    },
  };
}

export function personJsonLd(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/authors/${author.id}#person`),
    name: author.name,
    description: author.bio,
    jobTitle: author.title,
    url: absoluteUrl(`/authors/${author.id}`),
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbListJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleBreadcrumbJsonLd(article: ArticleWithMeta) {
  const category = getCategory(article.category);
  return breadcrumbListJsonLd([
    { name: "דף הבית", path: "/" },
    { name: category.name, path: category.href },
    { name: article.title, path: article.href },
  ]);
}

export function categoryBreadcrumbJsonLd(category: CategorySlug) {
  const cat = getCategory(category);
  return breadcrumbListJsonLd([
    { name: "דף הבית", path: "/" },
    { name: "חדשות", path: "/news" },
    { name: cat.name, path: cat.href },
  ]);
}
