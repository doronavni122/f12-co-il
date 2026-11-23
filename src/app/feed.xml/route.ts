import { rssResponse } from "@/lib/rss-feed";

export function GET() {
  return rssResponse("/feed.xml");
}
