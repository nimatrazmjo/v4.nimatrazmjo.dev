"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionBand } from "@/components/ui/section-band"
import { ResponseBlock } from "@/components/response-block"
import { Github, Linkedin, Twitter } from "lucide-react"

const SUBSTACK_URL = "https://nimatrazmjo.substack.com"

const socials = [
  { icon: Github, href: "https://github.com/nimatrazmjo", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/nimatrazmjo", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/nimatrazmjo", label: "Twitter" },
]

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#articles", label: "Engineering Notes" },
  { href: "#contact", label: "Get in Touch" },
]

export function Footer() {
  return (
    <SectionBand
      as="footer"
      tone="dark"
      texture
      className="overflow-hidden"
      inner="pt-14 pb-8"
    >
      {/* Faint echo of the hero motif — background texture, clipped by the band. */}
      <ResponseBlock
        tone="faint"
        className="pointer-events-none absolute -bottom-12 -right-16 hidden w-[340px] rotate-2 border-white/[0.06] opacity-30 lg:block"
      />

      <div className="relative mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-sm font-semibold text-band-ink">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-brand text-[12px] font-bold text-[#04222b]">
              NR
            </span>
            nimat.razmjo
          </div>
          <p className="mb-[18px] max-w-[320px] text-[13px] leading-relaxed text-band-ink-muted">
            Designing and developing high-performance web applications and scalable backend systems
            with a focus on user experience and technical excellence.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-band-rule !text-band-ink-muted transition-colors hover:border-brand/50 hover:!text-brand-ink"
              >
                <Icon className="h-[15px] w-[15px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3.5 font-mono text-meta uppercase text-band-ink">Navigation</h4>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="!text-band-ink-muted transition-colors hover:!text-brand-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 font-mono text-meta uppercase text-band-ink">Newsletter</h4>
          <p className="mb-3 text-[13px] leading-relaxed text-band-ink-muted">
            Get the latest insights on cloud architecture and web dev on my Substack.
          </p>
          <form
            className="flex flex-col gap-2"
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
              aria-label="Email address"
              className="h-auto rounded-full border-band-rule bg-transparent py-2.5 text-[13px] text-band-ink placeholder:text-band-ink-faint"
            />
            {/* same solid pill as every other primary CTA */}
            <Button type="submit" variant="primary" size="sm">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-2 border-t border-band-rule pt-6 font-mono text-meta uppercase text-band-ink-faint md:flex-row">
        <span>© {new Date().getFullYear()} Nimat Razmjo. All rights reserved.</span>
        <span>Built with Next.js, Tailwind &amp; Framer Motion.</span>
      </div>
    </SectionBand>
  )
}
