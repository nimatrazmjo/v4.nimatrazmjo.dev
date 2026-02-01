"use client"

import * as React from "react"
import { useQueryState } from "nuqs"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ArticleType } from "@/types/article.type"

import fetchAllBlogs from "@/actions/articles/articles"

interface ArticlesContentProps {
  initialArticles: ArticleType[]
  totalPages: number
}

export function ArticlesContent({ initialArticles, totalPages }: ArticlesContentProps) {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" })
  const [articles, setArticles] = React.useState<ArticleType[]>(initialArticles)
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(page < totalPages)

  const loaderRef = React.useRef<HTMLDivElement>(null)

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const loadMore = React.useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const result = await fetchAllBlogs({ page: nextPage })

      setArticles(prev => [...prev, ...result.articles])
      setPage(nextPage)
      setHasMore(nextPage < result.totalPages)
    } catch (error) {
      console.error("Error loading more articles:", error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !search) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore, hasMore, loading, search])

  return (
    <section className="py-20" id="articles">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 rounded-full py-1 px-4 border-primary/20 bg-primary/5 text-primary">
            Articles & Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient">
            Engineering Notes
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep dives into software architecture, cloud native patterns, and modern web development.
          </p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or tag..."
            className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
              <motion.div
                key={`${article.source}-${article.id}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={article.url} target="_blank">
                  <Card className="p-6 glass-card hover:bg-white/5 transition-all group border-white/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-primary/20 text-primary/70">
                          {article.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        {article.readingTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readingTime} min read
                          </div>
                        )}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {article.excerpt || article.brief}
                    </p>
                    <div className="flex items-center font-medium text-primary gap-2 text-sm">
                      Read on {article.source} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found matching "{search}"</p>
              <Button
                variant="link"
                onClick={() => setSearch("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}

          <div ref={loaderRef} className="py-10 text-center">
            {loading && (
              <div className="flex justify-center items-center gap-2 text-muted-foreground animate-pulse">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="ml-2 text-sm">Loading more insights...</span>
              </div>
            )}
            {!hasMore && articles.length > 0 && !search && (
              <p className="text-sm text-muted-foreground italic">You've reached the end of the technical log.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
