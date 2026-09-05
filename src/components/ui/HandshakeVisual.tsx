"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { x: "-8%", y: "-30%", delay: 0 },
  { x: "10%", y: "20%", delay: 0.6 },
  { x: "-14%", y: "22%", delay: 1.1 },
  { x: "12%", y: "-18%", delay: 1.6 },
  { x: "0%", y: "-4%", delay: 2.1 },
];

/**
 * The hero's handshake photo, looked up at /public/hero/handshake.jpg. The
 * brief is explicit that the hands are already clasped (not reaching, no
 * hand-movement animation) — only a soft glow and a few slow particles
 * animate at the connection point, on top of the photo.
 *
 * Renders nothing at all until that file exists — no placeholder box, icon,
 * or "coming soon" copy. With no photo, visitors should see only the
 * LuxuryLight background behind this component, same as everywhere else on
 * the page.
 */
export function HandshakeVisual() {
  const [failed, setFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative mx-auto w-full max-w-3xl ${
        failed ? "" : "h-56 overflow-hidden rounded-[2rem] sm:h-72 lg:h-80"
      }`}
    >
      {!failed && (
        <>
          <Image
            src="/hero/handshake.jpg"
            alt="Haven Vertex and client shaking hands"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
            onError={() => setFailed(true)}
          />

          {/*
            Connection-point glow + particles. Both stay mounted regardless
            of prefersReducedMotion — only the `animate` prop is
            conditional. This matters for SSR: useReducedMotion() reads the
            media query and can't agree with the server's markup on the
            very first client render, so branching on it to add/remove DOM
            nodes (rather than just animation props) causes a hydration
            mismatch.
          */}
          <motion.div
            aria-hidden
            animate={prefersReducedMotion ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 opacity-70 blur-2xl"
          />

          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], opacity: [0.3, 0.85, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent opacity-60 shadow-[0_0_8px_2px_rgba(181,126,220,0.7)]"
              style={{ marginLeft: p.x, marginTop: p.y }}
            />
          ))}

          {/* Soft scrim so the photo stays legible under the copy above/below it */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mist/40 via-transparent to-mist/10" />
        </>
      )}
    </div>
  );
}
