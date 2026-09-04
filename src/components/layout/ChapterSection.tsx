"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ChapterSectionProps = {
  id: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

/**
 * Shared shell for every chapter card: full-viewport, scroll-snapped, and
 * animated so the card gently scales/lifts forward as it becomes the
 * dominant section in view — the "cinematic, not aggressive" motion the
 * brand references call for.
 */
export function ChapterSection({
  id,
  children,
  dark = false,
  className = "",
}: ChapterSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`chapter-snap relative flex min-h-screen w-full items-center overflow-hidden ${
        dark ? "bg-plum text-white" : "bg-cloud text-plum"
      } ${className}`}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 24 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 md:pl-28 lg:px-16 lg:pl-32"
      >
        {children}
      </motion.div>
    </section>
  );
}
