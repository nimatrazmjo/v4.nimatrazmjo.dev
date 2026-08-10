"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { CalendarButton } from "./calendar-button"

const navItems = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "Articles", id: "articles" },
  { name: "Contact", id: "contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [active, setActive] = React.useState("home")

  React.useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-5 bg-background/85 backdrop-blur-md border-b border-border">
      <Link
        href="#home"
        className="flex items-center gap-2.5 font-mono font-semibold text-sm text-foreground"
      >
        <span
          className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] text-[12px] font-bold"
          style={{ background: "var(--brand-accent)", color: "#04222b" }}
        >
          NR
        </span>
        nimat.razmjo
      </Link>

      <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wide">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "transition-colors hover:text-foreground",
              active === item.id ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <CalendarButton />
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute inset-x-0 top-full md:hidden overflow-hidden border-b border-border bg-background"
          >
            <nav className="flex flex-col gap-1 p-6 font-mono text-sm uppercase tracking-wide">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "py-3 transition-colors",
                    active === item.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <CalendarButton className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
