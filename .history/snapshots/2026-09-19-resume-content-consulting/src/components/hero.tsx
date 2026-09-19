"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionBand } from "@/components/ui/section-band"
import { ResponseBlock } from "@/components/response-block"

const capabilities = [
  "Scalable Systems",
  "Cloud-Native Architecture",
  "High-Traffic APIs",
  "Production-Grade DevOps",
]

export function Hero() {
  return (
    <SectionBand id="home" tone="base" inner="pt-[104px] pb-[96px]">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow dot className="mb-8">
            Available for new projects
          </Eyebrow>

          <h1 className="text-display-xl mb-6 text-band-ink">
            Designing Scalable
            <br />
            <span className="text-brand-ink">Digital Experiences</span>
          </h1>

          <p className="text-lead mb-10 max-w-[560px] text-band-ink-muted">
            Nimat Razmjo — Lead Software Engineer with 12+ years experience building high-traffic APIs,
            optimized backend systems, and modern full-stack applications.
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-3.5">
            <Button asChild variant="primary">
              <Link href="#articles">Read Articles</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-meta uppercase text-band-ink-muted">
            {capabilities.map((label) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Visual anchor — the response-block motif, echoed faintly in the footer. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-10 motif-glow" />
          <ResponseBlock />
        </motion.div>
      </div>
    </SectionBand>
  )
}
