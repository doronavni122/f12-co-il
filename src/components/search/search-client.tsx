"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchArticleHit } from "@/lib/content";
import { categories } from "@/lib/content/categories";

type Props = {
  articles: SearchArticleHit[];
  initialQuery?: string;
};

export function SearchClient({ articles, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => {
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [articles, query]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-muted">
          חיפוש כתבות
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="לדוגמה: ריבית, משכנתא, ת״א"
          className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-base outline-none ring-brand focus:ring-2"
          autoFocus
        />
      </label>
      <p className="text-sm text-muted">{results.length} תוצאות</p>
      {results.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          <p>לא נמצאו כתבות לחיפוש הזה.</p>
          <p className="mt-3 font-medium text-foreground">נסו מדורים:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={cat.href}
                  className="inline-flex rounded-full border border-border px-3 py-1 text-brand hover:bg-brand-soft"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {results.map((article) => (
            <li key={article.slug} className="px-4 py-4">
              <Link href={article.href} className="block hover:text-brand">
                <p className="font-semibold">{article.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {article.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
