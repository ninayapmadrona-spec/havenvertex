"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Renders the official Haven Vertex wing mark from /public/brand/logo.png when
 * present. Until that asset is dropped in, falls back to a simple placeholder
 * glyph so the layout is never left blank — this fallback is NOT a redesign of
 * the brand logo, just scaffolding. Replace /public/brand/logo.png with the
 * real, unaltered logo file to complete the brand.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Haven Vertex"
        className="drop-shadow-[0_0_10px_rgba(106,27,154,0.45)]"
      >
        <path
          d="M20 32 L8 14 Q14 18 20 12 Q26 18 32 14 Z"
          fill="url(#hv-grad)"
        />
        <defs>
          <linearGradient id="hv-grad" x1="8" y1="12" x2="32" y2="32">
            <stop offset="0%" stopColor="#B57EDC" />
            <stop offset="100%" stopColor="#4A0E6B" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/logo.png"
        alt="Haven Vertex"
        fill
        sizes={`${size}px`}
        className="object-contain"
        onError={() => setFailed(true)}
        priority
      />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading tracking-wide ${className}`}>
      <span className="font-medium">Haven</span>{" "}
      <span className="font-semibold text-gradient">Vertex</span>
    </span>
  );
}
