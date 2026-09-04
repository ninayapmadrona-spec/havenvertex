"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { Button } from "@/components/ui/Button";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { brand } from "@/lib/content";

export function Card01Welcome() {
  return (
    <ChapterSection id="welcome" className="pl-6 sm:pl-10 md:pl-28 lg:pl-32">
      <AuroraBackground variant="light" />

      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <LogoMark size={72} />
          </motion.div>

          <Wordmark className="block text-4xl sm:text-5xl" />

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
            {brand.tagline}
          </p>

          <h1 className="mt-8 font-heading text-4xl font-medium leading-[1.15] sm:text-5xl lg:text-6xl">
            Helping Businesses Stay{" "}
            <span className="text-gradient font-semibold">
              Visible, Organized &amp; Growing.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-md font-body text-sm font-semibold uppercase tracking-[0.2em] text-plum/60 lg:mx-0">
            Websites · SEO · Content · Digital Support
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <Button onClick={() => document.getElementById("meet-nina")?.scrollIntoView({ behavior: "smooth" })}>
              Enter Our Vertex
            </Button>
          </div>
        </div>

        <div className="relative hidden h-[420px] items-center justify-center lg:flex">
          <ReachingConnection />
        </div>
      </div>

      <motion.button
        aria-label="Scroll to next chapter"
        onClick={() => document.getElementById("meet-nina")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary"
      >
        <ChevronDown size={28} />
      </motion.button>
    </ChapterSection>
  );
}

/**
 * Abstract stand-in for the "two hands reaching, purple energy connection"
 * reference art — rendered in pure CSS/SVG so the card never depends on a
 * stock human photo. Swap for a real photograph in /public when available.
 */
function ReachingConnection() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        animate={{ x: [0, 8, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -8, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-bl from-accent/50 to-transparent blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_60px_20px_rgba(181,126,220,0.7)]"
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
        <path
          d="M40 220 C 120 180, 160 140, 200 150"
          stroke="url(#line-grad-1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M360 220 C 280 180, 240 140, 200 150"
          stroke="url(#line-grad-2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="line-grad-1" x1="40" y1="220" x2="200" y2="150">
            <stop offset="0%" stopColor="#6A1B9A" stopOpacity="0" />
            <stop offset="100%" stopColor="#B57EDC" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="line-grad-2" x1="360" y1="220" x2="200" y2="150">
            <stop offset="0%" stopColor="#4A0E6B" stopOpacity="0" />
            <stop offset="100%" stopColor="#B57EDC" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
