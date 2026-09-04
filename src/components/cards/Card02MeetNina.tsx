"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag, SectionKicker } from "@/components/ui/SectionKicker";

const pills = [
  "12+ Years Experience",
  "Global Client Experience",
  "Australian Business Experience",
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
            The Founder Behind{" "}
            <span className="text-gradient font-semibold">Haven Vertex.</span>
          </h2>

          <p className="mt-3 font-heading text-xl italic text-secondary/80">
            &ldquo;Good systems, brighter tomorrows.&rdquo;
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-plum/75">
            With more than a decade spent inside websites, marketing engines
            and back-office operations, Nina founded Haven Vertex to give
            growing businesses what most can&rsquo;t afford in-house — a
            steady, skilled partner who keeps the details moving so the
            people behind the business can focus on what they do best.
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-plum/75">
            From global client work to a dedicated focus on Australian
            businesses, the approach stays the same: fewer dropped balls,
            clearer systems, and a partner who treats your business like it
            matters — because it does.
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

      <div className="mt-16">
        <SectionKicker>People First</SectionKicker>
      </div>
    </ChapterSection>
  );
}
