"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/content/categories";

const mobileLinks = [
  { href: "/news", label: "חדשות" },
  ...categories.map((cat) => ({ href: cat.href, label: cat.name })),
  { href: "/authors", label: "כותבים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "יצירת קשר" },
  { href: "/editorial-policy", label: "מדיניות עריכה" },
  { href: "/corrections", label: "תיקונים" },
  { href: "/privacy", label: "פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/search", label: "חיפוש" },
  { href: "/newsletter", label: "ניוזלטר", emphasize: true as const },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="תפריט"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 border-t border-border bg-surface px-4 py-3 shadow-sm"
          aria-label="ניווט נייד"
        >
          <ul className="mx-auto grid max-w-6xl gap-1">
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2 text-sm hover:bg-brand-soft ${
                    "emphasize" in link && link.emphasize
                      ? "font-medium text-brand"
                      : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
