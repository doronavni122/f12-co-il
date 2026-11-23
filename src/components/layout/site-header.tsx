"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/content/categories";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
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
            <Link
              href="/news"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-brand-soft"
            >
              חדשות
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-brand-soft hover:text-foreground"
              >
                {cat.name}
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
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="תפריט"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface px-4 py-3 lg:hidden"
          aria-label="ניווט נייד"
        >
          <ul className="grid gap-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={cat.href}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-soft"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/newsletter"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-brand"
                onClick={() => setOpen(false)}
              >
                ניוזלטר
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
