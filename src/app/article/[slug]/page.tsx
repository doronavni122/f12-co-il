import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import { ArticleMarkdown } from "@/components/article/markdown";
import { ShareButtons } from "@/components/article/share-buttons";
import { siteConfig } from "@/lib/site";
import {
  getAllArticles,
  getArticleBySlug,
  getAuthor,
  getCategory,
  getRelatedArticles,
} from "@/lib/content";
import { absoluteUrl, articleJsonLd, buildPageMetadata } from "@/lib/seo";


export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildPageMetadata({
      title: "כתבה לא נמצאה",
      description: "הכתבה המבוקשת אינה קיימת.",
      path: `/article/${slug}`,
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    image: article.image,
    type: "article",
  });
}

export default async function ArticlePage({
  params,
}: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    console.error("[article] not found", slug);
    notFound();
  }

  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);
  const related = getRelatedArticles(article, 3);
  const published = new Date(article.publishedAt).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const jsonLd = articleJsonLd(article);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-brand">
          <Link href={category.href}>{category.name}</Link>
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>{author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedAt}>{published}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTimeMinutes} דק׳ קריאה</span>
        </div>
        <div className="mt-5">
          <ShareButtons title={article.title} url={`${siteConfig.url}${article.href}`} />
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-surface-muted">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 900px"
          className="object-cover"
        />
      </div>
      {article.imageCredit ? (
        <p className="mx-auto mt-2 max-w-4xl text-xs text-muted">
          קרדיט תמונה: {article.imageCredit}
        </p>
      ) : null}

      <div className="mx-auto mt-10 max-w-3xl">
        <ArticleMarkdown content={article.body} />

        <div className="mt-10 rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm font-semibold">{author.name}</p>
          <p className="text-xs text-brand">{author.title}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{author.bio}</p>
        </div>

        <p className="mt-6 text-xs text-muted">
          קישור קנוני:{" "}
          <a className="text-brand" href={absoluteUrl(article.href)}>
            {absoluteUrl(article.href)}
          </a>
        </p>
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="mb-6 font-display text-2xl font-bold">כתבות קשורות</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
