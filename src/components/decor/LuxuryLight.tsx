"use client";

/**
 * Bright, airy backdrop for the landing page hero — explicitly NOT the
 * saturated purple aurora used on the other chapters. Per the Landing Page
 * V1 brief: premium office, floor-to-ceiling windows, soft lavender
 * atmosphere, bright natural light, a hint of city skyline, all abstracted
 * in CSS gradients/blur rather than a literal photo.
 */
export function LuxuryLight() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mist via-veil/50 to-cloud" />

      {/* Soft window-light beams */}
      <div className="absolute -left-10 top-0 h-full w-40 -rotate-6 bg-gradient-to-b from-white/70 via-white/20 to-transparent blur-2xl" />
      <div className="absolute left-1/3 top-0 h-full w-32 -rotate-6 bg-gradient-to-b from-white/50 via-white/10 to-transparent blur-2xl" />
      <div className="absolute right-10 top-0 h-full w-48 -rotate-6 bg-gradient-to-b from-white/60 via-white/15 to-transparent blur-2xl" />

      {/* A hint of city skyline, well out of focus */}
      <div className="absolute bottom-0 left-0 flex h-24 w-full items-end justify-center gap-3 opacity-[0.14] blur-md sm:h-32">
        {[40, 70, 50, 90, 60, 100, 45, 75, 55].map((h, i) => (
          <div
            key={i}
            className="w-8 rounded-t-sm bg-secondary sm:w-10"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-mist/70 via-transparent to-transparent" />
    </div>
  );
}
