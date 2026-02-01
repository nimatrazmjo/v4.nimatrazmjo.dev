"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-secondary/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold tracking-tighter mb-6">
              NR<span className="text-primary">.</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Designing and developing high-performance web applications and scalable backend systems
              with a focus on user experience and technical excellence.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:nimatullah.razmjo@gmail.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
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
              Get the latest insights on cloud architecture and web dev.
            </p>
            <form className="flex gap-2">
              <Input
                placeholder="Email address"
                className="bg-white/5 border-white/10 rounded-full px-4 text-sm"
              />
              <Button className="rounded-full">Join</Button>
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
