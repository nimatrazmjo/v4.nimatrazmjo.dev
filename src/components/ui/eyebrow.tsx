import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * The one eyebrow/badge style: monospace caps in a hairline pill.
 *
 * `index` renders the accent-coloured "01 · " prefix that introduces every
 * headline section. `dot` swaps the number for the accent status dot
 * (hero's "available" badge). Both are accent jobs — same hue, same chip.
 */
function Eyebrow({
  index,
  dot = false,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { index?: string; dot?: boolean }) {
  return (
    <div
      data-slot="eyebrow"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-band-rule px-3.5 py-1.5",
        "font-mono text-meta uppercase text-band-ink-muted",
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full brand-dot animate-pulse-dot" />}
      {index && (
        <span className="text-brand-ink" aria-hidden="true">
          {index} &middot;
        </span>
      )}
      {children}
    </div>
  )
}

export { Eyebrow }
