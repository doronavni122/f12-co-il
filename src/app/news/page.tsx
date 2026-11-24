import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
import { getAllArticles } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_SIZE = 12;

export const metadata = buildPageMetadata({
  title: "כל החדשות",
  description:
    "ארכיון כתבות F12 - שווקים, מאקרו, נדל״ן פיננסי, פינטק, קריפטו ודעות.",
  path: "/news",
});

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rawPage = Number.parseInt(sp.page ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const articles = getAllArticles();
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageArticles = articles.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          כל החדשות
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          ארכיון התחלתי · {articles.length} כתבות במערכת F12.
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pageArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav
          className="mt-10 flex items-center justify-center gap-3"
          aria-label="עמודים"
        >
          {safePage > 1 ? (
            <Link
              href={`/news?page=${safePage - 1}`}
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-brand"
            >
              הקודם
            </Link>
          ) : null}
          <span className="text-sm text-muted">
            עמוד {safePage} מתוך {totalPages}
          </span>
          {safePage < totalPages ? (
            <Link
              href={`/news?page=${safePage + 1}`}
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-brand"
            >
              הבא
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
