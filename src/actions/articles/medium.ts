"use server";
import { HashNode } from "@/types/hashnode.type";

export const mediumBlogs = async (): Promise<HashNode[]> => {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nimatrazmjo`
  );
  const data = await response.json();
  const formatedData = data.items?.map((item: any) => {
    const pMatch = item.description?.match(/<p>(.*?)<\/p>/);
    let brief = pMatch ? pMatch[1]?.substring(0, 200) : "";
    if (brief.length > 200) {
      brief += "...";
    }

    const imgMatch = item.content?.match(/<img[^>]+src="([^">]+cdn-images[^">]+)"/);
    const coverImageUrl = imgMatch ? imgMatch[1] : "";

    return {
      title: item.title,
      brief: brief,
      url: item.link,
      coverImage: {
        url: coverImageUrl,
      },
      views: item.views || 0,
      publishedAt: item.pubDate,
      reactionCount: item.reactions || 0,
      tags: item.categories || [],
      content: item.description || "",
    };
  });
  return formatedData || [];
};

export const fetchMediumFeed = async (profile: string): Promise<HashNode[]> => {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nimatrazmjo`
  );
  const data = await response.json();
  const formatedData = data.items?.map((item: any) => {
    const pMatch = item.description?.match(/<p>(.*?)<\/p>/);
    const brief = pMatch ? pMatch[1]?.substring(0, 200) : "";

    const imgMatch = item.content?.match(/<img[^>]+src="([^">]+cdn-images[^">]+)"/);
    const coverImageUrl = imgMatch ? imgMatch[1] : "";

    return {
      title: item.title,
      slug: item.slug || "",
      brief: brief,
      subtitle: item.content || "",
      url: item.link,
      coverImage: {
        url: coverImageUrl,
      },
      views: item.views || 0,
      publishedAt: item.pubDate,
      reactionCount: item.reactions || 0,
      tags: item.categories || [],
      content: item.description || "",
    };
  });

  return formatedData || [];
};
