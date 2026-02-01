import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { ArticlesContent } from "./articles-content"
import fetchAllBlogs from "@/actions/articles/articles"

export default async function ArticlesPage() {
  // Fetch initial articles on the server
  const { articles, totalPages } = await fetchAllBlogs({ page: 1 })

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <Suspense fallback={<div className="text-center py-20 text-muted-foreground italic">Loading engineering notes...</div>}>
          <ArticlesContent initialArticles={articles} totalPages={totalPages} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
