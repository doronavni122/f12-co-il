import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
});

export type SiteEnv = z.infer<typeof envSchema>;

export function getEnv(): SiteEnv {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  });

  if (!parsed.success) {
    console.error("[env] validation failed", parsed.error.flatten());
    return {};
  }

  if (
    process.env.NODE_ENV === "production" &&
    !process.env.NEXT_PUBLIC_SITE_URL
  ) {
    console.warn(
      "[env] NEXT_PUBLIC_SITE_URL is empty in production - set it for correct canonical URLs",
    );
  }

  return parsed.data;
}
