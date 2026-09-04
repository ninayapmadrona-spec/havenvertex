"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useState, type MouseEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
};

/**
 * The "glass portal" tile used across Services, Portfolio and Success Stories.
 * Tilts gently toward the cursor, lifts on hover, and casts a soft radial glow
 * that follows the pointer — deliberately understated, no gaming aesthetics.
 * Wrap a set of these in a container with the `tilt-group` class to get the
 * sibling-blur focus effect on hover.
 */
export function TiltCard({ children, className = "", glow = true }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
    mouseX.set(px * 100);
    mouseY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovering(false);
  }

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}% ${mouseY}%, rgba(181,126,220,0.35), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={prefersReducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={`tilt-card relative overflow-hidden rounded-3xl glass-panel shadow-glass hover:shadow-glow ${className}`}
    >
      {glow && (
        <motion.div
          aria-hidden
          style={{ backgroundImage: spotlight }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0"
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
