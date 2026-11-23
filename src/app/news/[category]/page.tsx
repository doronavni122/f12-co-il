import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import {
  categories,
  getArticlesByCategory,
  getCategory,
  isCategorySlug,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  if (!isCategorySlug(category)) {
    return buildPageMetadata({
      title: "מדור לא נמצא",
      description: "המדור המבוקש אינו קיים.",
      path: `/news/${category}`,
      noIndex: true,
    });
  }
  const cat = getCategory(category);
  return buildPageMetadata({
    title: cat.name,
    description: cat.description,
    path: cat.href,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const cat = getCategory(category);
  const articles = getArticlesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold text-brand">מדור</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>
      </header>
      {articles.length === 0 ? (
        <p className="text-muted">אין עדיין כתבות במדור זה.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
