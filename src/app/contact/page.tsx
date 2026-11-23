import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "יצירת קשר",
  description: "צרו קשר עם מערכת F12.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">יצירת קשר</h1>
      <p className="mt-4 text-muted">
        לפניות למערכת, שיתופי פעולה או תיקונים עובדתיים:
      </p>
      <p className="mt-6 text-lg">
        <a className="text-brand hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
      </p>
      <p className="mt-8 text-sm text-muted">
        דומיין: {siteConfig.domain}
      </p>
    </div>
  );
}
