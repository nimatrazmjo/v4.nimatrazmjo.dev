import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { Newsletter } from "@/components/newsletter";
import { ArticlesContent } from "@/components/articles-content";
import fetchAllBlogs from "@/actions/articles/articles";
import { Suspense } from "react";

export const revalidate = 3600;

export default async function Home() {
  const { articles, totalPages } = await fetchAllBlogs({ page: 1 });

  return (
    <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-14">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Suspense fallback={<div className="py-20 text-center text-muted-foreground font-mono text-sm italic">Loading engineering notes...</div>}>
          <ArticlesContent initialArticles={articles} totalPages={totalPages} />
        </Suspense>
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
