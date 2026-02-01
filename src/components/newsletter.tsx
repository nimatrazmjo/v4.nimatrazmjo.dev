"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const SUBSTACK_URL = "https://nimatrazmjo.substack.com";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Redirect to Substack with email pre-filled (if supported)
    // or just to the subscribe page
    const subscribeUrl = `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`;
    window.open(subscribeUrl, "_blank");
  };

  return (
    <section className="py-24 relative overflow-hidden" id="newsletter">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/10 border border-white/5 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Join 500+ Engineers</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
            Engineering insights, delivered to your inbox.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Deep dives into cloud architecture, performance optimization, and modern web patterns.
            Hosted on <strong>Substack</strong> for the best reading experience.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-11 bg-white/5 border-white/10 rounded-xl h-12 focus:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              className="rounded-xl h-12 px-8 font-semibold shadow-lg shadow-primary/20 group"
            >
              Join on Substack
              <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-foreground opacity-80">Substack</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
