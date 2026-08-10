"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

const capabilities = [
  "Scalable Systems",
  "Cloud-Native Architecture",
  "High-Traffic APIs",
  "Production-Grade DevOps",
];

export function Newsletter() {
  const [email, setEmail] = useState("");

  const SUBSTACK_URL = "https://nimatrazmjo.substack.com";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subscribeUrl = `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`;
    window.open(subscribeUrl, "_blank");
  };

  return (
    <section id="newsletter" className="mb-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[28px] py-16 px-6 text-center brand-tint-panel"
      >
        <div className="inline-block mb-5 rounded-full border border-[oklch(87%_0.01_222)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Engineering Newsletter
        </div>

        <h2 className="text-[clamp(28px,3.4vw,36px)] font-extrabold tracking-[-0.01em] text-foreground mb-3.5 max-w-[520px] mx-auto">
          Engineering insights, delivered to your inbox.
        </h2>
        <p className="text-muted-foreground text-[15px] mb-8 max-w-[460px] mx-auto leading-relaxed">
          Deep dives into cloud architecture, performance optimization, and modern web patterns.
          Hosted on <strong>Substack</strong> for the best reading experience.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-2.5 max-w-[420px] mx-auto mb-3.5"
        >
          <Input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-auto py-3.5 rounded-full border-[oklch(85%_0.01_222)] text-sm"
          />
          <Button
            type="submit"
            className="rounded-full h-auto py-3.5 px-[22px] font-mono text-[13px] font-semibold whitespace-nowrap w-full sm:w-auto"
          >
            Join on Substack ↗
          </Button>
        </form>

        <p className="font-mono text-[11px] text-[var(--text-faint)] mb-7">Powered by Substack</p>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-muted-foreground">
          {capabilities.map((label) => (
            <span key={label}>◆ {label}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
