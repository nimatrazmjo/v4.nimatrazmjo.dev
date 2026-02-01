"use server";
import type { HashNode } from "@/types/hashnode.type";

export const substackBlogs = async (
  substackUsername: string
): Promise<HashNode[]> => {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://${substackUsername}.substack.com/feed`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Substack feed: ${response.statusText}`);
  }

  const data = await response.json();

  const formattedData =
    data.items?.map((item: any) => {
      // Extract brief from description (Substack usually has content in description)
      let brief = "";
      if (item.description) {
        // Remove HTML tags and get first 200 characters
        brief = item.description.replace(/<[^>]*>/g, "").substring(0, 200);
        if (brief.length >= 200) {
          brief += "...";
        }
      }

      // Extract cover image from content (Substack images are usually in content)
      let coverImageUrl = "";
      if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        coverImageUrl = imgMatch ? imgMatch[1] : "";
      }

      return {
        title: item.title,
        slug: item.guid?.split("/").pop() || "", // Extract slug from GUID
        brief: brief,
        subtitle: item.description,
        url: item.link,
        coverImage: {
          url: coverImageUrl,
        },
        views: 0, // Substack RSS doesn't provide view count
        publishedAt: item.pubDate,
        reactionCount: 0, // Substack RSS doesn't provide reaction count
        tags: item.categories || [],
        content: item.content || item.description,
      };
    }) || [];

  return formattedData;
};
