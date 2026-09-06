"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Images,
  Laptop,
  Mail,
  Sparkles,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { hubPanels } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  user: User,
  laptop: Laptop,
  chart: BarChart3,
  gallery: Images,
  users: Users,
  mail: Mail,
};

const SPACING_DESKTOP = 260;
const SPACING_MOBILE = 172;

function navigateTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * The Vertex Hub: a horizontal coverflow of seven glass panels between the
 * Welcome hero and the full chapters. Panel 01 (Welcome) is centered on
 * load; the rest fan out in perspective. Clicking a panel's body previews
 * it (brings it to center); clicking its own CTA commits — scrolling into
 * that chapter's real, fullscreen section.
 */
export function CardHub() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spacing = isMobile ? SPACING_MOBILE : SPACING_DESKTOP;

  const select = (index: number) => {
    const clamped = Math.max(0, Math.min(hubPanels.length - 1, index));
    setActiveIndex(clamped);
    setPulseKey((k) => k + 1);
  };

  const enter = (target: string, index: number) => {
    select(index);
    navigateTo(target);
  };

  function onWheel(e: React.WheelEvent) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (e.deltaX > 12) select(activeIndex + 1);
    else if (e.deltaX < -12) select(activeIndex - 1);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = spacing / 3;
    if (info.offset.x < -threshold) select(activeIndex + 1);
    else if (info.offset.x > threshold) select(activeIndex - 1);
    dragX.set(0);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") select(activeIndex + 1);
      if (e.key === "ArrowLeft") select(activeIndex - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const activePanel = useMemo(() => hubPanels[activeIndex], [activeIndex]);

  return (
    <section
      id="hub"
      className="chapter-snap relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-cloud pb-24 text-plum md:pb-0"
    >
      <AuroraBackground variant="light" />

      {/* A quiet glow behind the active panel that briefly intensifies on
          every selection change — re-keyed so the pulse always replays. */}
      <motion.div
        key={pulseKey}
        aria-hidden
        initial={{ opacity: 0.25, scale: 0.9 }}
        animate={{ opacity: [0.25, 0.6, 0.3], scale: [0.9, 1.08, 1] }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[100px] sm:h-[460px] sm:w-[460px]"
      />

      <div className="relative z-10 mb-8 text-center sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/70">
          The Vertex Hub
        </p>
        <h2 className="mt-2 font-heading text-3xl font-medium sm:text-4xl">
          Choose Where to{" "}
          <span className="text-gradient font-semibold">Begin.</span>
        </h2>
      </div>

      <div
        onWheel={onWheel}
        className="relative z-10 flex w-full flex-1 items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
          style={{ x: dragX }}
          className="relative flex h-full w-full items-center justify-center"
        >
          {hubPanels.map((panel, index) => {
            const Icon = iconMap[panel.icon];
            const offset = index - activeIndex;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            const hidden = absOffset > 3;

            return (
              <motion.div
                key={panel.id}
                role="button"
                tabIndex={hidden ? -1 : 0}
                aria-label={`${panel.label} — ${isActive ? "open" : "preview"}`}
                aria-current={isActive}
                onClick={() => (isActive ? undefined : select(index))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isActive) select(index);
                  }
                }}
                animate={{
                  x: offset * spacing,
                  scale: isActive ? 1 : Math.max(0.62, 1 - absOffset * 0.14),
                  rotateY: prefersReducedMotion
                    ? 0
                    : Math.max(-40, Math.min(40, offset * -22)),
                  opacity: hidden ? 0 : isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.25),
                  filter: isActive ? "blur(0px)" : `blur(${Math.min(absOffset, 3)}px)`,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                style={{
                  zIndex: 50 - absOffset,
                  pointerEvents: hidden ? "none" : "auto",
                  transformPerspective: 1400,
                }}
                className={`glass-panel absolute flex h-[280px] w-[210px] cursor-pointer flex-col items-center justify-center rounded-3xl p-6 text-center shadow-glass sm:h-[360px] sm:w-[280px] ${
                  isActive ? "shadow-glow-lg" : ""
                }`}
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow sm:h-16 sm:w-16">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-medium text-plum sm:text-2xl">
                  {panel.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-plum/70 sm:text-sm">
                  {panel.description}
                </p>

                {isActive && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      enter(panel.target, index);
                    }}
                    className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition-transform hover:scale-105"
                  >
                    Enter
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-6 sm:mt-10">
        <button
          type="button"
          aria-label="Previous panel"
          onClick={() => select(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-white/60 text-primary shadow-sm backdrop-blur transition-opacity disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {hubPanels.map((panel, index) => (
            <button
              key={panel.id}
              type="button"
              aria-label={`Go to ${panel.label}`}
              onClick={() => select(index)}
              className="grid h-4 w-4 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "h-2.5 w-2.5 bg-primary"
                    : "h-1.5 w-1.5 bg-primary/30"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next panel"
          onClick={() => select(activeIndex + 1)}
          disabled={activeIndex === hubPanels.length - 1}
          className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-white/60 text-primary shadow-sm backdrop-blur transition-opacity disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="relative z-10 mt-4 text-xs text-plum/50 sm:hidden">
        Swipe to explore
      </p>

      <span className="sr-only" role="status">
        {activePanel.label} selected.
      </span>
    </section>
  );
}
