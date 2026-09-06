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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-r from-primary/95 to-secondary/95 px-8 py-4 uppercase tracking-[0.16em] text-white shadow-[0_0_80px_-8px_rgba(106,27,154,0.65)] backdrop-blur-lg transition-shadow duration-300 hover:shadow-[0_0_100px_-4px_rgba(106,27,154,0.8)] sm:gap-5 sm:px-14 sm:py-[26px] sm:tracking-[0.18em]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-60" />
        <span className="relative text-sm font-semibold sm:text-lg lg:text-xl">{children}</span>
        <span className="relative grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-[46px] sm:w-[46px]">
          <ArrowRight size={16} strokeWidth={2.5} className="sm:hidden" />
          <ArrowRight size={22} strokeWidth={2.5} className="hidden sm:block" />
        </span>
      </motion.button>
      <span className="cta-orbit-particle" aria-hidden />
    </span>
  );
}
