import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 md:px-6">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold">העמוד לא נמצא</h1>
      <p className="mt-3 text-muted">
        ייתכן שהכתבה הוסרה או שהכתובת שגויה. חזרו לדף הבית או חפשו כותרת אחרת.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong"
        >
          לדף הבית
        </Link>
        <Link
          href="/search"
          className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold hover:border-brand"
        >
          חיפוש
        </Link>
      </div>
    </div>
  );
}
