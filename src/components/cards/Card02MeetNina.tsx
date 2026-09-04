"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { keyStats } from "@/lib/content";

const pills = [
  `${keyStats.yearsExperience} Years Experience`,
  `${keyStats.projectsSupported} Projects Supported`,
  `${keyStats.clientReach} Clients`,
];

export function Card02MeetNina() {
  return (
    <ChapterSection id="meet-nina">
      <AuroraBackground variant="light" />

      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-plum shadow-glow-lg sm:h-80 sm:w-80"
        >
          <span className="font-heading text-7xl font-semibold text-white/90 sm:text-8xl">
            N
          </span>
          <div className="absolute inset-0 rounded-full border border-white/20" />
        </motion.div>

        <div>
          <ChapterTag index="02" label="Meet Nina" />

          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
            Hi, I&rsquo;m{" "}
            <span className="text-gradient font-semibold">Nina.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-plum/75">
            For more than 12 years, I&rsquo;ve helped businesses stay
            visible, organized, and growing through websites, content, SEO,
            systems, and digital operations.
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-plum/75">
            Haven Vertex was built to bring all of these services together
            under one trusted partner.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-secondary shadow-sm backdrop-blur"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
