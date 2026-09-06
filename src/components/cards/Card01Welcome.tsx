"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { PortalTransition } from "@/components/decor/PortalTransition";
import { OrbitButton } from "@/components/ui/OrbitButton";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { brand } from "@/lib/content";

/**
 * The Welcome chapter, built from genuinely separate layers rather than
 * one flattened mockup: the real office photo as a full-bleed background,
 * the brand mark zooming in on top, the real handshake cutout (its own
 * transparent photo, not a baked illustration), and live headline/CTA
 * text below — each independently animated.
 */
export function Card01Welcome() {
  const [transitioning, setTransitioning] = useState(false);
  const [handsMet, setHandsMet] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const handSlideDuration = prefersReducedMotion ? 0.01 : 1.2;

  function enterVertex() {
    if (transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      document.getElementById("meet-nina")?.scrollIntoView({ behavior: "smooth" });
    }, 550);
    window.setTimeout(() => setTransitioning(false), 1400);
  }

  return (
    <motion.section
      id="welcome"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="chapter-snap relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cloud text-plum"
    >
      {/* The real office photo, full-bleed — the background IS the page,
          not a picture placed on one. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/backgrounds/showroom.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mist/70 via-white/40 to-mist/80" />
      </div>

      <PortalTransition active={transitioning} />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* The brand mark zooms into place — the hero object, not a
            corner badge. */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.6 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoMark
            size={168}
            className="h-[88px] w-[88px] drop-shadow-[0_16px_48px_rgba(74,14,107,0.35)] sm:h-[116px] sm:w-[116px] lg:h-[142px] lg:w-[142px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wordmark className="mt-2 block text-[26px] sm:text-[32px] lg:text-[40px]" />
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
            {brand.tagline}
          </p>
        </motion.div>

        {/* The two hands slide in from opposite sides and, the instant
            they meet, are swapped for the real completed-handshake photo
            (never a faked composite) at the exact same position, with a
            small settling bounce. The background never moves. This block
            breaks out to full viewport width (not the narrower centered
            column) so each hand's far end — the sleeve — travels all the
            way to the true screen edge, instead of ending in empty space
            partway across the page. */}
        <div className="relative mt-3 h-[240px] w-screen sm:h-[300px] lg:h-[340px]">
          {!handsMet && (
            <>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: handSlideDuration, ease: "easeOut" }}
                onAnimationComplete={() => setHandsMet(true)}
                className="absolute inset-y-0 left-0 w-1/2"
              >
                <Image
                  src="/hero/hand-left.png"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover object-right"
                />
              </motion.div>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ duration: handSlideDuration, ease: "easeOut" }}
                className="absolute inset-y-0 right-0 w-1/2"
              >
                <Image
                  src="/hero/hand-right.png"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover object-left"
                />
              </motion.div>
            </>
          )}
          {handsMet && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: prefersReducedMotion ? 1 : [1, 1.03, 1] }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              {/* Fills the same full-viewport-width box the sliding hands
                  used, so the sleeve ends reach the true screen edges here
                  too — the mask fades those edges (and, softly, the top/
                  bottom of the crop) to transparent rather than leaving a
                  visible rectangle. */}
              <Image
                src="/hero/handshake-cutout.png"
                alt="Haven Vertex and client shaking hands"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-heading text-[28px] font-medium leading-[1.1] sm:text-[35px] lg:text-[37px]"
        >
          Helping Businesses Stay{" "}
          <span className="text-gradient font-semibold">
            Visible, Organized &amp; Growing.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-plum/60 sm:text-base"
        >
          Website Support • Marketing Support • Virtual Assistance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <OrbitButton onClick={enterVertex}>Enter Our Vertex</OrbitButton>
        </motion.div>
      </div>

      <motion.button
        aria-label="Scroll to next chapter"
        onClick={enterVertex}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-primary/70 hover:text-primary"
      >
        <ChevronDown size={28} />
      </motion.button>
    </motion.section>
  );
}
