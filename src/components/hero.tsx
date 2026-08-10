"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const capabilities = [
  "Scalable Systems",
  "Cloud-Native Architecture",
  "High-Traffic APIs",
  "Production-Grade DevOps",
]

export function Hero() {
  return (
    <section id="home" className="pt-[120px] pb-[88px] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
            style={{ background: "var(--brand-accent)" }}
          />
          Available for new projects
        </div>

        <h1 className="text-[clamp(42px,6vw,72px)] font-extrabold tracking-[-0.02em] leading-[1.05] mb-6 text-foreground">
          Designing Scalable
          <br />
          <span style={{ color: "var(--brand-accent-ink)" }}>Digital Experiences</span>
        </h1>

        <p className="max-w-[600px] mx-auto text-lg leading-relaxed text-muted-foreground mb-10">
          Nimat Razmjo — Lead Software Engineer with 12+ years experience building high-traffic APIs,
          optimized backend systems, and modern full-stack applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Link href="#articles">
            <Button className="rounded-full h-auto py-[14px] px-[26px] font-mono text-[13px] font-semibold">
              Read Articles →
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" className="rounded-full h-auto py-[14px] px-[26px] font-mono text-[13px] font-semibold">
              Get in Touch
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-7 font-mono text-xs text-muted-foreground">
          {capabilities.map((label) => (
            <span key={label}>◆ {label}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
