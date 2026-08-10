"use client"

import * as React from "react"
import { useQueryState } from "nuqs"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
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
    <section id="articles" className="pb-[100px] text-center">
      <div className="inline-block mb-5 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Articles &amp; Insights
      </div>
      <h2 className="text-[clamp(32px,4vw,42px)] font-extrabold tracking-[-0.01em] text-foreground mb-4">
        Engineering Notes
      </h2>
      <p className="text-base text-muted-foreground max-w-[520px] mx-auto mb-11 leading-relaxed">
        Deep dives into software architecture, cloud native patterns, and modern web development.
      </p>

      <div className="relative max-w-[640px] mx-auto mb-10">
        <Search className="absolute left-[18px] top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or tag..."
          aria-label="Search articles by title or tag"
          className="pl-11 h-auto py-3.5 rounded-full border-input text-sm"
        />
      </div>

      <div className="flex flex-col gap-4 text-left">
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
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <Card className="block p-7 rounded-2xl border-border transition-colors hover:border-[oklch(80%_0.02_222)]">
                  {article.coverImage && article.source === "hashnode" && (
                    // eslint-disable-next-line @next/next/no-img-element -- external CDN domains vary per source, not worth allowlisting for a listing thumbnail
                    <img
                      src={article.coverImage}
                      alt=""
                      loading="lazy"
                      className="w-full aspect-video object-cover rounded-xl mb-4 border border-border"
                    />
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[6px] px-2 py-1 font-mono text-[10px] tracking-wider brand-chip"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="rounded-[6px] px-2 py-1 font-mono text-[10px] tracking-wider brand-chip">
                        {article.source}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-faint)] whitespace-nowrap">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {article.readingTime ? ` · ${article.readingTime} min read` : ""}
                    </div>
                  </div>
                  <h3 className="text-[17px] font-bold mb-2 text-foreground">{article.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/80 mb-3">
                    {article.excerpt || article.brief}
                  </p>
                  <span className="font-mono text-xs font-semibold" style={{ color: "var(--brand-accent-ink)" }}>
                    Read on {article.source} →
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 font-mono text-sm text-muted-foreground">
            <p>No articles match &quot;{search}&quot;.</p>
            <Button variant="link" onClick={() => setSearch("")} className="mt-2 font-mono">
              Clear search
            </Button>
          </div>
        )}

        <div ref={loaderRef} className="py-10 text-center">
          {loading && (
            <div className="flex justify-center items-center gap-2 text-muted-foreground animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="ml-2 font-mono text-xs">Loading more insights...</span>
            </div>
          )}
          {!hasMore && articles.length > 0 && !search && (
            <p className="font-mono text-xs text-[var(--text-faint)]">
              — you&apos;ve reached the end of the technical log —
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
