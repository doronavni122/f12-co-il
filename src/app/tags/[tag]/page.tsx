import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import { getAllTags, getArticlesByTag } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ tag: string }>;
};

function resolveTagParam(raw: string): string {
  try {
    // Next may pass already-decoded or once-encoded segments
    let value = raw;
    if (value.includes("%")) {
      value = decodeURIComponent(value);
    }
    if (value.includes("%")) {
      value = decodeURIComponent(value);
    }
    return value;
  } catch (error) {
    console.error("[tags] failed to decode param", raw, error);
    return raw;
  }
}

export function generateStaticParams() {
  // Pass raw Unicode; Next encodes the path segment once.
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag: raw } = await params;
  const tag = resolveTagParam(raw);
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) {
    return buildPageMetadata({
      title: "תגית לא נמצאה",
      description: "התגית המבוקשת אינה קיימת.",
      path: `/tags/${encodeURIComponent(tag)}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `תגית: ${tag}`,
    description: `כתבות עם התגית ${tag} ב-F12.`,
    path: `/tags/${encodeURIComponent(tag)}`,
  });
}

export default async function TagPage({ params }: Props) {
  const { tag: raw } = await params;
  const tag = resolveTagParam(raw);
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) {
    console.error("[tags] empty tag", tag);
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold text-brand">תגית</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          {tag}
        </h1>
        <p className="mt-3 text-muted">{articles.length} כתבות</p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
