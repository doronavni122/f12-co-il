import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  consent: z.literal(true),
});

/** In-memory waitlist for this process — replace with ESP when ready. */
const waitlist = new Set<string>();

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch (error) {
    console.error("[newsletter] invalid json", error);
    return NextResponse.json(
      { ok: false, error: "בקשה לא תקינה" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    console.error("[newsletter] validation failed", parsed.error.flatten());
    return NextResponse.json(
      { ok: false, error: "נדרש אימייל תקין ואישור לקבלת דיוור" },
      { status: 400 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  waitlist.add(email);
  console.info("[newsletter] waitlist join", {
    emailDomain: email.split("@")[1],
    size: waitlist.size,
  });

  return NextResponse.json(
    {
      ok: true,
      message: "נרשמתם לרשימת ההמתנה. ניצור קשר כשהניוזלטר ייפתח.",
    },
    { status: 202 },
  );
}
