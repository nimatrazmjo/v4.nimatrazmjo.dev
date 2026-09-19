import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Full-bleed section background. The band itself carries the transition
 * between sections — no dividers, no shadows at the seams.
 *
 * `tone` sets the background and, via `data-band`, flips the on-band text
 * tokens (`--band-ink`, `--brand-accent-ink`, …) for everything inside, so
 * shared components adapt without per-section overrides.
 *
 * All page width is owned here (`inner`), not by a wrapper around the page.
 *
 * `texture` lays the `.motif-grid` echo of the hero response block behind the
 * band, full-bleed and below the content.
 */
const tones = {
  base: "bg-band-base",
  light: "bg-band-light",
  dark: "bg-band-dark",
} as const

export type BandTone = keyof typeof tones

type BandElement = "section" | "header" | "footer" | "div"

function SectionBand({
  tone = "base",
  as: Tag = "section",
  className,
  inner,
  texture = false,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "as"> & {
  tone?: BandTone
  as?: BandElement
  /** Extra classes for the centered inner column. */
  inner?: string
  /** Lay the shared grid motif behind the band. */
  texture?: boolean
}) {
  const Band = Tag as React.ElementType

  return (
    <Band
      data-band={tone}
      data-slot="section-band"
      className={cn("relative text-band-ink", tones[tone], className)}
      {...props}
    >
      {texture && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 motif-grid" />
      )}
      <div className={cn("relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-14", inner)}>
        {children}
      </div>
    </Band>
  )
}

export { SectionBand }
