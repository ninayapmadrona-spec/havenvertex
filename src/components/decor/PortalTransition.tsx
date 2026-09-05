"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * The full-viewport "portal opens" moment between the landing page and the
 * chapter carousel: the connection-point glow expands, the screen softly
 * blurs, then it clears once the carousel has scrolled into place.
 * Purely visual — CardExperience's own scroll-snap does the actual
 * navigation; this just sits on top of it while the scroll happens.
 */
export function PortalTransition({ active }: { active: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.4 }}
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
          style={{ backdropFilter: "blur(0px)" }}
        >
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-mist/30"
          />
          <motion.div
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: prefersReducedMotion ? 1 : 18, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-16 w-16 rounded-full bg-white shadow-[0_0_120px_60px_rgba(233,221,247,0.9)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
