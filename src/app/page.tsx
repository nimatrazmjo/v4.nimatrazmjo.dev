import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { ArticlesContent } from "@/components/articles-content";
import fetchAllBlogs from "@/actions/articles/articles";
import { Suspense } from "react";

export default async function Home() {
  const { articles, totalPages } = await fetchAllBlogs({ page: 1 });

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground italic">Loading engineering notes...</div>}>
          <ArticlesContent initialArticles={articles} totalPages={totalPages} />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
