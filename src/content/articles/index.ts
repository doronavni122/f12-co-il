import type { Article } from "@/lib/content/schema";
import { articleSeed } from "./data";

export const articles = articleSeed.map((article) => ({
  ...article,
  tags: ("tags" in article && article.tags) || [],
  featured: ("featured" in article && article.featured) || false,
  imageCredit:
    ("imageCredit" in article && article.imageCredit) || "F12 graphic",
})) as Article[];
