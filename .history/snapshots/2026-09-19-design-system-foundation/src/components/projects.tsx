"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Hexagon, Target, Code2 } from "lucide-react"

const projects = [
  {
    title: "Real-Time Live Sports Platform",
    role: "Lead Software Engineer, Draft Nation",
    description:
      "Built an async FastAPI ingestion layer that concurrently polled multiple third-party score feeds and pushed live updates over WebSockets, eliminating client-side polling on live match pages.",
    stack: ["FastAPI", "WebSockets", "Next.js", "AWS", "Vercel"],
    icon: ArrowLeftRight,
  },
  {
    title: "Monolith to Microservices Migration",
    role: "Senior Software Developer, Netlinks Inc",
    description:
      "Led migration of a high-traffic job portal from a legacy PHP monolith to a MEAN-stack microservices architecture, decoupling tightly coupled modules into independently deployable services.",
    stack: ["Node.js", "Angular", "MongoDB", "AWS", "Terraform", "Docker"],
    icon: Hexagon,
  },
  {
    title: "Education Portal at 1M+ Users",
    role: "Software Developer, Netlinks Inc",
    description:
      "Built a knowledge-management and education portal serving 1M+ users, designing the relational schema, backend APIs, and caching strategy that held performance steady under rising read load.",
    stack: ["Laravel", "MySQL", "Caching"],
    icon: Target,
  },
  {
    title: "Automated Coding Assessment Platform",
    role: "Senior Software Developer, EliteBrains",
    description:
      "Built an online coding-assessment platform with Judge0, Node.js, Python, and React that automated candidate code execution and scoring, replacing a slower manual review process.",
    stack: ["Judge0", "Node.js", "Python", "React"],
    icon: Code2,
  },
]

export function Projects() {
  return (
    <section id="projects" className="pb-[130px] text-center">
      <div className="inline-block mb-5 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Selected Work
      </div>
      <h2 className="text-[clamp(32px,4vw,42px)] font-extrabold tracking-[-0.01em] text-foreground mb-4">
        Projects &amp; Impact
      </h2>
      <p className="text-base text-muted-foreground max-w-[560px] mx-auto mb-14 leading-relaxed">
        Production systems I&apos;ve architected and shipped, from real-time distributed services
        to platforms serving over a million users.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="block p-8 rounded-[20px] border-border card-hover">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-[9px] mb-5 brand-icon-tile"
                style={{ color: "var(--brand-accent-ink)" }}
              >
                <project.icon className="h-4 w-4" />
              </div>
              <h3 className="text-[19px] font-bold mb-1.5 text-foreground">{project.title}</h3>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-4">
                {project.role}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="rounded-[6px] border-border font-mono text-[11px] uppercase tracking-wider text-foreground/80 px-2.5 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
