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

// Alternative function with more robust error handling
export const fetchSubstackFeed = async (
  substackUsername: string
): Promise<HashNode[]> => {
  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://${substackUsername}.substack.com/feed`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; RSS Reader)",
        },
        // Add caching for better performance
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch Substack feed: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Invalid RSS feed structure");
      return [];
    }

    const formattedData = data.items.map((item: any) => {
      // More robust brief extraction
      let brief = "";
      if (item.description) {
        // Remove HTML tags, decode entities, and clean up
        brief = item.description
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim()
          .substring(0, 200);

        if (brief.length >= 200) {
          brief += "...";
        }
      }

      // Extract cover image with fallback options
      let coverImageUrl = "";
      if (item.content) {
        // Try different image patterns common in Substack
        const imgPatterns = [
          /<img[^>]+src="([^">]+cdn\.substack\.com[^">]+)"/,
          /<img[^>]+src="([^">]+substackcdn\.com[^">]+)"/,
          /<img[^>]+src="([^">]+)"/,
        ];

        for (const pattern of imgPatterns) {
          const match = item.content.match(pattern);
          if (match) {
            coverImageUrl = match[1];
            break;
          }
        }
      }

      return {
        title: item.title || "Untitled",
        slug:
          item.guid
            ?.split("/")
            .pop()
            ?.replace(/[^a-zA-Z0-9-]/g, "") || "",
        brief: brief,
        subtitle: item.description || "",
        url: item.link,
        coverImage: {
          url: coverImageUrl,
        },
        views: 0, // Not available in Substack RSS
        publishedAt: item.pubDate,
        reactionCount: 0, // Not available in Substack RSS
        tags: item.categories || [],
        content: item.content || item.description || "",
        author: data.feed?.title || "Unknown Author", // Add author info
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return [];
  }
};

// Usage example function
export const getMySubstackArticles = async (): Promise<HashNode[]> => {
  // Replace 'your-username' with your actual Substack username
  return await fetchSubstackFeed("your-username");
};
