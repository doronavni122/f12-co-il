import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של F12.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">מדיניות פרטיות</h1>
      <div className="prose-article mt-8">
        <p>
          {siteConfig.name} מכבד את פרטיות המשתמשים. אנו עשויים לאסוף נתוני שימוש
          בסיסיים (כגון דפים שנצפו ומדידת ביצועים) לצורך שיפור האתר.
        </p>
        <p>
          אם נפעיל ניוזלטר, כתובת האימייל תשמש רק למשלוח עדכונים ותוסר לפי בקשה.
        </p>
        <p>
          לפניות בנושא פרטיות:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </div>
    </div>
  );
}
