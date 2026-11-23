import { permanentRedirect } from "next/navigation";
import { categories, isCategorySlug } from "@/lib/content";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryRedirectPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) {
    permanentRedirect("/news");
  }
  permanentRedirect(`/news/${slug}`);
}
