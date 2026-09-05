"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The landing page's primary CTA: glass-morphism purple pill with a tiny
 * light particle continuously orbiting the outer border (CSS motion-path,
 * ~3.6s/rotation — deliberately slow and quiet, never a distraction).
 */
export function OrbitButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <span className="cta-orbit-wrap inline-block rounded-full">
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-3 rounded-full border border-white/40 bg-gradient-to-r from-primary/90 to-secondary/90 px-8 py-4 uppercase tracking-[0.15em] text-white shadow-glow backdrop-blur-md transition-shadow duration-300 hover:shadow-glow-lg"
      >
        <span className="text-sm font-semibold">{children}</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={15} strokeWidth={2.5} />
        </span>
      </motion.button>
      <span className="cta-orbit-particle" aria-hidden />
    </span>
  );
}
