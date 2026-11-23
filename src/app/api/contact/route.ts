import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  subject: z.enum(["editorial", "correction", "partnership", "other"]),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch (error) {
    console.error("[contact] invalid json", error);
    return NextResponse.json(
      { ok: false, error: "בקשה לא תקינה" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    console.error("[contact] validation failed", parsed.error.flatten());
    return NextResponse.json(
      {
        ok: false,
        error: "נא למלא שם, אימייל תקין, נושא והודעה באורך סביר",
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  console.info("[contact] message received", {
    subject,
    nameLength: name.length,
    messageLength: message.length,
    emailDomain: email.split("@")[1],
  });

  return NextResponse.json(
    {
      ok: true,
      message: "הפנייה התקבלה. נחזור אליכם בהקדם האפשרי.",
    },
    { status: 202 },
  );
}
