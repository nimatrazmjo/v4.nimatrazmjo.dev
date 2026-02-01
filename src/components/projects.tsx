"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Draft Nation",
    description: "High-performance sports analytics platform for NFL/NBA draft coverage. Real-time data processing and interactive visualizations.",
    tech: ["Next.js", "TypeScript", "Supabase", "WebSocket"],
    link: "https://draftnation.com",
    github: "#",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc516d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Jobs.af",
    description: "Afghanistan's largest employment portal serving 1M+ users. Architected scalable backend services and automated job matching.",
    tech: ["Node.js", "Python", "Docker", "AWS"],
    link: "https://jobs.af",
    github: "#",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Elitebrains",
    description: "Competitive programming and assessment platform with real-time code execution and automated scoring system.",
    tech: ["React", "Express", "Redis", "Kubernetes"],
    link: "https://elitebrains.com",
    github: "#",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
]

export function Projects() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              A selection of my recent work in full-stack development, cloud architecture, and real-time systems.
            </p>
          </div>
          <Button variant="ghost" className="gap-2">
            See all projects <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden glass-card h-full flex flex-col group border-white/5">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
