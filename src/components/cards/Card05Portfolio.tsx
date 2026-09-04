"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { portfolio } from "@/lib/content";

export function Card05Portfolio() {
  return (
    <ChapterSection id="portfolio">
      <AuroraBackground variant="light" />

      <div className="mb-12 max-w-2xl">
        <ChapterTag index="05" label="Portfolio" />
        <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
          Real Work.{" "}
          <span className="text-gradient font-semibold">Real Results.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-plum/75">
          Here are some of the businesses we&rsquo;ve supported. Each project
          reflects our commitment to quality, strategy, and growth.
        </p>
      </div>

      <div className="tilt-group grid grid-cols-1 gap-6 sm:grid-cols-2">
        {portfolio.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <TiltCard className="overflow-hidden p-0">
              <div className={`relative flex h-44 flex-col justify-end bg-gradient-to-br ${project.theme} p-5`}>
                <div className="absolute left-4 top-4 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                </div>
                <p className="font-heading text-xl italic text-white/90">
                  {project.title}
                </p>
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {project.tag}
                  </p>
                  <p className="mt-1 text-sm text-plum/70">{project.services}</p>
                </div>
                <button
                  aria-label={`View case study: ${project.title}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </ChapterSection>
  );
}
