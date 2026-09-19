import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Two button styles exist site-wide, and only two:
 *
 *   primary   — solid pill
 *   secondary — outline pill
 *
 * Same radius, same padding, same font treatment for both. Sizes vary the
 * padding only. Every CTA on the site — hero, navbar, newsletter, contact
 * submit, footer subscribe — uses one of these; no one-off shapes, no
 * variant-specific arrow treatments. Both adapt inside a dark band via the
 * band tokens, so a CTA needs no per-section overrides.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-mono text-[13px] font-semibold tracking-wide",
    "transition-all outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground hover:bg-primary/85",
          "on-dark:bg-brand on-dark:text-[#04222b] on-dark:hover:bg-brand/85",
        ],
        secondary: [
          "border border-input bg-transparent text-foreground hover:border-foreground/40 hover:bg-secondary",
          "on-dark:border-band-rule on-dark:text-band-ink",
          "on-dark:hover:border-brand/60 on-dark:hover:bg-white/5",
        ],
      },
      size: {
        default: "h-auto px-[26px] py-[14px]",
        sm: "h-auto px-[18px] py-[9px] text-[12px]",
        lg: "h-auto px-[32px] py-[17px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
