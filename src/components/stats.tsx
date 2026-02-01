"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Briefcase, Code2, GraduationCap, Layers } from "lucide-react"

const stats = [
  {
    label: "Years Experience",
    value: "12+",
    icon: <Briefcase className="w-5 h-5 text-blue-500" />,
    description: "Designing scalable backend architectures.",
    className: "md:col-span-2 lg:col-span-1",
  },
  {
    label: "Technologies",
    value: "40+",
    icon: <Code2 className="w-5 h-5 text-purple-500" />,
    description: "Expertise across the full stack and cloud.",
    className: "md:col-span-1",
  },
  {
    label: "Certifications",
    value: "2",
    icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
    description: "AWS AI & Kubernetes (CKAD in progress).",
    className: "md:col-span-1",
  },
  {
    label: "Projects Completed",
    value: "20+",
    icon: <Layers className="w-5 h-5 text-pink-500" />,
    description: "From startups to enterprise solutions.",
    className: "md:col-span-2 lg:col-span-1",
  },
]

export function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={stat.className}
            >
              <Card className="p-6 h-full glass-card hover:bg-white/5 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mb-2">{stat.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
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
