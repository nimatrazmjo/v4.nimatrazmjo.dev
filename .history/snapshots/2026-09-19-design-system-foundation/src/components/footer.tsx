"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react"

export function Footer() {
  const SUBSTACK_URL = "https://nimatrazmjo.substack.com";

  const socials = [
    { icon: Github, href: "https://github.com/nimatrazmjo" },
    { icon: Linkedin, href: "https://linkedin.com/in/nimatrazmjo" },
    { icon: Twitter, href: "https://twitter.com/nimatrazmjo" },
  ]

  return (
    <footer className="border-t border-border pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 font-mono font-semibold text-sm text-foreground mb-3.5">
            <span
              className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] text-[12px] font-bold"
              style={{ background: "var(--brand-accent)", color: "#04222b" }}
            >
              NR
            </span>
            nimat.razmjo
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[320px] mb-[18px] leading-relaxed">
            Designing and developing high-performance web applications and scalable backend systems
            with a focus on user experience and technical excellence.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-input text-foreground/70 transition-colors hover:border-foreground/40"
              >
                <Icon className="w-[15px] h-[15px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[13px] text-foreground mb-3.5">Navigation</h4>
          <ul className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
            <li><a href="#home" className="!text-inherit hover:!text-foreground transition-colors">Home</a></li>
            <li><a href="#articles" className="!text-inherit hover:!text-foreground transition-colors">Engineering Notes</a></li>
            <li><a href="#contact" className="!text-inherit hover:!text-foreground transition-colors">Get in Touch</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[13px] text-foreground mb-3.5">Newsletter</h4>
          <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">
            Get the latest insights on cloud architecture and web dev on my Substack.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
              window.open(`${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`, "_blank");
            }}
          >
            <Input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="h-auto py-2.5 rounded-[8px] text-[13px]"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0 rounded-[8px]">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Nimat Razmjo. All rights reserved.</span>
        <span>Built with Next.js, Tailwind &amp; Framer Motion.</span>
      </div>
    </footer>
  )
}
