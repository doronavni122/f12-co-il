import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const publisherLogo = {
  "@type": "ImageObject" as const,
  url: absoluteUrl("/images/og-default.svg"),
  width: 1200,
  height: 630,
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
    image: publisherLogo,
    description: siteConfig.description,
    foundingDate: "2026",
    sameAs,
  };
}

export { publisherLogo };
