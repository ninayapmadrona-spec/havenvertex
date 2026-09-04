"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { testimonials, trustSignals } from "@/lib/content";

export function Card06Stories() {
  return (
    <ChapterSection id="stories">
      <AuroraBackground variant="light" />

      <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <ChapterTag index="06" label="Success Stories" />
          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
            Different Businesses.{" "}
            <span className="text-gradient font-semibold">
              A Brighter Tomorrow.
            </span>
          </h2>
        </div>

        <div className="flex gap-8">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="text-left">
              <div className="font-heading text-3xl font-semibold text-gradient">
                {signal.value}
              </div>
              <div className="mt-1 max-w-[9rem] text-xs leading-snug text-plum/60">
                {signal.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tilt-group grid grid-cols-1 gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <TiltCard className="flex h-full flex-col p-7">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 font-heading text-lg italic leading-relaxed text-plum/85">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-primary/10 pt-4">
                <p className="text-sm font-semibold text-plum">{t.name}</p>
                <p className="text-xs text-plum/60">{t.location}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </ChapterSection>
  );
}
