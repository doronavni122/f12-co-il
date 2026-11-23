import { authorSchema, type Author } from "./schema";

const rawAuthors = [
  {
    id: "yael-cohen",
    name: "יעל כהן",
    title: "עורכת שווקים",
    bio: "עוקבת אחרי מדדי ת״א, וול סטריט וזרימות מוסדיים. לשעבר אנליסטית בבית השקעות ישראלי.",
  },
  {
    id: "amir-levy",
    name: "אמיר לוי",
    title: "כתב מאקרו",
    bio: "מסקר את בנק ישראל, הפד והאינפלציה הגלובלית. מתמקד בהשפעה על משקי בית ועסקים.",
  },
  {
    id: "noa-ben-david",
    name: "נועה בן-דוד",
    title: "כתבת נדל״ן ומימון",
    bio: "כותבת על משכנתאות, מימון יזמים ותשואות נדל״ן מניב בישראל.",
  },
  {
    id: "daniel-sharon",
    name: "דניאל שרון",
    title: "כתב פינטק וקריפטו",
    bio: "מסקר רגולציה פיננסית, סטארטאפים ותשלומים דיגיטליים.",
  },
] as const;

export const authors: Author[] = rawAuthors.map((a) => authorSchema.parse(a));

export function getAuthor(id: string): Author {
  const found = authors.find((a) => a.id === id);
  if (!found) {
    throw new Error(`[authors] unknown id: ${id}`);
  }
  return found;
}
