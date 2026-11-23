import { z } from "zod";

export const categorySlugSchema = z.enum([
  "markets",
  "macro",
  "real-estate-finance",
  "fintech",
  "crypto",
  "opinion",
]);

export type CategorySlug = z.infer<typeof categorySlugSchema>;

export const authorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
});

export type Author = z.infer<typeof authorSchema>;

export const articleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: categorySlugSchema,
  authorId: z.string().min(1),
  publishedAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }).optional(),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  imageCredit: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  body: z.string().min(1),
});

export type Article = z.infer<typeof articleSchema>;
