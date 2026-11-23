import Link from "next/link";

export function NewsletterCta() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--foreground)] px-6 py-10 text-[var(--background)] md:px-10">
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-[var(--brand)] to-transparent hero-glow-line"
        aria-hidden
      />
      <div className="relative max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-[var(--accent)]">
          ניוזלטר F12
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
          סיכום שווקים יומי — בלי רעש
        </h2>
        <p className="mt-3 text-sm leading-7 opacity-85 md:text-base">
          כותרות נבחרות ומה שחשוב לתיק. הרשמה לרשימת המתנה — נפתח בקרוב.
        </p>
        <Link
          href="/newsletter"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-[var(--brand)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]"
        >
          לרשימת המתנה
        </Link>
      </div>
    </section>
  );
}
