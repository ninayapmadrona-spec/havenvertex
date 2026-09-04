"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A single client mark in the trust grid. Looks for a real logo file at
 * /public/clients/<slug>.png first; until that's supplied, falls back to a
 * clean typographic wordmark of the client's name — never a fabricated logo
 * graphic, since these are real, named businesses. Grayscale by default,
 * shifts to the brand purple on hover/focus.
 */
export function ClientLogo({ name, slug }: { name: string; slug: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group flex h-24 w-full items-center justify-center rounded-2xl border border-primary/10 bg-white/40 px-6 py-5 transition-colors duration-300 hover:border-primary/30 hover:bg-white/70">
      {!failed ? (
        <span className="relative block h-full w-full">
          <Image
            src={`/clients/${slug}.png`}
            alt={name}
            fill
            sizes="160px"
            className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            onError={() => setFailed(true)}
          />
        </span>
      ) : (
        <span
          className="select-none text-center font-heading text-lg font-medium tracking-wide text-plum/45 transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text"
        >
          {name}
        </span>
      )}
    </div>
  );
}
