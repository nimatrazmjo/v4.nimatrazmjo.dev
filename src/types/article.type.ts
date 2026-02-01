export type ArticleType = {
  id: string;
  title: string;
  brief: string;
  coverImage: string;
  url: string;
  excerpt: string | null;
  date: Date;
  tags: string[];
  source: string;
  readingTime: number | null;
  status: string;
  content?: string;
  authorId?: string;
};
