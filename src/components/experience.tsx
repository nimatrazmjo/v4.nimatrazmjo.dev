"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    company: "Draft Nation",
    role: "Lead Full Stack Engineer",
    period: "Dec 2023 - Dec 2024",
    description: "Led the development of a high-traffic sports analytics platform. Optimized API response times by 40% and implemented real-time WebSocket notifications.",
    skills: ["Next.js", "Redis", "AWS", "WebSockets"],
  },
  {
    company: "Jobs.af",
    role: "Senior Software Engineer",
    period: "2018 - 2023",
    description: "Architected core services for the largest job portal in the region. Scaled the infrastructure to handle 1M+ monthly active users.",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    company: "Elitebrains",
    role: "Full Stack Developer",
    period: "2015 - 2018",
    description: "Built a competitive programming platform from scratch. Developed a secure code execution engine supporting multiple languages.",
    skills: ["React", "Go", "MongoDB", "Kubernetes"],
  },
]

export function Experience() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center text-gradient">Professional Journey</h2>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

              <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full md:w-1/2">
                  <div className={`glass-card p-6 rounded-2xl border-white/5 relative group hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    {/* Dot */}
                    <div className="absolute top-8 -left-[35px] md:left-auto md:right-auto md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10
                      md:left-[-41px] group-hover:scale-125 transition-transform"
                      style={{ left: i % 2 === 0 ? 'auto' : '-41px', right: i % 2 === 0 ? '-41px' : 'auto' }}
                    />

                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <div className="text-sm font-medium text-muted-foreground mb-4">{exp.company}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block flex-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
