"use server";
import { HashNode } from "@/types/hashnode.type";
import { unstable_noStore as noStore } from "next/cache";

export const hashNodeBlogs = async (): Promise<HashNode[] | undefined> => {
  noStore();

  const query = {
    query: `
query Publication {
  user(username:"nimatrazmjo") {
    posts(pageSize:20, page:1)  {
      nodes {
        title,
        slug,
        brief,
        subtitle,
        url,
        coverImage {
          url
        },
        views,
        publishedAt,
        reactionCount,
         tags {
          name
          slug
        },

    }
    }
  }
}
    `,
  };

  try {
    const timestamp = Date.now();
    const response = await fetch("https://gql.hashnode.com?timestamp=" + timestamp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hashnode articles: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.user?.posts.nodes;
  } catch (error) {
    console.error("Failed to fetch user articles:", error);
    throw error;
  }
};
