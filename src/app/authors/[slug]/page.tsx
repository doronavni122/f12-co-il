import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import { authors, getArticlesByAuthor, getAuthor } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/authors/[slug]">) {
  const { slug } = await params;
  try {
    const author = getAuthor(slug);
    return buildPageMetadata({
      title: author.name,
      description: author.bio,
      path: `/authors/${author.id}`,
    });
  } catch {
    return {};
  }
}

export default async function AuthorPage({
  params,
}: PageProps<"/authors/[slug]">) {
  const { slug } = await params;
  let author;
  try {
    author = getAuthor(slug);
  } catch (error) {
    console.error("[author] not found", slug, error);
    notFound();
  }
  const articles = getArticlesByAuthor(author.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <header className="mb-10 max-w-2xl">
        <p className="text-sm font-medium text-muted">
          <Link href="/authors" className="hover:text-brand">
            כותבים
          </Link>
          <span aria-hidden> / </span>
          {author.name}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">{author.name}</h1>
        <p className="mt-2 text-brand">{author.title}</p>
        <p className="mt-4 text-base leading-8 text-muted">{author.bio}</p>
        <p className="mt-4 text-sm text-muted">
          כותב/ת ב-{siteConfig.name}. מדיניות עריכה:{" "}
          <Link href="/editorial-policy" className="text-brand hover:underline">
            קישור
          </Link>
          .
        </p>
      </header>
      <h2 className="mb-6 font-display text-2xl font-bold">כתבות מאת {author.name}</h2>
      {articles.length === 0 ? (
        <p className="text-muted">לכותב/ת זה עדיין אין כתבות בארכיון.</p>
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
