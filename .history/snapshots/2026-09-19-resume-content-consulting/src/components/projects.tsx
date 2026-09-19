"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionBand } from "@/components/ui/section-band"
import { SectionIntro } from "@/components/ui/section-intro"
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
    <SectionBand id="projects" tone="light" inner="py-[112px]">
      <SectionIntro
        index="01"
        eyebrow="Selected Work"
        title="Projects & Impact"
        lead="Production systems I've architected and shipped, from real-time distributed services to platforms serving over a million users."
        className="mb-14"
      />

      <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* 3px accent left rule — the card-level accent job */}
            <Card className="card-hover block rounded-[20px] rounded-l-[4px] border-border p-8 brand-rule-left">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-[9px] brand-icon-tile">
                <project.icon className="h-4 w-4" />
              </div>
              <h3 className="text-display-sm mb-1.5 text-band-ink">{project.title}</h3>
              <div className="mb-4 font-mono text-meta uppercase text-band-ink-muted">
                {project.role}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-band-ink-muted">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="rounded-[6px] border-border px-2.5 py-1 font-mono text-meta uppercase text-band-ink-muted"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionBand>
  )
}
