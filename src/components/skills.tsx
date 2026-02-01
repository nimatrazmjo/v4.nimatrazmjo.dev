"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Globe, Layout, Server, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-blue-500" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  },
  {
    title: "Backend",
    icon: <Server className="w-5 h-5 text-emerald-500" />,
    skills: ["Node.js", "Python", "Go", "Express", "FastAPI", "WebSockets"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Globe className="w-5 h-5 text-purple-500" />,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Serverless"],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Supabase"],
  },
  {
    title: "Testing & Tools",
    icon: <Settings className="w-5 h-5 text-pink-500" />,
    skills: ["Jest", "Playwright", "Git", "Postman", "Linux", "Nginx"],
  },
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5 text-indigo-500" />,
    skills: ["JavaScript", "Typescript", "Python", "SQL", "Go", "Bash"],
  },
]

export function Skills() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I use to build scalable, high-performance applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border-white/5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors py-1 px-3 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
