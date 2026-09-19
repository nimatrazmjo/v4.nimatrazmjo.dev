import * as React from "react"
import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"

/**
 * How every headline section is introduced: numbered accent eyebrow, display
 * headline, optional lead paragraph. Sections import this rather than
 * re-assembling the pattern, so a new section inherits the hierarchy for free.
 */
function SectionIntro({
  index,
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  /** Accent-coloured section number, e.g. "01". */
  index: string
  eyebrow: React.ReactNode
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "center" | "left"
}) {
  const centered = align === "center"

  return (
    <div
      data-slot="section-intro"
      className={cn(centered && "text-center", className)}
      {...props}
    >
      <Eyebrow index={index} className="mb-5">
        {eyebrow}
      </Eyebrow>
      <h2 className="text-display-md text-band-ink">{title}</h2>
      {lead && (
        <p
          className={cn(
            "text-lead mt-4 max-w-[560px] text-band-ink-muted",
            centered && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

export { SectionIntro }
