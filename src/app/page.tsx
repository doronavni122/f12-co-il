import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
import { MarketsStrip } from "@/components/home/markets-strip";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import {
  categories,
  getArticlesByCategory,
  getFeaturedArticles,
  getLatestArticles,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: `${siteConfig.name} — חדשות פיננסים ושווקים`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedArticles(1)[0] ?? getLatestArticles(1)[0];
  const latest = getLatestArticles(9).filter((a) => a.slug !== featured?.slug);
  const rails = categories.map((cat) => ({
    cat,
    items: getArticlesByCategory(cat.slug).slice(0, 3),
  }));

  return (
    <>
      <section className="relative isolate min-h-[min(88vh,760px)] overflow-hidden bg-[#071428] text-white">
        {featured ? (
          <div className="absolute inset-0">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#071428]/25 via-[#0a1b33]/72 to-[#071428]/95" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%2338bdf8' stroke-opacity='0.35'%3E%3Cpath d='M0 40h160M0 80h160M0 120h160M40 0v160M80 0v160M120 0v160'/%3E%3C/g%3E%3C/svg%3E\")",
              }}
              aria-hidden
            />
          </div>
        ) : null}

        <div className="relative mx-auto flex min-h-[min(88vh,760px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <p className="animate-rise font-display text-6xl font-bold tracking-tight text-white md:text-8xl">
            F12
          </p>
          <p className="animate-rise-delay mt-3 max-w-xl text-lg text-sky-100/90 md:text-xl">
            חדשות פיננסים ישראליות וגלובליות — חדות, מהירות, בלי רעש.
          </p>
          {featured ? (
            <div className="animate-rise-delay-2 mt-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-sky-300">
                כותרת ראשית
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold leading-tight md:text-4xl">
                <Link href={featured.href} className="hover:text-sky-200">
                  {featured.title}
                </Link>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={featured.href}
                  className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-strong"
                >
                  לקריאה
                </Link>
                <Link
                  href="/search"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  ארכיון וחיפוש
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <MarketsStrip />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:px-6">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              עדכונים אחרונים
            </h2>
            <Link href="/news" className="text-sm font-medium text-brand hover:underline">
              לכל הכתבות
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(0, 6).map((article, i) => (
              <ArticleCard
                key={article.slug}
                article={article}
                priority={i < 2}
              />
            ))}
          </div>
        </section>

        <NewsletterCta />

        <section className="space-y-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">מדורים</h2>
          <div className="grid gap-10 lg:grid-cols-2">
            {rails.map(({ cat, items }) => (
              <div key={cat.slug} className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{cat.name}</h3>
                    <p className="mt-1 text-sm text-muted">{cat.description}</p>
                  </div>
                  <Link href={cat.href} className="shrink-0 text-sm font-medium text-brand">
                    הכל
                  </Link>
                </div>
                <div>
                  {items.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="compact" />
                  ))}
                  {items.length === 0 ? (
                    <p className="text-sm text-muted">אין כתבות במדור זה עדיין.</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
