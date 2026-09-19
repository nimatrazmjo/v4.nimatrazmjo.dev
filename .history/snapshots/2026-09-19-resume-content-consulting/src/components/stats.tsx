"use client"

import { motion } from "framer-motion"
import { SectionBand } from "@/components/ui/section-band"
import { StatDisplay, StatRow } from "@/components/ui/stat-display"

const stats = [
  { label: "Years Experience", value: "12+" },
  { label: "Technologies", value: "40+" },
  { label: "Certifications", value: "2" },
  { label: "Projects Completed", value: "20+" },
]

export function Stats() {
  return (
    <SectionBand tone="dark" texture inner="py-[104px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <StatRow>
          {stats.map((stat) => (
            <StatDisplay key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </StatRow>
      </motion.div>
    </SectionBand>
  )
}
