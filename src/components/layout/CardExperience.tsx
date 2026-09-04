"use client";

import { useCallback, useRef } from "react";
import { chapters } from "@/lib/content";
import { useActiveSection } from "@/lib/useActiveSection";
import { SideRail } from "./SideRail";
import { MobileDock } from "./MobileDock";

const sectionIds = chapters.map((c) => c.id);

/**
 * The full-viewport, scroll-snapping "chapter" experience that replaces a
 * traditional homepage + top nav. Each direct child section becomes one
 * chapter card; users scroll, click a rail dot, or swipe (native touch
 * scroll-snap) to move between them.
 */
export function CardExperience({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveSection(containerRef, sectionIds);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <div className="relative bg-cloud">
      <a
        href="#welcome"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-glow"
      >
        Skip to content
      </a>

      <SideRail activeId={activeId} onNavigate={navigate} />
      <MobileDock activeId={activeId} onNavigate={navigate} />

      <div
        ref={containerRef}
        className="no-scrollbar h-screen snap-y-mandatory overflow-y-scroll overscroll-y-contain scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
