import type { Metadata } from "next";
import { ArticleCard } from "@/components/article/article-card";
import { getAllArticles } from "@/lib/content";


export const metadata: Metadata = {
  title: "כל החדשות",
  description: "ארכיון כתבות F12 — שווקים, מאקרו, נדל״ן פיננסי, פינטק, קריפטו ודעות.",
};

export default function NewsIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold md:text-4xl">כל החדשות</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {articles.length} כתבות עדכניות ממערכת F12.
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
