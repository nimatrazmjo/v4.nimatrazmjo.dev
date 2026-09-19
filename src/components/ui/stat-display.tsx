import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A stat as typography, not a card: display numeral, monospace caps label
 * beneath. No border, no shadow, no per-stat background fill.
 *
 * Use <StatRow> to separate a set with thin vertical rules only.
 */
function StatDisplay({
  value,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: React.ReactNode
  label: React.ReactNode
}) {
  return (
    <div data-slot="stat" className={cn("px-2", className)} {...props}>
      <div className="text-stat text-band-ink tabular-nums">{value}</div>
      <div className="mt-3.5 font-mono text-meta uppercase text-band-ink-muted">{label}</div>
    </div>
  )
}

function StatRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-row"
      className={cn(
        "grid grid-cols-2 gap-y-12 lg:grid-cols-4",
        // thin vertical rules only — the separation device for this band
        "[&>[data-slot=stat]]:border-band-rule",
        "[&>[data-slot=stat]:nth-child(2n)]:border-l lg:[&>[data-slot=stat]]:border-l",
        "lg:[&>[data-slot=stat]:first-child]:border-l-0",
        className
      )}
      {...props}
    />
  )
}

export { StatDisplay, StatRow }
