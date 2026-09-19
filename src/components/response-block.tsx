"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * The site's visual motif: a live-looking API response.
 *
 * Used full-size as the hero's visual anchor, and at `tone="faint"` as a
 * quiet echo elsewhere (footer). Paired with the `.motif-grid` texture on
 * dark bands, it's the one recurring device that says "backend/infra"
 * without needing an illustration.
 */
type Line = {
  indent?: number
  /** Object key, rendered in the accent hue. */
  key?: string
  /** Value; strings are quoted by the caller. */
  value?: string
  /** Punctuation-only line, e.g. `{` / `}` / `],`. */
  punct?: string
  /** Render the value as the accent hue rather than plain ink. */
  accent?: boolean
  /** Last entry in its object — suppress the trailing comma. */
  noComma?: boolean
}

const REQUEST = "GET /v1/systems/health"

const LINES: Line[] = [
  { punct: "{" },
  { indent: 1, key: "status", value: `"operational"`, accent: true },
  { indent: 1, key: "region", value: `"eu-central-1"` },
  { indent: 1, key: "uptime", value: `"99.98%"` },
  { indent: 1, key: "services", punct: "[" },
  { indent: 2, value: `"api-gateway",` },
  { indent: 2, value: `"event-stream",` },
  { indent: 2, value: `"postgres-primary"` },
  { indent: 1, punct: "]," },
  { indent: 1, key: "p95_latency_ms", value: "42", noComma: true },
  { punct: "}" },
]

export function ResponseBlock({
  tone = "solid",
  className,
}: {
  tone?: "solid" | "faint"
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const faint = tone === "faint"

  return (
    <div
      data-band="dark"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(19%_0.03_250)]",
        "font-mono text-[12.5px] leading-[1.75] sm:text-[13px]",
        "shadow-[0_24px_60px_oklch(20%_0.03_250/0.18)]",
        faint && "opacity-45 shadow-none",
        className
      )}
    >
      {/* accent rule along the top edge — same 2px accent job as project cards */}
      <div className="h-[2px] w-full bg-brand/70" />

      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full brand-dot" />
        <span className="text-meta uppercase text-band-ink-faint">{REQUEST}</span>
        <span className="ml-auto rounded-[5px] px-2 py-0.5 text-[10px] tracking-wider brand-chip">
          200 OK
        </span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 text-band-ink-muted">
        <code>
          {LINES.map((line, i) => (
            <motion.span
              key={i}
              className="block whitespace-pre"
              initial={reduceMotion || faint ? false : { opacity: 0, x: -6 }}
              animate={reduceMotion || faint ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.3 }}
            >
              {"  ".repeat(line.indent ?? 0)}
              {line.key && <span className="text-brand-ink">&quot;{line.key}&quot;</span>}
              {line.key && <span className="text-band-ink-faint">: </span>}
              {line.punct && <span className="text-band-ink-faint">{line.punct}</span>}
              {line.value && (
                <span className={line.accent ? "text-brand-ink" : "text-band-ink"}>
                  {line.value}
                </span>
              )}
              {line.key && line.value && !line.noComma && (
                <span className="text-band-ink-faint">,</span>
              )}
            </motion.span>
          ))}
          {!faint && (
            <span className="inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-brand/80 animate-caret" />
          )}
        </code>
      </pre>
    </div>
  )
}
