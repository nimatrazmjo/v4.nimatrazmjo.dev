"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, GitMerge, Users, Code2 } from "lucide-react"

const projects = [
  {
    title: "Real-Time Live Sports Platform",
    role: "Lead Software Engineer, Draft Nation",
    description:
      "Built an async FastAPI ingestion layer that concurrently polled multiple third-party score feeds and pushed live updates over WebSockets, eliminating client-side polling on live match pages.",
    stack: ["FastAPI", "WebSockets", "Next.js", "AWS", "Vercel"],
    icon: <Radio className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Monolith to Microservices Migration",
    role: "Senior Software Developer, NETLINKS Inc",
    description:
      "Led migration of a high-traffic job portal from a legacy PHP monolith to a MEAN-stack microservices architecture, decoupling tightly coupled modules into independently deployable services.",
    stack: ["Node.js", "Angular", "MongoDB", "AWS", "Terraform", "Docker"],
    icon: <GitMerge className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "Education Portal at 1M+ Users",
    role: "Software Developer, NETLINKS Inc",
    description:
      "Built a knowledge-management and education portal serving 1M+ users, designing the relational schema, backend APIs, and caching strategy that held performance steady under rising read load.",
    stack: ["Laravel", "MySQL", "Caching"],
    icon: <Users className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Automated Coding Assessment Platform",
    role: "Senior Software Developer, EliteBrains",
    description:
      "Built an online coding-assessment platform with Judge0, Node.js, Python, and React that automated candidate code execution and scoring, replacing a slower manual review process.",
    stack: ["Judge0", "Node.js", "Python", "React"],
    icon: <Code2 className="w-5 h-5 text-pink-500" />,
  },
]

export function Projects() {
  return (
    <section className="py-20" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 rounded-full py-1 px-4 border-primary/20 bg-primary/5 text-primary">
            Selected Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient">
            Projects &amp; Impact
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Production systems I&apos;ve architected and shipped, from real-time distributed
            services to platforms serving over a million users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full glass-card hover:bg-white/5 transition-all group border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  {project.role}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
