import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

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
    logo: absoluteUrl("/images/og-default.svg"),
    description: siteConfig.description,
    foundingDate: "2026",
  };
}
