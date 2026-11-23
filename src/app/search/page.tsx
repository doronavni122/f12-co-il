import { SearchClient } from "@/components/search/search-client";
import { getAllArticles } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "חיפוש וארכיון",
  description: "חיפוש בכתבות F12 וארכיון מלא.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-display text-4xl font-bold">חיפוש וארכיון</h1>
      <SearchClient articles={articles} initialQuery={q} />
    </div>
  );
}
