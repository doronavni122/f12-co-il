import { articles as rawArticles } from "@/content/articles";
import { estimateReadingTimeMinutes } from "@/lib/reading-time";
import { authors, getAuthor } from "./authors";
import { categories, getCategory, isCategorySlug } from "./categories";
import { articleSchema, type Article, type CategorySlug } from "./schema";

export type ArticleWithMeta = Article & {
  readingTimeMinutes: number;
  href: string;
};

function parseArticles(): ArticleWithMeta[] {
  const parsed: ArticleWithMeta[] = [];

  for (const raw of rawArticles) {
    try {
      const article = articleSchema.parse(raw);
      getAuthor(article.authorId);
      getCategory(article.category);
      parsed.push({
        ...article,
        readingTimeMinutes: estimateReadingTimeMinutes(article.body),
        href: `/article/${article.slug}`,
      });
    } catch (error) {
      console.error(
        "[content] failed to parse article",
        (raw as { slug?: string })?.slug,
        error,
      );
      throw error;
    }
  }

  return parsed.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

const allArticles = parseArticles();

export function getAllArticles(): ArticleWithMeta[] {
  return allArticles;
}

export function getArticleBySlug(slug: string): ArticleWithMeta | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: CategorySlug,
): ArticleWithMeta[] {
  return allArticles.filter((a) => a.category === category);
}

export function getArticlesByAuthor(authorId: string): ArticleWithMeta[] {
  return allArticles.filter((a) => a.authorId === authorId);
}

export function getFeaturedArticles(limit = 1): ArticleWithMeta[] {
  const featured = allArticles.filter((a) => a.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return allArticles.slice(0, limit);
}

export function getLatestArticles(limit = 8): ArticleWithMeta[] {
  return allArticles.slice(0, limit);
}

export function getRelatedArticles(
  article: Article,
  limit = 3,
): ArticleWithMeta[] {
  const sameCategory = allArticles.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const fillers = allArticles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category,
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}

export function searchArticles(query: string): ArticleWithMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allArticles.filter((a) => {
    const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

export {
  authors,
  getAuthor,
  categories,
  getCategory,
  isCategorySlug,
  type CategorySlug,
};
