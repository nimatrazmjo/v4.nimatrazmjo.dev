"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3EMlsl4mH3NKHCy9AFYbpU814R5lEWOQaDNFNcK8wcxzExE7YbyNl7GytRnvFgIRDJQ_gmKBb7?gv=true"

export function CalendarButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      className={cn(
        "rounded-full bg-primary px-6 h-11 font-mono text-xs font-semibold tracking-wide text-primary-foreground hover:bg-primary/85",
        className
      )}
    >
      <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
        Book a Meeting
      </a>
    </Button>
  )
}
