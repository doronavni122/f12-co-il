import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "יצירת קשר",
  description:
    "צרו קשר עם מערכת F12 - פניות עריכתיות, תיקונים עובדתיים ושיתופי פעולה.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">יצירת קשר</h1>
      <p className="mt-4 text-muted">
        לפניות למערכת, בקשות תיקון עובדתי, שיתופי פעולה או שאלות על מדיניות
        העריכה - השתמשו בטופס או בכתובות האימייל הישירות.
      </p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-surface p-5 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold text-foreground">מערכת / חדשות</p>
          <a
            className="mt-1 block text-brand hover:underline"
            href={`mailto:${siteConfig.contactEmail}`}
            dir="ltr"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
        <div>
          <p className="font-semibold text-foreground">עריכה</p>
          <a
            className="mt-1 block text-brand hover:underline"
            href={`mailto:${siteConfig.editorialEmail}`}
            dir="ltr"
          >
            {siteConfig.editorialEmail}
          </a>
        </div>
        <div>
          <p className="font-semibold text-foreground">תיקונים עובדתיים</p>
          <a
            className="mt-1 block text-brand hover:underline"
            href={`mailto:${siteConfig.correctionsEmail}`}
            dir="ltr"
          >
            {siteConfig.correctionsEmail}
          </a>
        </div>
        <div>
          <p className="font-semibold text-foreground">מיקום</p>
          <p className="mt-1 text-muted">{siteConfig.location.display}</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        מדיניות תיקונים מפורטת:{" "}
        <Link href="/corrections" className="text-brand hover:underline">
          תיקונים
        </Link>
        {" · "}
        מדיניות עריכה:{" "}
        <Link href="/editorial-policy" className="text-brand hover:underline">
          מדיניות עריכה
        </Link>
      </p>

      <h2 className="mt-10 font-display text-2xl font-bold">טופס פנייה</h2>
      <ContactForm />
    </div>
  );
}
