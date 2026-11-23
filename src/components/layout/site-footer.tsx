import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site";

const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div>
          <p className="font-display text-3xl font-bold text-brand">F12</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            {siteConfig.description}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            {siteConfig.ethicsBlurb}{" "}
            <Link href="/editorial-policy" className="text-brand hover:underline">
              מדיניות עריכה
            </Link>
            .
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">מדורים</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={cat.href} className="hover:text-brand">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">F12</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-brand">
                אודות
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand">
                יצירת קשר
              </Link>
            </li>
            <li>
              <Link href="/editorial-policy" className="hover:text-brand">
                מדיניות עריכה
              </Link>
            </li>
            <li>
              <Link href="/corrections" className="hover:text-brand">
                תיקונים
              </Link>
            </li>
            <li>
              <Link href="/authors" className="hover:text-brand">
                כותבים
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-brand">
                פרטיות
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand">
                תנאי שימוש
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="hover:text-brand">
                ניוזלטר
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-brand">
                חיפוש
              </Link>
            </li>
            <li>
              <Link href="/tags" className="hover:text-brand">
                תגיות
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="hover:text-brand">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {COPYRIGHT_YEAR} {siteConfig.legalName}. כל הזכויות שמורות.{" "}
            {siteConfig.location.display}.
          </p>
          <p>תוכן חינוכי/עיתונאי — אינו ייעוץ השקעות.</p>
        </div>
      </div>
    </footer>
  );
}
