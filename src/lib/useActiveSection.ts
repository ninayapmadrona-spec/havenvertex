"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks which chapter section is currently dominant in the scroll container,
 * so the side rail can highlight the active chapter without a traditional navbar.
 */
export function useActiveSection(
  containerRef: RefObject<HTMLElement>,
  sectionIds: string[]
) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      // A fine-grained threshold list (rather than starting at 0.5) matters
      // here: on narrow viewports a tall single-column chapter can never
      // occupy 50%+ of the viewport, so a coarser list would stop firing
      // callbacks altogether and leave the rail stuck on the wrong chapter.
      { root, threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [containerRef, sectionIds]);

  return activeId;
}
