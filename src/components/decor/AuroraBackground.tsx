"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * The soft purple wave/blob field seen behind every chapter in the brand
 * references. Blobs drift continuously (animation-system, not cursor-bound)
 * and get a gentle parallax nudge from pointer position for the "cards
 * respond to cursor" feel — subtle by design, never gaming-aesthetic.
 */
export function AuroraBackground({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "deep";
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const px = useTransform(sx, [-1, 1], [-24, 24]);
  const py = useTransform(sy, [-1, 1], [-24, 24]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const blobA = variant === "deep" ? "bg-accent/30" : "bg-primary/20";
  const blobB = variant === "deep" ? "bg-primary/40" : "bg-accent/25";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{ x: px, y: py }}
        className={`absolute -left-24 top-[-10%] h-[420px] w-[420px] rounded-full ${blobA} blur-[110px] animate-drift`}
      />
      <motion.div
        style={{ x: useTransform(px, (v) => -v), y: useTransform(py, (v) => -v) }}
        className={`absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full ${blobB} blur-[130px] animate-float`}
      />
      <motion.div
        style={{ x: px, y: useTransform(py, (v) => -v) }}
        className={`absolute bottom-[-15%] left-1/3 h-[360px] w-[360px] rounded-full ${blobA} blur-[100px] animate-drift`}
      />
      <svg
        className="absolute bottom-0 left-0 w-full opacity-40"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C240,200 480,40 720,90 C960,140 1200,60 1440,110 L1440,220 L0,220 Z"
          fill="url(#wave-grad)"
        />
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B57EDC" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6A1B9A" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
