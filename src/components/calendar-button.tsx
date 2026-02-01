"use client"

import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function CalendarButton({ className }: { className?: string }) {
  const APPOINTMENT_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3EMlsl4mH3NKHCy9AFYbpU814R5lEWOQaDNFNcK8wcxzExE7YbyNl7GytRnvFgIRDJQ_gmKBb7?gv=true";
  const controls = useAnimationControls();

  useEffect(() => {
    // Continuous subtle pulse animation
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative group", className)}
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-indigo-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />

      <Button
        asChild
        className="relative w-full rounded-full bg-primary px-6 h-12 md:h-10 font-bold text-primary-foreground shadow-lg transition-all hover:shadow-primary/40 group-hover:bg-primary/90"
      >
        <a
          href={APPOINTMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 overflow-hidden"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="tracking-tight whitespace-nowrap text-base md:text-sm">Book a Meeting</span>

          {/* Professional Shine Effect */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              repeatDelay: 3
            }}
            className="absolute inset-0 z-10 w-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
          />
        </a>
      </Button>
    </motion.div>
  );
}
