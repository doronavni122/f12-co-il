import Link from "next/link";
import { categories } from "@/lib/content/categories";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

const desktopLinks = [
  { href: "/news", label: "חדשות" },
  ...categories.map((cat) => ({ href: cat.href, label: cat.name })),
];

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 border-b border-border/80 bg-background/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold tracking-tight text-brand">
              F12
            </span>
            <span className="hidden text-xs font-medium text-muted sm:inline">
              חדשות פיננסים
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-brand-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted transition hover:border-brand hover:text-foreground"
          >
            חיפוש
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
