import Link from "next/link";
import { getAllTags, slugifyTag } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "תגיות",
  description: "כל התגיות בארכיון F12.",
  path: "/tags",
});

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">תגיות</h1>
      <p className="mt-3 text-muted">{tags.length} תגיות בארכיון.</p>
      {tags.length === 0 ? (
        <p className="mt-8 text-muted">אין תגיות עדיין.</p>
      ) : (
        <ul className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${slugifyTag(tag)}`}
                className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:border-brand hover:text-brand"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
