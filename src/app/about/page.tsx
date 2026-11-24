import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "אודות",
  description: `אודות ${siteConfig.name} - מי מפרסם, מה המשימה, ומי אחראי על התוכן העריכתי.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">אודות F12</h1>
      <p className="mt-3 text-muted">
        שקיפות עריכתית לקהל הקוראים ולשותפי הפצה.
      </p>

      <div className="prose-article mt-8">
        <h2>מי מפרסם את F12</h2>
        <p>
          <strong>{siteConfig.legalName}</strong> מפעיל את אתר{" "}
          <strong>{siteConfig.name}</strong> ({siteConfig.domain}) - מדיה פיננסית
          בעברית המתמקדת בשוק ההון, מט״ח, נדל״ן ומימון, מאקרו, פינטק וקריפטו.
        </p>
        <p>{siteConfig.ownership}</p>

        <h2>המשימה</h2>
        <p>
          המשימה שלנו היא לספק חדשות וניתוח פיננסי ברורים, ממוקדים ומבוססי מקורות -
          בלי רעש מיותר ובלי הבטחות השקעה. אנחנו כותבים למשקיעים פרטיים, יזמים
          ומקבלי החלטות שצריכים להבין במהירות מה קורה בשווקים ומה המשמעות
          העסקית.
        </p>

        <h2>אחריות עריכתית</h2>
        <p>
          האחריות על סטנדרטים עיתונאיים, תיקונים והפרדה בין תוכן עריכתי לפרסום
          מוטלת על צוות המערכת. מדיניות העריכה המלאה זמינה ב-
          <Link href="/editorial-policy">מדיניות עריכה</Link>, ומדיניות התיקונים
          ב-
          <Link href="/corrections">תיקונים</Link>.
        </p>
        <p>
          רשימת הכותבים והביוגרפיות הציבוריות שלהם:{" "}
          <Link href="/authors">כותבי F12</Link>.
        </p>

        <h2>מיקום ויצירת קשר</h2>
        <p>
          מקום הפעילות העיקרי: <strong>{siteConfig.location.display}</strong>.
        </p>
        <ul>
          <li>
            מערכת / חדשות:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </li>
          <li>
            עריכה:{" "}
            <a href={`mailto:${siteConfig.editorialEmail}`}>
              {siteConfig.editorialEmail}
            </a>
          </li>
          <li>
            תיקונים עובדתיים:{" "}
            <a href={`mailto:${siteConfig.correctionsEmail}`}>
              {siteConfig.correctionsEmail}
            </a>
          </li>
        </ul>
        <p>
          ניתן גם לפנות דרך{" "}
          <Link href="/contact">טופס יצירת הקשר</Link>.
        </p>

        <h2>הבהרה חשובה</h2>
        <p>
          התוכן באתר הוא עיתונאי וחינוכי בלבד. הוא אינו ייעוץ השקעות, שיווק
          השקעות, ייעוץ מס או המלצה פרטנית. כל החלטת השקעה היא באחריות הקורא
          בלבד.
        </p>
      </div>
    </div>
  );
}
