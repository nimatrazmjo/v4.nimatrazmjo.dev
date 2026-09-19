import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The design-system type scale (`text-display-*`, `text-stat`, `text-lead`,
 * `text-meta`) shares the `text-` prefix with colour utilities, so
 * tailwind-merge has to be told these are font sizes — otherwise
 * `cn("text-meta", "text-band-ink-muted")` silently drops the size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-xl", "display-lg", "display-md", "display-sm", "stat", "lead", "meta"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
