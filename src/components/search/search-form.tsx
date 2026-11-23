"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2" role="search">
      <label htmlFor="site-search" className="sr-only">
        חיפוש באתר
      </label>
      <input
        id="site-search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפשו כותרת, תג או נושא…"
        className="h-11 w-full rounded-full border border-border bg-surface px-4 text-sm outline-none ring-brand focus:ring-2"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong"
      >
        חפש
      </button>
    </form>
  );
}
