"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Briefcase, Code2, GraduationCap, Layers } from "lucide-react"

const stats = [
  {
    label: "Years Experience",
    value: "12+",
    icon: Briefcase,
    description: "Designing scalable backend architectures.",
  },
  {
    label: "Technologies",
    value: "40+",
    icon: Code2,
    description: "Expertise across the full stack and cloud.",
  },
  {
    label: "Certifications",
    value: "2",
    icon: GraduationCap,
    description: "AWS AI & Kubernetes (CKAD) in progress.",
  },
  {
    label: "Projects Completed",
    value: "20+",
    icon: Layers,
    description: "From startups to enterprise solutions.",
  },
]

export function Stats() {
  return (
    <section className="pb-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-7 rounded-2xl border-border block">
              <div
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] mb-[18px] brand-icon-tile"
                style={{ color: "var(--brand-accent-ink)" }}
              >
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="font-mono text-[30px] font-semibold leading-none mb-1.5 text-foreground">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-foreground mb-1.5">{stat.label}</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed">
                {stat.description}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
