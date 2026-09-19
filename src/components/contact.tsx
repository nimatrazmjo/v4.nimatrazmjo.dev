"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionBand } from "@/components/ui/section-band"
import { Mail, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"
import { sendEmail } from "@/actions/contact"

const channels = [
  { icon: Mail, label: "Email Me At", value: "nimatullah.razmjo@gmail.com" },
  { icon: MessageSquare, label: "Discord / Telegram", value: "@nimatrazmjo" },
]

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
    } catch {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionBand id="contact" tone="dark" texture inner="py-[112px]">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div>
          <Eyebrow index="04" className="mb-5">
            Get in Touch
          </Eyebrow>
          <h2 className="text-display-md mb-[18px] text-band-ink">
            Let&apos;s build something <span className="text-brand-ink">extraordinary</span> together.
          </h2>
          <p className="text-lead mb-9 max-w-[420px] text-band-ink-muted">
            Whether you have a specific project in mind or just want to chat about
            the latest in cloud architecture and web dev, my inbox is always open.
          </p>

          <div className="flex flex-col gap-5">
            {channels.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] brand-icon-tile">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-meta uppercase text-band-ink-faint">{label}</div>
                  <div className="text-sm font-semibold text-band-ink">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[20px] border border-band-rule bg-white/[0.035] p-8 backdrop-blur-sm"
        >
          <form className="space-y-[18px]" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-mono text-meta uppercase text-band-ink-muted">
                Full Name
              </label>
              <Input
                id="contact-name"
                name="name"
                required
                placeholder="John Doe"
                className="h-auto rounded-[10px] border-band-rule bg-transparent py-2.5 text-band-ink placeholder:text-band-ink-faint"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-mono text-meta uppercase text-band-ink-muted">
                Email Address
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="h-auto rounded-[10px] border-band-rule bg-transparent py-2.5 text-band-ink placeholder:text-band-ink-faint"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block font-mono text-meta uppercase text-band-ink-muted">
                Your Message
              </label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="resize-y rounded-[10px] border-band-rule bg-transparent text-band-ink placeholder:text-band-ink-faint"
              />
            </div>

            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="status"
                  className={`flex items-center gap-2 rounded-[10px] p-3.5 text-sm ${
                    status.type === "success"
                      ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                      : "border border-red-400/25 bg-red-400/10 text-red-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Same solid pill as the hero primary — no one-off submit treatment. */}
            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </SectionBand>
  )
}
