"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Footer() {
  const SUBSTACK_URL = "https://nimatrazmjo.substack.com";
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === "dark"
    ? "/images/white-logo.svg"
    : "/images/black-logo.svg";

  return (
    <footer className="border-t border-white/5 bg-secondary/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src={logoSrc}
                alt="Logo"
                width={40}
                height={40}
                className="transition-opacity duration-300"
              />
            </div>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Designing and developing high-performance web applications and scalable backend systems
              with a focus on user experience and technical excellence.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/nimatrazmjo" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/nimatrazmjo" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/nimatrazmjo" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-primary/10 hover:text-primary transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#articles" className="hover:text-primary transition-colors">Engineering Notes</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
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
              <div className="flex gap-2">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="bg-white/5 border-white/10 rounded-full px-4 text-sm"
                />
                <Button type="submit" className="rounded-full px-3 group">
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Opens in Substack</p>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nimat Razmjo. All rights reserved.</p>
          <p>Built with Next.js, Tailwind & Framer Motion.</p>
        </div>
      </div>
    </footer>
  )
}
