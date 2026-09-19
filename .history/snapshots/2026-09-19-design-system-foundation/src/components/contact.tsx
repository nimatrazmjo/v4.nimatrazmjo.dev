"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"
import { sendEmail } from "@/actions/contact"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: null })

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      const result = await sendEmail(data)
      if (result.success) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        })
        const form = e.target as HTMLFormElement
        form.reset()
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send message.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="pb-[130px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div>
        <h2 className="text-[clamp(30px,3.6vw,40px)] font-extrabold tracking-[-0.01em] leading-[1.15] text-foreground mb-[18px]">
          Let&apos;s build something{" "}
          <span style={{ color: "var(--brand-accent-ink)" }}>extraordinary</span> together.
        </h2>
        <p className="text-muted-foreground text-[15px] mb-9 leading-relaxed max-w-[420px]">
          Whether you have a specific project in mind or just want to chat about
          the latest in cloud architecture and web dev, my inbox is always open.
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] brand-icon-tile"
              style={{ color: "var(--brand-accent-ink)" }}
            >
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                Email Me At
              </div>
              <div className="text-sm font-semibold text-foreground">nimatullah.razmjo@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] brand-icon-tile"
              style={{ color: "var(--brand-accent-ink)" }}
            >
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                Discord / Telegram
              </div>
              <div className="text-sm font-semibold text-foreground">@nimatrazmjo</div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Card className="block p-8 rounded-[20px] border-border">
          <form className="space-y-[18px]" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">Full Name</label>
              <Input
                name="name"
                required
                placeholder="John Doe"
                className="h-auto py-2.5 rounded-[10px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">Email Address</label>
              <Input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="h-auto py-2.5 rounded-[10px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">Your Message</label>
              <Textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="rounded-[10px] resize-y"
              />
            </div>

            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`flex items-center gap-2 p-3.5 rounded-[10px] text-sm ${status.type === "success"
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-auto py-3.5 rounded-[10px] font-mono text-[13px] font-semibold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message ➤"
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </section>
  )
}
