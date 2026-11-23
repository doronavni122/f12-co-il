import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "תנאי שימוש",
  description: "תנאי השימוש באתר F12.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">תנאי שימוש</h1>
      <div className="prose-article mt-8">
        <p>
          השימוש באתר {siteConfig.name} מהווה הסכמה לתנאים אלה. התוכן מוגש כמידע
          כללי בלבד ואינו ייעוץ השקעות, מס או משפט.
        </p>
        <p>
          אין להעתיק או להפיץ תכנים מהאתר ללא אישור, למעט שימוש הוגן לציטוט קצר עם
          קרדיט וקישור.
        </p>
        <p>
          {siteConfig.legalName} אינו אחראי להחלטות השקעה או לנזק עקיף הנובע
          מהסתמכות על תכני האתר.
        </p>
      </div>
    </div>
  );
}
