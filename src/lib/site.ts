export const siteConfig = {
  name: "F12",
  legalName: "F12 מדיה פיננסית",
  domain: "f12.co.il",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://f12.co.il",
  description:
    "חדשות פיננסים ישראליות וגלובליות: שוק ההון, מט״ח, נדל״ן, מאקרו וטק פיננסי — ניתוח חד ועדכונים בזמן אמת.",
  locale: "he_IL",
  language: "he",
  twitterHandle: "@f12finance",
  defaultOgImage: "/images/og-default.svg",
  contactEmail: process.env.CONTACT_EMAIL ?? "news@f12.co.il",
} as const;
