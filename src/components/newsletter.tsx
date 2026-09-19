"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionBand } from "@/components/ui/section-band";
import { SectionIntro } from "@/components/ui/section-intro";

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
    <SectionBand id="newsletter" tone="light" inner="py-[112px] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionIntro
          index="03"
          eyebrow="Engineering Newsletter"
          title="Engineering insights, delivered to your inbox."
          lead={
            <>
              Deep dives into cloud architecture, performance optimization, and modern web patterns.
              Hosted on <strong className="font-semibold text-band-ink">Substack</strong> for the
              best reading experience.
            </>
          }
          className="mb-8"
        />

        <form
          onSubmit={handleSubscribe}
          className="mx-auto mb-3.5 flex max-w-[440px] flex-col items-center gap-2.5 sm:flex-row"
        >
          <Input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="h-auto rounded-full border-input py-3.5 text-sm"
          />
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Join on Substack
          </Button>
        </form>

        <p className="mb-8 font-mono text-meta uppercase text-band-ink-faint">
          Powered by Substack
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-meta uppercase text-band-ink-muted">
          {capabilities.map((label) => (
            <span key={label} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-brand" />
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionBand>
  );
}
