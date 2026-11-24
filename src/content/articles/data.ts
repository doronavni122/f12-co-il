import type { ArticleInput } from "@/lib/content/schema";
import { batchNov23_2026 } from "./batch-nov23-2026";
import { batchWave2_nov24_2026 } from "./batch-wave2-nov24-2026";
import {
  wave1PillarBodies,
  wave1StubBodies,
} from "./wave1-bodies";

/** Seed articles - original Hebrew finance news-style copy for F12 v1. */
export const articleSeed: ArticleInput[] = [
  {
    slug: "ta125-opens-higher-on-tech-leadership",
    title: "ת״א-125 נפתח בעליות: מניות הטכנולוגיה מובילות את המדד",
    excerpt:
      "פתיחת המסחר בתל אביב התאפיינה בביקושים לסקטור הטכנולוגיה, על רקע אופטימיות בוול סטריט וציפיות לדוחות רבעוניים חזקים.",
    category: "markets",
    authorId: "yael-cohen",
    publishedAt: "2026-11-23T07:15:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/ta125-opens-higher-on-tech-leadership.png",
    imageAlt: "גרף מדד תל אביב בעלייה כחולה על רקע כהה",
    tags: ["ת״א-125", "טכנולוגיה", "בורסה"],
    featured: true,
    body: wave1StubBodies["ta125-opens-higher-on-tech-leadership"],
  },
  {
    slug: "bank-of-israel-holds-rate-path",
    title: "בנק ישראל משאיר את הריבית ללא שינוי - מה זה אומר למשכנתאות",
    excerpt:
      "הוועדה המוניטרית החליטה להותיר את הריבית על כנה. בשוק המשכנתאות מצפים ליציבות קצרת טווח ולחץ על מסלולי הפריים.",
    category: "macro",
    authorId: "amir-levy",
    publishedAt: "2026-11-22T16:40:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/bank-of-israel-holds-rate-path.png",
    imageAlt: "מבנה מוסדי כחול המייצג מדיניות מוניטרית",
    tags: ["ריבית", "בנק ישראל", "משכנתאות"],
    featured: true,
    body: wave1StubBodies["bank-of-israel-holds-rate-path"],
  },
  {
    slug: "mortgage-spreads-widen-for-new-buyers",
    title: "מרווחי המשכנתאות מתרחבים: רוכשי דירה ראשונה משלמים יותר",
    excerpt:
      "בנקים מעלים מרווחים על הלוואות חדשות. נתוני F12 מראים פער הולך וגדל בין הצעות לרוכשים ראשונים לבין משקיעים ממונפים.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-22T11:20:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/mortgage-spreads-widen-for-new-buyers.png",
    imageAlt: "סימול מפתחות וגרף מימון נדלן",
    tags: ["משכנתא", "מרווח", "דיור"],
    featured: true,
    body: wave1StubBodies["mortgage-spreads-widen-for-new-buyers"],
  },
  {
    slug: "fintech-licensing-wave-israel-2026",
    title: "גל רישיונות פינטק בישראל: מי באמת מוכן לרגולציה",
    excerpt:
      "יותר חברות תשלומים וארנקים דיגיטליים נכנסות למסלול רישוי. הפער בין מוצר בשוק לבין ציות מלא עדיין גדול.",
    category: "fintech",
    authorId: "daniel-sharon",
    publishedAt: "2026-03-15T09:00:00+02:00",
    image: "/images/articles/fintech-licensing-wave-israel-2026.png",
    imageAlt: "ממשק דיגיטלי כחול של תשלומים פיננסיים",
    tags: ["פינטק", "רישוי", "תשלומים"],
    featured: false,
    noIndex: true,
    body: `## מה השתנה

רגולטורים בישראל מאיצים מסלולי רישוי לחברות תשלומים ונותני שירותים פיננסיים. עבור סטארטאפים, זה פותח דלת לבנקים ולשותפויות - אבל גם מעלה את עלות הציות.

## האתגרים הנפוצים

1. מערכות AML/KYC שעדיין ידניות מדי
2. תיעוד תהליכים חלקי
3. תלות בספקי ענן ללא בקרות מספקות

## מי מרוויח

חברות עם תשתית ציות מוקדמת מושכות משקיעים ביתר קלות. בנקים מחפשים שותפים שכבר עברו ביקורת ראשונית.

> רישיון אינו מוצר - הוא תשתית תפעולית יקרה שיש לתכנן מראש.`,
  },
  {
    slug: "crypto-liquidity-after-etf-flows",
    title: "נזילות הקריפטו אחרי זרימות ה-ETF: פחות דרמה, יותר מתאם",
    excerpt:
      "זרימות לקרנות ספוט הקטינו חלק מהתנודתיות הקיצונית, אך הגבירו את המתאם עם מניות הטכנולוגיה.",
    category: "crypto",
    authorId: "daniel-sharon",
    publishedAt: "2026-03-14T14:30:00+02:00",
    image: "/images/articles/crypto-liquidity-after-etf-flows.png",
    imageAlt: "סמל בלוקצ׳יין מינימליסטי בכחול",
    tags: ["ביטקוין", "ETF", "נזילות"],
    featured: false,
    noIndex: true,
    body: `## מה רואים בנתונים

מאז התבססות מוצרי ה-ETF, חלק מנפח המסחר עבר לערוצים מוסדיים. התוצאה: פחות קפיצות חד-צדדיות בשעות המסחר האמריקאיות, ויותר תגובה לסיכון גלובלי.

## למה זה חשוב לתיק הישראלי

משקיעים שראו בקריפטו "נכס לא מתואם" מגלים כיום מתאם גבוה יותר עם נאסד״ק בימי סיכון. זה משנה את תפקיד האלוקציה הקטנה בתיק.

## גישת F12

אנחנו ממליצים להתייחס לקריפטו כאל **רכיב לווייני** בתיק - עם מגבלת משקל ברורה - ולא כאל הימור מרכזי.`,
  },
  {
    slug: "why-cash-still-matters-in-portfolios",
    title: "דעה: למה מזומן עדיין חשוב בתיק - גם כשהשווקים עולים",
    excerpt:
      "בתקופות של אופטימיות, מזומן נתפס כ׳מת׳. בפועל הוא אופציה לקנייה כשהמחירים מתקנים.",
    category: "opinion",
    authorId: "yael-cohen",
    publishedAt: "2026-03-13T08:45:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/why-cash-still-matters-in-portfolios.png",
    imageAlt: "אייקון מזומן ותיק השקעות סכמטי",
    tags: ["תיק השקעות", "מזומן", "דעה"],
    featured: true,
    body: wave1StubBodies["why-cash-still-matters-in-portfolios"],
  },
  {
    slug: "shekel-dollar-range-traders-watch",
    title: "דולר-שקל בטווח צפוף: מה הסוחרים באמת עוקבים אחריו",
    excerpt:
      "הטווח הצר אינו אומר שקט. נתוני מאקרו מארה״ב וזרימות של יצואנים ממשיכים להכתיב את הכיוון.",
    category: "crypto",
    authorId: "yael-cohen",
    publishedAt: "2026-03-12T10:10:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/shekel-dollar-range-traders-watch.png",
    imageAlt: "גרף שער חליפין דולר שקל",
    tags: ["דולר", "שקל", "מט״ח"],
    featured: false,
    body: wave1StubBodies["shekel-dollar-range-traders-watch"],
  },
  {
    slug: "us-jobs-data-israeli-markets",
    title: "נתוני התעסוקה בארה״ב: למה הבורסה בת״א מגיבה מהר",
    excerpt:
      "דוח תעסוקה אמריקאי משפיע על ציפיות הריבית - ומשם על מניות הדואליות ועל השקל.",
    category: "macro",
    authorId: "amir-levy",
    publishedAt: "2026-03-11T18:00:00+02:00",
    image: "/images/articles/us-jobs-data-israeli-markets.png",
    imageAlt: "אינדיקטור תעסוקה ומאקרו גלובלי",
    tags: ["תעסוקה", "פד", "מאקרו"],
    featured: false,
    noIndex: true,
    body: `## שרשרת ההשפעה

נתוני תעסוקה חזקים → ציפיות לריבית גבוהה יותר לאורך זמן → לחץ על מניות צמיחה ועל שערי מטבע.

## ישראל בתוך הסיפור

מניות דואליות מגיבות כמעט מיידית. במקביל, ציפיות לריבית בארה״ב משפיעות על תמחור אג״ח מקומי דרך ערוץ המט״ח.

## איך לקרוא את הדוח

לא רק את כותרת ה״נון-פארם״ - גם את שיעור ההשתתפות ואת שכר השעה. אלה משנים את פרשנות האינפלציה.`,
  },
  {
    slug: "rental-yields-tel-aviv-periphery",
    title: "תשואות שכירות: תל אביב מול הפריפריה - מי באמת מנצחת",
    excerpt:
      "מחירי הרכישה במרכז דוחפים משקיעים החוצה. התשואה הגולמית בפריפריה גבוהה יותר - אבל הסיכון התפעולי גם.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-03-10T12:00:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/rental-yields-tel-aviv-periphery.png",
    imageAlt: "אופק עירוני ותשואת שכירות",
    tags: ["שכירות", "תשואה", "נדלן"],
    featured: false,
    body: wave1StubBodies["rental-yields-tel-aviv-periphery"],
  },
  {
    slug: "open-banking-competition-israel",
    title: "בנקאות פתוחה בישראל: התחרות מתחילה להרגיש אמיתית",
    excerpt:
      "אפליקציות ניהול תקציב וחשבונות מרובים הופכות את המעבר בין בנקים לפשוט יותר - והעמלות תחת לחץ.",
    category: "fintech",
    authorId: "daniel-sharon",
    publishedAt: "2026-03-09T09:30:00+02:00",
    image: "/images/articles/open-banking-competition-israel.png",
    imageAlt: "חיבורי API בנקאיים סכמטיים",
    tags: ["בנקאות פתוחה", "עמלות", "צרכנות"],
    featured: false,
    noIndex: true,
    body: `## מה השתנה לצרכן

יותר ישראלים רואים את כל החשבונות במקום אחד. זה מקצר את זמן ההשוואה ומגביר לחץ על עמלות עו״ש וכרטיסים.

## מה עדיין חסר

חוויית העברת משכורת והוראות קבע עדיין מורכבת. עד שזה ייפתר במלואו, נאמנות לבנק הישן תישאר גבוהה.

## מבט עסקי

פינטקים שמצליחים להפוך נתונים לפעולה (חיסכון אוטומטי, התראות חריגה) בונים מוצר דביק יותר מאשר דשבורד בלבד.`,
  },
  {
    slug: "stablecoins-payments-rail-watch",
    title: "סטבלקוין כמסילת תשלומים: מה כבר עובד ומה עדיין ניסוי",
    excerpt:
      "שימוש תאגידי בסטבלקוין גדל בסליקה חוצת גבולות, אך בישראל המסלול הרגולטורי עדיין מתעצב.",
    category: "crypto",
    authorId: "daniel-sharon",
    publishedAt: "2026-03-08T15:15:00+02:00",
    image: "/images/articles/stablecoins-payments-rail-watch.png",
    imageAlt: "מטבע יציב דיגיטלי כחול",
    tags: ["סטבלקוין", "תשלומים", "רגולציה"],
    featured: false,
    noIndex: true,
    body: `## השימוש האמיתי

רוב הפעילות העסקית אינה ספקולציה אלא העברות בין חברות עם צורך בנזילות דולרית מהירה מחוץ לשעות הבנק.

## הסיכונים

סיכון מנפיק, שמירת רזרבות, וחסימות רגולטוריות. אלה לא נעלמים רק כי הממשק נוח.

## מסקנה זהירה

סטבלקוין הוא כלי תשתית מבטיח - לא תחליף מלא למערכת הבנקאית בטווח הקרוב.`,
  },
  {
    slug: "inflation-expectations-household-budget",
    title: "ציפיות אינפלציה: איך לבנות תקציב בית בלי להיכנס לפאניקה",
    excerpt:
      "כשהכותרות צועקות אינפלציה, משקי בית נוטים לקצץ במקום הלא נכון. מסגרת פשוטה עוזרת יותר.",
    category: "macro",
    authorId: "amir-levy",
    publishedAt: "2026-03-07T07:50:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/inflation-expectations-household-budget.png",
    imageAlt: "עגלת קניות ומדד מחירים",
    tags: ["אינפלציה", "תקציב", "משקי בית"],
    featured: false,
    body: wave1StubBodies["inflation-expectations-household-budget"],
  },
  {
    slug: "corporate-bonds-israel-spread-story",
    title: "אג״ח קונצרני בישראל: המרווחים מספרים סיפור על סיכון אשראי",
    excerpt:
      "מרווחי האשראי התרחבו בענפים מסוימים. למשקיעים זה איתות לבחון דירוגים ונזילות מחדש.",
    category: "markets",
    authorId: "yael-cohen",
    publishedAt: "2026-03-06T13:25:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/corporate-bonds-israel-spread-story.png",
    imageAlt: "עקומת תשואות אגח קונצרני",
    tags: ["אג״ח", "אשראי", "מרווחים"],
    featured: false,
    body: wave1StubBodies["corporate-bonds-israel-spread-story"],
  },
  {
    slug: "proptech-lending-platforms-rise",
    title: "פלטפורמות מימון נדל״ן: בין גישור בנקאי לסיכון משקיעים",
    excerpt:
      "פלטפורמות דיגיטליות מציעות מימון מהיר ליזמים. התשואות גבוהות - והשקיפות משתנה ממוצר למוצר.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-03-05T11:05:00+02:00",
    image: "/images/articles/proptech-lending-platforms-rise.png",
    imageAlt: "פלטפורמת מימון נדלן דיגיטלית",
    tags: ["מימון", "יזמות", "פרופ-טק"],
    featured: false,
    noIndex: true,
    body: `## למה היזמים באים

מהירות אישור וגמישות מבנית. הבנק עדיין שולט בעסקאות גדולות, אך בשלבי ביניים הפלטפורמות תופסות נתח.

## מה המשקיע צריך לבדוק

- בטוחות ושעבודים
- יחס LTV
- ניסיון היזם בפרויקטים קודמים
- מנגנון טיפול בכשל

## אזהרה

תשואה מובטחת בכותרת אינה תחליף לניתוח סיכון.`,
  },
  {
    slug: "ai-trading-tools-retail-investors",
    title: "כלי מסחר מבוססי AI למשקיעים פרטיים: הבטחה מול ביצוע",
    excerpt:
      "אפליקציות מבטיחות ׳אותות חכמים׳. בפועל רוב הערך הוא ארגון מידע - לא ניבוי קסם של השוק.",
    category: "fintech",
    authorId: "daniel-sharon",
    publishedAt: "2026-03-04T16:20:00+02:00",
    image: "/images/articles/ai-trading-tools-retail-investors.png",
    imageAlt: "ממשק מסחר אלגוריתמי מינימליסטי",
    tags: ["AI", "מסחר", "קמעונאות"],
    featured: false,
    noIndex: true,
    body: `## מה באמת עובד

סיכום דוחות, ניטור חדשות, והתראות על חריגות תנודתיות. אלה חוסכים זמן.

## מה פחות אמין

הבטחות לתשואה עודפת עקבית. שווקים יעילים מספיק כדי להפוך ׳אותות׳ פשוטים ללא רלוונטיים במהירות.

## המלצת F12

השתמשו ב-AI כשכבת מחקר - לא כמנהל תיק אוטומטי ללא בקרה.`,
  },
  {
    slug: "long-term-investing-noise-filter",
    title: "דעה: איך לסנן רעש חדשותי בלי להתנתק מהשוק",
    excerpt:
      "משקיע לטווח ארוך לא צריך להתעלם מחדשות - הוא צריך מסנן. אלה שלושת השאלות שעוזרות.",
    category: "opinion",
    authorId: "amir-levy",
    publishedAt: "2026-03-03T08:00:00+02:00",
    image: "/images/articles/long-term-investing-noise-filter.png",
    imageAlt: "מסנן חדשות פיננסיות סכמטי",
    tags: ["השקעות", "פסיכולוגיה", "דעה"],
    featured: false,
    noIndex: true,
    body: `## שלוש שאלות לפני תגובה

1. האם האירוע משנה תזרים מזומנים עתידי של החברות בתיק?
2. האם הוא משנה את עלות המימון שלי?
3. האם אני פועל מתוך תוכנית - או מתוך כותרת?

## שגרה מומלצת

בדיקת תיק חודשית, קריאת מאקרו שבועית ממוקדת, והתעלמות מרוב התנודות התוך-יומיות.

## סיום

משמעת עדיפה על תחזיות מבריקות.`,
  },
  {
    slug: "euro-shekel-european-slowdown",
    title: "אירו-שקל: האטה באירופה מחלישה את הביקוש למטבע",
    excerpt:
      "נתוני צמיחה חלשים בגוש האירו לוחצים על האירו. מול השקל התמונה מורכבת יותר בגלל זרימות מקומיות של יצואנים.",
    category: "crypto",
    authorId: "amir-levy",
    publishedAt: "2026-03-08T10:20:00+02:00",
    image: "/images/articles/euro-shekel-european-slowdown.png",
    imageAlt: "גרף מטבעות על רקע כחול",
    tags: ["אירו", "שקל", "מט״ח"],
    featured: false,
    noIndex: true,
    body: `## הרקע

נתוני צמיחה חלשים בגוש האירו מחלישים את הביקוש ל-**אירו**. מול הדולר הלחץ ברור יותר; מול השקל נכנסים גם גורמים מקומיים כמו יצוא הייטק.

## מי חשוף

יצואנים לאירופה חשים לחץ על שולי הרווח. יבואנים מאירופה עשויים ליהנות - אם המחירים בחו״ל לא עולים במקביל.

## מבט קדימה

כל עוד פערי הריבית מול ארה״ב נותרים רחבים, האירו עלול להישאר תחת לחץ יחסי.`,
  },
  {
    slug: "investor-protection-re-due-diligence",
    title: "הגנת משקיעים במיזמי נדל״ן: מדריך בדיקת נאותות לפני הפקדה",
    excerpt:
      "לפני שמפקידים כסף במיזם נדל״ן פרטי - בארץ או בחו״ל - משקיעים יכולים לבנות שכבת הגנה פשוטה: מסמכים, נאמנות, דיווח וביקורת. מדריך F12 על בסיס לקחים מדיווחים פומביים.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-23T18:05:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/investor-protection-re-due-diligence.png",
    imageAlt: "איור כחול של בדיקת נאותות להשקעת נדלן",
    tags: ["הגנת משקיעים", "בדיקת נאותות", "מיזמי נדל״ן", "גיא אבני"],
    featured: true,
    body: wave1PillarBodies["investor-protection-re-due-diligence"],
  },
  {
    slug: "trustee-account-literacy-for-investors",
    title: "חשבון נאמנות בהשקעות נדל״ן: מה משקיע חייב להבין לפני שמפקידים",
    excerpt:
      "״נאמן על הכספים״ נשמע כמו שכבת ביטחון - אבל רק אם הנאמנות מוגדרת, מבוקרת וניתנת לאכיפה. מדריך אוריינות לנאמנות למשקיעי נדל״ן.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-23T18:25:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/trustee-account-literacy-for-investors.png",
    imageAlt: "איור של חשבון נאמנות ומפתחות פיננסיים",
    tags: ["נאמנות", "נאמן משקיעים", "הגנת משקיעים", "נדל״ן"],
    featured: true,
    body: wave1PillarBodies["trustee-account-literacy-for-investors"],
  },
  {
    slug: "overseas-real-estate-diligence-guide",
    title: "נדל״ן בחו״ל לישראלים: מיאמי, לונדון ובדיקות חובה לפני השקעה",
    excerpt:
      "מיזמי נדל״ן במיאמי ובלונדון מושכים תשואה מובטחת בכותרות - אבל בדיקת נאותות חוצת-גבולות דורשת אימות בעלות, רגולציה מקומית ונתיב כסף. מדריך מעשי.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-23T18:45:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/overseas-real-estate-diligence-guide.png",
    imageAlt: "מפת השקעות נדלן בינלאומית בסגנון F12",
    tags: ["נדל״ן מיאמי", "נדל״ן לונדון", "נדל״ן בחו״ל", "בדיקת נאותות"],
    featured: false,
    body: wave1PillarBodies["overseas-real-estate-diligence-guide"],
  },
  {
    slug: "plea-bargain-explainer-economic-cases",
    title: "הסדר טיעון בתיקים כלכליים: מדריך תהליך למשקיעים (לא ייעוץ משפטי)",
    excerpt:
      "כשמופיעה בכותרות המילה ״הסדר טיעון״ לצד בקשת עונש של הפרקליטות, משקיעים לעיתים מתבלבלים בין הודאה, הרשעה וגזר דין. הסבר תהליך כללי - בלי דרמה ובלי הבטחות.",
    category: "markets",
    authorId: "yael-cohen",
    publishedAt: "2026-11-23T19:05:00+02:00",
    updatedAt: "2026-11-24T12:00:00+02:00",
    image: "/images/articles/plea-bargain-explainer-economic-cases.png",
    imageAlt: "איור תהליך משפטי כלכלי ניטרלי",
    tags: ["הסדר טיעון", "פרקליטות", "תיקים כלכליים", "אוריינות משפטית"],
    featured: false,
    body: wave1PillarBodies["plea-bargain-explainer-economic-cases"],
  },
  {
    slug: "guy-avni-case-investor-lessons",
    title: "גיא אבני בדיווחים פומביים: שיעורי הגנה למשקיעים - בלי דרמה",
    excerpt:
      "לפי דיווחים בכלי תקשורת, עו״ד גיא אבני הורשע במסגרת הסדר טיעון בתיק שכלל מיזמי נדל״ן וכספי משקיעים. F12 מסכם לקחים להגנת משקיעים - בלי הכחשת רישום ובלי כותרות עוקץ.",
    category: "markets",
    authorId: "yael-cohen",
    publishedAt: "2026-11-23T19:35:00+02:00",
    updatedAt: "2026-11-23T22:50:00+02:00",
    image: "/images/articles/guy-avni-case-investor-lessons.png",
    imageAlt: "איור ניטרלי של לקחים למשקיעים מתיק מדווח",
    tags: ["גיא אבני", "הגנת משקיעים", "פרשת בראשית", "כספי משקיעים"],
    featured: true,
    body: `## מה מדווחים - ומה אנחנו לא עושים

לפי דיווחים ב-כלכליסט, TheMarker, גלובס, Bizportal, ynet, מעריב ו-ice, עו״ד **גיא אבני** הורשע במסגרת **הסדר טיעון** בתיק שקשור למיזמי נדל״ן ולכספי משקיעים, בהיקפים שדווחו סביב כ-7 מיליון שקל בגניבה/קבלה במרמה וכ-30 מיליון שקל נוספים בסיוע להונאה (לפי אותם דיווחים). F12 אינו מכחיש רישום פומבי ואינו ממציא זיכוי. אנחנו גם לא משתמשים בכותרת ״עוקץ״ כ-H1 - המיקוד הוא **הגנת משקיעים**.

## הבהרת זהות

הנושא בדיווחים הוא עורך הדין **גיא אבני** כפי שצוין בכלי התקשורת. F12 הוא אתר חדשות פיננסיות; אין כאן שיוך מיתוג בין האתר לבין הנשוא האישי מעבר לדיווח עובדתי.

## מה ההגנה אמרה לפי דיווחים

בדיווחים צוטטו באי-כוחו כמי שציינו כי לפי כתב האישום המתוקן אבני לא הוצג כיוזם העיקרי וכי הכספים לא הגיעו לכיסו מעבר לשכר טרחה - לצד נטילת אחריות על מעשים אסורים והכרה בנזק למשקיעים. זה ציטוט דיווחי, לא פסק דין חדש.

## שיעורי הגנה (למעלה לפילרים)

- בדקו נאמנות אמיתית: [אוריינות חשבון נאמנות](/article/trustee-account-literacy-for-investors)
- לפני הפקדה: [מדריך בדיקת נאותות](/article/investor-protection-re-due-diligence)
- מיזמים בחו״ל: [מיאמי ולונדון](/article/overseas-real-estate-diligence-guide)
- קריאת כותרת משפטית: [הסדר טיעון - הסבר](/article/plea-bargain-explainer-economic-cases)

## שורה תחתונה

הסיפור הפומבי סביב גיא אבני הוא תזכורת למשקיעים לבדוק נתיב כסף - לא תירוץ לכותרות צהובות.`,
  },
  {
    slug: "netivot-student-housing-project-checks",
    title: "מיזמי מעונות וסטודנטים: איך בודקים לפני שמשקיעים ליד נתיבות ובפריפריה",
    excerpt:
      "מיזמי מעונות ליד נתיבות הופיעו בדיווחים על גיוסי משקיעים. לפני שמצטרפים לפרויקט דומה - היתרים, תקציב, נאמנות ושימוש בקרקע.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-23T19:55:00+02:00",
    updatedAt: "2026-11-23T22:50:00+02:00",
    image: "/images/articles/netivot-student-housing-project-checks.png",
    imageAlt: "איור מיזם מעונות סטודנטים ובדיקות מימון",
    tags: ["מעונות נתיבות", "מיזמי נדל״ן", "בדיקת נאותות", "פריפריה"],
    featured: false,
    body: `## למה מעונות מופיעים בחדשות

בדיווחים על מיזמי השקעה שכללו גם הקשר ל**מעונות** באזור נתיבות תוארו גיוסי משקיעים והעברות כספים מחשבונות נאמנות. בלי לחזור על כותרות דרמטיות: משקיע בפרויקט מעונות צריך אותה משמעת כמו בכל נדל״ן יזמי.

## רשימת בדיקות קצרה

1. היתר בנייה / תב״ע רלוונטית - לא רק הדמיה.
2. חוזה נאמנות עם אבני-דרך תשלום.
3. דוח שמאי ותקציב בנייה מעודכן.
4. מי שוכר בסוף - ביקוש סטודנטים מול היצע.
5. הפרדה בין הוצאות פרויקט להוצאות שאינן קשורות.

להעמקה: [הגנת משקיעים](/article/investor-protection-re-due-diligence) · [נאמנות](/article/trustee-account-literacy-for-investors) · [לקחים מדיווחים](/article/guy-avni-case-investor-lessons).

## שורה תחתונה

מעונות בפריפריה יכולים להיות מיזם לגיטימי - אם הבדיקות עוברות לפני ההפקדה, לא אחרי הכותרת.`,
  },
  {
    slug: "prosecution-sentencing-request-explainer",
    title: "בקשת עונש של הפרקליטות בתיק כלכלי: מה זה אומר למשקיע הקורא",
    excerpt:
      "״הפרקליטות תבקש עד ארבע שנות מאסר״ הוא משפט נפוץ בדיווחים. הסבר קצר מהי בקשת עונש, במה היא שונה מגזר דין, ולמה זה חשוב למשקיעים שעוקבים אחרי תיקים.",
    category: "markets",
    authorId: "amir-levy",
    publishedAt: "2026-11-23T20:10:00+02:00",
    updatedAt: "2026-11-23T22:50:00+02:00",
    image: "/images/articles/prosecution-sentencing-request-explainer.png",
    imageAlt: "איור ניטרלי של תהליך בקשת עונש",
    tags: ["פרקליטות", "ארבע שנות מאסר", "הסדר טיעון", "אוריינות משפטית"],
    featured: false,
    body: `## בקשה ≠ גזר דין

בדיווחים על תיקים כלכליים - כולל דיווחים שציינו מסגרת של **עד ארבע שנות מאסר** בתיק שקשור לעו״ד **גיא אבני** - מופיעה לעיתים **בקשת עונש** מצד הפרקליטות. זו עמדת תביעה במסגרת שסוכמה או שתוצג לטיעונים; בית המשפט הוא שגוזר.

## מה משקיע יכול לקחת מזה

- המסגרת מספרת על חומרה נתפסת - לא על החזר כספי אוטומטי למשקיעים.
- הליכים אזרחיים/חדלות פירעון, אם ישנם, רצים במסלולים נפרדים.
- קריאת תהליך מלאה חשובה יותר ממספר השנים בכותרת.

ראו גם: [הסדר טיעון - מדריך](/article/plea-bargain-explainer-economic-cases) · [שיעורי הגנה](/article/guy-avni-case-investor-lessons).

## שורה תחתונה

כשמופיעה ״בקשת עונש״ - קראו זאת כשלב בתהליך, לא כסיכום סופי של הסיפור למשקיעים.`,
  },
  {
    slug: "cross-border-re-marketing-questions",
    title: "שיווק מיזמי נדל״ן חוצי-גבולות: שאלות לפני שחותמים על הצטרפות",
    excerpt:
      "כשמשקיעים מציגים פרויקט בלונדון או במיאמי לצד גיוס בישראל, צריך שאלון קצר לפני החתימה: ישות, נאמנות, אימות נכס ושקיפות תזרים.",
    category: "real-estate-finance",
    authorId: "noa-ben-david",
    publishedAt: "2026-11-23T20:25:00+02:00",
    updatedAt: "2026-11-23T22:50:00+02:00",
    image: "/images/articles/cross-border-re-marketing-questions.png",
    imageAlt: "איור שיווק נדלן חוצה גבולות ושאלות בדיקה",
    tags: ["שיווק מיזמי נדל״ן", "נדל״ן בחו״ל", "30 מיליון שקל", "בדיקת נאותות"],
    featured: false,
    body: `## למה שיווק חוצה-גבולות דורש יותר שאלות

דיווחים על מיזמים בהיקפים של עשרות מיליוני שקלים - כולל אזכורים לנדל״ן בלונדון ובמיאמי - מדגישים סיכון מוכר: ככל שהשרשרת ארוכה יותר, כך קל יותר לאבד מעקב אחרי הכסף. המאמר הזה הוא שאלון, לא כתב אישום.

## שמונה שאלות לפני חתימה

1. מי החברה הרושמת בחו״ל ומי הערב בישראל?
2. האם שם החברה דומה למותג מוכר - ואם כן, האם יש אישור?
3. היכן חשבון הנאמנות ומי מורשה להעביר?
4. אילו מסמכים מקבלים לפני כל שחרור כסף?
5. מהו מנגנון דיווח למשקיעים בעברית?
6. מי רואה את היתרות בבנק בפועל?
7. מה קורה אם הפרויקט מתעכב?
8. האם יש ביטוח/ערבות שניתן לאמת מול המנפיק?

המשך קריאה: [מדריך חו״ל](/article/overseas-real-estate-diligence-guide) · [נאמנות](/article/trustee-account-literacy-for-investors) · [הגנת משקיעים](/article/investor-protection-re-due-diligence).

## שורה תחתונה

שיווק מיזמי נדל״ן חוצי-גבולות יכול להיות לגיטימי - אם התשובות לשאלות האלה כתובות, ניתנות לאימות, ומגיעות לפני ההעברה הראשונה.`,
  },
  ...batchNov23_2026,
  ...batchWave2_nov24_2026,
];
