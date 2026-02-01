"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Cpu, Globe, Rocket } from "lucide-react"

const techs = [
  { name: "TypeScript", icon: <Code2 className="w-3 h-3" /> },
  { name: "Next.js", icon: <Rocket className="w-3 h-3" /> },
  { name: "Node.js", icon: <Cpu className="w-3 h-3" /> },
  { name: "AWS", icon: <Globe className="w-3 h-3" /> },
]

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] -z-10 rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 rounded-full py-1 px-4 border-primary/20 bg-primary/5 text-primary">
            Available for new projects
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Designing Scalable</span>
            <br />
            <span className="text-vibrant">Digital Experiences</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
            Nimat Razmjo — Lead Software Engineer with 12+ years experience building high-traffic APIs,
            optimized backend systems, and modern full-stack applications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" className="rounded-full h-12 px-8 group font-medium">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 font-medium">
              Read Blog
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Badge variant="secondary" className="gap-1.5 py-1.5 px-3 rounded-full bg-secondary/50 backdrop-blur-sm border-white/5">
                  {tech.icon}
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
