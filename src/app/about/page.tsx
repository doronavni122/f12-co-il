import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "אודות",
  description: `אודות ${siteConfig.name} — מדיה פיננסית ישראלית.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-bold">אודות F12</h1>
      <div className="prose-article mt-8">
        <p>
          <strong>F12</strong> הוא אתר חדשות פיננסים ישראלי שמתמקד בשוק ההון,
          מט״ח, נדל״ן, מאקרו וטק פיננסי — עם דגש על בהירות, מהירות ומשמעת עריכתית.
        </p>
        <p>
          אנחנו כותבים לקהל שרוצה להבין מה קורה בשווקים בלי רעש מיותר: משקיעים
          פרטיים, יזמים, ומקבלי החלטות שעובדים עם כסף אמיתי.
        </p>
        <p>
          התוכן באתר הוא עיתונאי/חינוכי ואינו מהווה ייעוץ השקעות, שיווק השקעות או
          המלצה פרטנית.
        </p>
      </div>
    </div>
  );
}
