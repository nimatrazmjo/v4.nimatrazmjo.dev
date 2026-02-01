"use server";

import { ArticleType } from "@/types/article.type";
import { hashNodeBlogs } from "@/actions/articles/hash-node";
import { mediumBlogs } from "@/actions/articles/medium";
import { calculateReadingTime } from "@/lib/utils/calculate-reading-time";
import { PER_PAGE } from "@/config";
import { unstable_noStore as noStore } from "next/cache";
import { substackBlogs } from "@/actions/articles/substack";

interface FetchAllBlogsOptions {
  page?: number;
  pageSize?: number;
  status?: "PUBLISHED" | "DRAFT";
}

const fetchAllBlogs = async ({
  page = 1,
  pageSize = PER_PAGE,
  status = "PUBLISHED",
}: FetchAllBlogsOptions = {}): Promise<{
  articles: ArticleType[];
  totalPages: number;
}> => {
  noStore();
  try {
    // Fetch all sources with individual error handling
    const [substacks, hashnodeBlogsResult, mediums] = await Promise.all([
      substackBlogs("nimatrazmjo").catch(err => {
        console.error("Error fetching Substack articles:", err);
        return [];
      }),
      hashNodeBlogs().catch(err => {
        console.error("Error fetching Hashnode articles:", err);
        return [];
      }),
      mediumBlogs().catch(err => {
        console.error("Error fetching Medium articles:", err);
        return [];
      }),
    ]);

    const hashnodeBlogs = hashnodeBlogsResult ?? [];

    // Normalize the substack articles
    const normalizedSubstackBlogs: ArticleType[] = (substacks ?? []).map(
      (article: any) => ({
        id: article.slug,
        title: article.title,
        excerpt: article.brief,
        brief: article.brief,
        coverImage: article?.coverImage?.url,
        url: article.url,
        date: new Date(article.publishedAt),
        tags: article?.tags,
        source: "substack",
        readingTime: null,
        status: "PUBLISHED",
      })
    );

    // Normalize the articles structure
    const normalizedHashnodeBlogs: ArticleType[] = (hashnodeBlogs ?? []).map(
      (article: any) => ({
        id: article.slug,
        title: article.title,
        excerpt: article.brief,
        brief: article.brief,
        coverImage: article?.coverImage?.url,
        url: article.url,
        date: new Date(article.publishedAt),
        tags: article?.tags.map((tag: any) => tag.name),
        source: "hashnode",
        readingTime: null,
        status: "PUBLISHED",
      })
    );

    const normalizedMediumBlogs: ArticleType[] = (mediums ?? []).map(
      (article: any) => ({
        id: article.url.split("/").pop(),
        title: article.title,
        excerpt: article.brief,
        brief: article.brief,
        coverImage: article.coverImage?.url,
        url: article.url,
        date: new Date(article.publishedAt),
        tags: article?.tags,
        source: "medium",
        readingTime: calculateReadingTime(article.content || ""),
        status: "PUBLISHED",
      })
    );

    // Combine all articles
    let allBlogs = [
      ...(status === "PUBLISHED" ? normalizedSubstackBlogs : []),
      ...(status === "PUBLISHED" ? normalizedHashnodeBlogs : []),
      ...(status === "PUBLISHED" ? normalizedMediumBlogs : []),
    ].filter(blog => blog.date && !isNaN(blog.date.getTime()));

    // Sort all articles by date
    allBlogs.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Calculate total number of articles and pages
    const totalArticles = allBlogs.length;
    const safePageSize = pageSize > 0 ? pageSize : PER_PAGE;
    const totalPages = Math.ceil(totalArticles / safePageSize);

    // Paginate the results
    const validPage = Math.max(1, page);
    const startIndex = (validPage - 1) * safePageSize;
    const paginatedBlogs = allBlogs.slice(startIndex, startIndex + safePageSize);

    return {
      articles: paginatedBlogs,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles");
  }
};

export default fetchAllBlogs;
