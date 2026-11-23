import type { CategorySlug } from "./schema";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  href: string;
};

export const categories: Category[] = [
  {
    slug: "markets",
    name: "שוק ההון",
    description: "בורסה, מניות, אג״ח ומדדים בישראל ובעולם.",
    href: "/category/markets",
  },
  {
    slug: "macro",
    name: "מאקרו",
    description: "ריבית, אינפלציה, מדיניות מוניטרית וכלכלה ריאלית.",
    href: "/category/macro",
  },
  {
    slug: "real-estate-finance",
    name: "נדל״ן",
    description: "מימון נדל״ן, משכנתאות, תשואות ותזרימי דיור.",
    href: "/category/real-estate-finance",
  },
  {
    slug: "fintech",
    name: "טק פיננסי",
    description: "בנקאות דיגיטלית, תשלומים, רגולציה וחדשנות פיננסית.",
    href: "/category/fintech",
  },
  {
    slug: "crypto",
    name: "מט״ח וקריפטו",
    description: "מטבעות, שקל־דולר, נזילות דיגיטלית והשפעה על תיקים.",
    href: "/category/crypto",
  },
  {
    slug: "opinion",
    name: "דעות",
    description: "ניתוחים ופרשנות של עורכי F12 וכותבים אורחים.",
    href: "/category/opinion",
  },
];

export function getCategory(slug: CategorySlug): Category {
  const found = categories.find((c) => c.slug === slug);
  if (!found) {
    console.error(`[categories] unknown slug: ${slug}`);
    throw new Error(`[categories] unknown slug: ${slug}`);
  }
  return found;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return categories.some((c) => c.slug === value);
}
