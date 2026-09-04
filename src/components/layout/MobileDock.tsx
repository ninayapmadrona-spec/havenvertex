"use client";

import { motion } from "framer-motion";
import { chapters } from "@/lib/content";

export function MobileDock({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const activeChapter = chapters.find((c) => c.id === activeId) ?? chapters[0];

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between rounded-full border border-primary/15 bg-white/70 px-4 py-2.5 shadow-glass backdrop-blur-lg md:hidden">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
        {activeChapter.index} · {activeChapter.label}
      </span>
      <div className="flex items-center gap-2">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            aria-label={`Go to ${chapter.label}`}
            onClick={() => onNavigate(chapter.id)}
            className="relative flex h-4 w-4 items-center justify-center"
          >
            <motion.span
              animate={{
                scale: chapter.id === activeId ? 1 : 0.5,
                backgroundColor:
                  chapter.id === activeId ? "#6A1B9A" : "#B57EDC66",
              }}
              className="block h-2 w-2 rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
