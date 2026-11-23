import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ניוזלטר",
  description: "הירשמו לרשימת ההמתנה לניוזלטר היומי של F12.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">ניוזלטר F12</h1>
      <p className="mt-4 text-muted">
        סיכום שווקים יומי — כותרות נבחרות בלי רעש. הניוזלטר המלא ייפתח בקרוב;
        השאירו אימייל לרשימת המתנה.
      </p>
      <NewsletterForm />
    </div>
  );
}
