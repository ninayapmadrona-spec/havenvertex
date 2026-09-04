"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { StatBlock } from "@/components/ui/StatBlock";
import {
  experienceFocusAreas,
  experienceStats,
  keyStats,
  portfolioCategories,
} from "@/lib/content";

export function Card04Experience() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ChapterSection id="experience">
      <AuroraBackground variant="light" />

      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <ChapterTag index="04" label="Experience" />
          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
            Trusted Across{" "}
            <span className="text-gradient font-semibold">Industries.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-plum/75">
            {keyStats.yearsExperience} years of hands-on experience, working
            with {keyStats.clientReach} clients across hospitality, energy,
            education and professional services.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {experienceStats.map((stat, i) => (
              <StatBlock key={stat.label} {...stat} index={i} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
              className="col-span-2 border-l border-primary/20 pl-5"
            >
              <div className="font-heading text-2xl font-semibold text-gradient sm:text-3xl">
                {keyStats.clientReach}
              </div>
              <div className="mt-1 text-sm text-plum/70">Client Reach</div>
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {experienceFocusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-primary/20 bg-white/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary backdrop-blur"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Abstract orbital diagram — an editorial stand-in for a literal geo
            map, keeping the bundle light while staying genuinely interactive.
            Points mirror the Portfolio chapter's categories. */}
        <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center sm:h-[440px] sm:w-[440px]">
          <div className="absolute inset-0 rounded-full border border-primary/15" />
          <div className="absolute inset-8 rounded-full border border-primary/10" />
          <div className="absolute inset-16 rounded-full border border-primary/10" />

          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-glow-lg">
            <Globe2 size={30} />
          </div>

          {portfolioCategories.map((category, i) => {
            const angle = (i / portfolioCategories.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 170;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = active === i;

            return (
              <motion.button
                key={category.slug}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                animate={{ scale: isActive ? 1.35 : 1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={category.name}
              >
                <span
                  className={`block h-3.5 w-3.5 rounded-full border-2 border-white shadow-md transition-colors ${
                    isActive ? "bg-primary" : "bg-accent"
                  }`}
                />
                {isActive && (
                  <span className="absolute left-1/2 top-6 w-max -translate-x-1/2 rounded-full bg-plum px-3 py-1 text-[11px] font-medium text-white shadow-lg">
                    {category.name}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </ChapterSection>
  );
}
