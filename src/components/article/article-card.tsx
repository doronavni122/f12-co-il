import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/content/categories";
import type { ArticleWithMeta } from "@/lib/content";

type Props = {
  article: ArticleWithMeta;
  priority?: boolean;
  variant?: "default" | "compact" | "hero";
};

export function ArticleCard({
  article,
  priority = false,
  variant = "default",
}: Props) {
  const category = getCategory(article.category);

  if (variant === "hero") {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-soft)]">
        <Link href={article.href} className="block">
          <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <p className="mb-2 text-xs font-semibold tracking-wide text-sky-200">
                {category.name}
              </p>
              <h2 className="max-w-3xl font-display text-2xl font-bold leading-tight text-white md:text-4xl">
                {article.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
                {article.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-border py-4 last:border-b-0">
        <p className="mb-1 text-xs font-semibold text-brand">{category.name}</p>
        <h3 className="text-base font-semibold leading-snug">
          <Link href={article.href} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">
          {article.readingTimeMinutes} דק׳ קריאה
        </p>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={article.href} className="block">
        <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-surface-muted">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mb-1 text-xs font-semibold text-brand">{category.name}</p>
        <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {article.excerpt}
        </p>
      </Link>
    </article>
  );
}
