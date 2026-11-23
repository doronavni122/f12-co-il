import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "מדיניות תיקונים",
  description:
    "כיצד F12 מתקן טעויות עובדתיות וכיצד לבקש תיקון לכתבה שפורסמה.",
  path: "/corrections",
});

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">מדיניות תיקונים</h1>
      <p className="mt-3 text-muted">
        מחויבות לדיוק ולשקיפות כשמזוהה טעות בתוכן שפורסם.
      </p>

      <div className="prose-article mt-8">
        <h2>עקרון כללי</h2>
        <p>
          {siteConfig.name} מתקן טעויות עובדתיות מהותיות בהקדם סביר. תיקון
          מהותי יסומן בכתבה (למשל הערת תיקון או עדכון תאריך) כדי שהקוראים יידעו
          מה השתנה.
        </p>

        <h2>מה נחשב לתיקון מהותי</h2>
        <ul>
          <li>שגיאה במספר, תאריך, שם, ציטוט או עובדה מרכזית.</li>
          <li>ייחוס שגוי למקור או לגוף רשמי.</li>
          <li>הקשר מטעה שמשנה את משמעות הדיווח.</li>
        </ul>
        <p>
          עדכוני התפתחות (מידע חדש אחרי הפרסום) עשויים להיות מסומנים כ״עדכון״
          ולא כתיקון טעות.
        </p>

        <h2>כיצד לבקש תיקון</h2>
        <ol>
          <li>
            שלחו אימייל אל{" "}
            <a href={`mailto:${siteConfig.correctionsEmail}`}>
              {siteConfig.correctionsEmail}
            </a>{" "}
            או מלאו את{" "}
            <Link href="/contact">טופס יצירת הקשר</Link> בנושא ״בקשת תיקון
            עובדתי״.
          </li>
          <li>ציינו את כתובת הכתבה (URL) ואת הכותרת.</li>
          <li>תארו את הטעות העובדתית ואת הניסוח הנכון לטענתכם.</li>
          <li>צרפו מקור תומך (קישור רשמי, מסמך, דיווח) ככל שניתן.</li>
        </ol>

        <h2>טיפול בבקשה</h2>
        <p>
          המערכת בוחנת את הבקשה מול המקורות הזמינים. אם התיקון מתקבל — העמוד
          מתעדכן ומופיעה הערה מתאימה. אם הבקשה נדחית — ניתן לקבל הסבר קצר לפי
          פנייה. פניות פוגעניות או חסרות בסיס עובדתי לא יטופלו.
        </p>

        <h2>קשר למדיניות עריכה</h2>
        <p>
          מדיניות זו היא חלק מ-
          <Link href="/editorial-policy">מדיניות העריכה</Link> של{" "}
          {siteConfig.legalName}. למידע על המפרסם:{" "}
          <Link href="/about">אודות</Link>.
        </p>
      </div>
    </div>
  );
}
