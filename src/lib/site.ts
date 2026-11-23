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
  defaultOgImage: "/images/og-default.png",
  logoImage: "/images/logo.png",
  logoWidth: 360,
  logoHeight: 60,
  contactEmail: process.env.CONTACT_EMAIL ?? "news@f12.co.il",
  editorialEmail: process.env.EDITORIAL_EMAIL ?? "editor@f12.co.il",
  correctionsEmail: process.env.CORRECTIONS_EMAIL ?? "corrections@f12.co.il",
  location: {
    city: "תל אביב-יפו",
    country: "ישראל",
    display: "תל אביב-יפו, ישראל",
  },
  ownership:
    "F12 מדיה פיננסית הוא מותג פרסום עצמאי לחדשות וניתוח פיננסי. האחריות העריכתית על התוכן מוטלת על עורך האתר וצוות הכותבים.",
  ethicsBlurb:
    "F12 מחויב לדיוק עובדתי, הפרדה בין תוכן עריכתי לפרסום, ושקיפות בתיקונים.",
} as const;
