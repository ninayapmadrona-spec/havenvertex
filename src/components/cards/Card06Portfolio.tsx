"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Sun,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { portfolio } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  "hospitality-clubs": UtensilsCrossed,
  "solar-renewable-energy": Sun,
  education: GraduationCap,
  "professional-services": Briefcase,
};

export function Card06Portfolio() {
  return (
    <ChapterSection id="portfolio">
      <AuroraBackground variant="light" />

      <div className="mb-12 max-w-2xl">
        <ChapterTag index="06" label="Portfolio" />
        <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
          Where We{" "}
          <span className="text-gradient font-semibold">Work.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-plum/75">
          The industries Haven Vertex supports most. Case studies for each
          category are being prepared and will appear here as real client
          work is approved for showcase.
        </p>
      </div>

      <div className="tilt-group grid grid-cols-1 gap-6 sm:grid-cols-2">
        {portfolio.map((category, i) => {
          const Icon = iconMap[category.slug];
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <TiltCard className="flex h-full flex-col p-8">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-2xl font-medium text-plum">
                  {category.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/70">
                  {category.description}
                </p>

                {category.caseStudies.length === 0 ? (
                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                    Case studies coming soon
                  </span>
                ) : (
                  <ul className="mt-6 space-y-3">
                    {category.caseStudies.map((study) => (
                      <li key={study.title} className="border-t border-primary/10 pt-3">
                        <p className="text-sm font-semibold text-plum">{study.title}</p>
                        <p className="mt-1 text-xs text-plum/60">{study.servicesProvided}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </ChapterSection>
  );
}
