"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MessageSquare, Send, User } from "lucide-react"

export function Contact() {
  return (
    <section className="py-20 relative overflow-hidden" id="contact">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-full max-w-xl h-96 bg-primary/10 blur-[100px] -z-10 rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Let's build something <span className="text-vibrant">extraordinary</span> together.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you have a specific project in mind or just want to chat about
              the latest in cloud architecture and web dev, my inbox is always open.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email me at</p>
                  <p className="text-lg font-medium">nimatullah.razmjo@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Discord / Telegram</p>
                  <p className="text-lg font-medium">@nimatrazmjo</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 glass-card border-white/5">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="John Doe" className="pl-10 bg-white/5 border-white/10 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="john@example.com" type="email" className="pl-10 bg-white/5 border-white/10 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Your Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    className="bg-white/5 border-white/10 min-h-[150px] rounded-xl resize-none"
                  />
                </div>
                <Button className="w-full h-12 rounded-xl gap-2 font-bold group">
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
