"use client";

import { motion } from "framer-motion";
import { chapters } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";

export function SideRail({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 sm:left-6 md:flex md:flex-col md:items-center"
    >
      <div className="rail-track flex flex-col items-center gap-6 rounded-full px-3 py-6 shadow-glass">
        <div className="pb-1">
          <LogoMark size={22} />
        </div>

        <ul className="flex flex-col items-center gap-5">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeId;
            return (
              <li key={chapter.id} className="group relative">
                <button
                  aria-label={`Go to ${chapter.label}`}
                  aria-current={isActive}
                  onClick={() => onNavigate(chapter.id)}
                  className="relative flex h-4 w-4 items-center justify-center"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1 : 0.55,
                      backgroundColor: isActive ? "#6A1B9A" : "#B57EDC66",
                    }}
                    transition={{ duration: 0.3 }}
                    className="block h-2.5 w-2.5 rounded-full"
                  />
                  {isActive && (
                    <motion.span
                      layoutId="rail-ring"
                      className="absolute inset-[-6px] rounded-full border border-primary/50"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>

                <span className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-plum px-3 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  {chapter.index} — {chapter.label}
                </span>
              </li>
            );
          })}
        </ul>

        <span
          className="mt-1 select-none text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary/70"
          style={{ writingMode: "vertical-rl" }}
        >
          Digital Growth Partner
        </span>
      </div>
    </nav>
  );
}
