"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { LuxuryLight } from "@/components/decor/LuxuryLight";
import { PortalTransition } from "@/components/decor/PortalTransition";
import { HandshakeVisual } from "@/components/ui/HandshakeVisual";
import { OrbitButton } from "@/components/ui/OrbitButton";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { brand } from "@/lib/content";

export function Card01Welcome() {
  const [transitioning, setTransitioning] = useState(false);

  function enterVertex() {
    if (transitioning) return;
    setTransitioning(true);
    // Let the glow/blur read for a beat before the scroll-snap carousel
    // takes over, then clear the overlay once the next chapter has settled.
    window.setTimeout(() => {
      document.getElementById("meet-nina")?.scrollIntoView({ behavior: "smooth" });
    }, 550);
    window.setTimeout(() => setTransitioning(false), 1400);
  }

  return (
    <ChapterSection id="welcome">
      <LuxuryLight />
      <PortalTransition active={transitioning} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoMark size={84} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wordmark className="mt-5 block text-4xl sm:text-5xl" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
            {brand.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full"
        >
          <HandshakeVisual />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-heading text-4xl font-medium leading-[1.15] sm:text-5xl"
        >
          Helping Businesses Stay{" "}
          <span className="text-gradient font-semibold">
            Visible, Organized &amp; Growing.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.2em] text-plum/60"
        >
          Website Support • Marketing Support • Virtual Assistance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <OrbitButton onClick={enterVertex}>Enter Our Vertex</OrbitButton>
        </motion.div>
      </div>

      <motion.button
        aria-label="Scroll to next chapter"
        onClick={enterVertex}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary"
      >
        <ChevronDown size={28} />
      </motion.button>
    </ChapterSection>
  );
}
