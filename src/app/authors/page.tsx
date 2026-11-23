import Link from "next/link";
import { authors, getArticlesByAuthor } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "כותבים",
  description: "צוות העורכים והכתבים של F12.",
  path: "/authors",
});

export default function AuthorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">כותבים</h1>
      <p className="mt-3 max-w-2xl text-muted">
        הצוות שמאחורי הסיקור הפיננסי של F12.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {authors.map((author) => {
          const count = getArticlesByAuthor(author.id).length;
          return (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-brand"
            >
              <h2 className="font-display text-2xl font-semibold">{author.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand">{author.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{author.bio}</p>
              <p className="mt-4 text-xs text-muted">{count} כתבות</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
