"use client";

import { motion } from "framer-motion";
import { PlayCircle, Quote } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { trustSignals, videoTestimonials, writtenTestimonials } from "@/lib/content";

// Reserve slots so the video-testimonial row always reads as intentional and
// prominent, even before real footage is uploaded.
const VIDEO_SLOTS = 3;

export function Card07Stories() {
  return (
    <ChapterSection id="stories">
      <AuroraBackground variant="light" />

      <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <ChapterTag index="07" label="Success Stories" />
          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
            Real Businesses.{" "}
            <span className="text-gradient font-semibold">
              Real Partnerships.
            </span>
          </h2>
        </div>

        <div className="flex gap-8">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="text-left">
              <div className="font-heading text-2xl font-semibold text-gradient sm:text-3xl">
                {signal.value}
              </div>
              <div className="mt-1 max-w-[9rem] text-xs leading-snug text-plum/60">
                {signal.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video testimonials — the strongest form of social proof, so this
          row leads the section. Empty slots are an honest placeholder for
          real client video, not a fabricated quote. */}
      <div className="tilt-group grid grid-cols-1 gap-6 sm:grid-cols-3">
        {Array.from({ length: VIDEO_SLOTS }).map((_, i) => {
          const video = videoTestimonials[i];
          return (
            <motion.div
              key={video?.clientName ?? `video-slot-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard className="overflow-hidden p-0">
                <div className="relative flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-secondary to-plum">
                  <PlayCircle
                    size={40}
                    strokeWidth={1.5}
                    className="text-white/70"
                  />
                  <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                    {video ? "Video Testimonial" : "Coming Soon"}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-plum">
                    {video?.clientName ?? "Client story in progress"}
                  </p>
                  <p className="mt-0.5 text-xs text-plum/60">
                    {video?.role ?? "Real client footage will be featured here"}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Written testimonials */}
      <div className="mt-6">
        {writtenTestimonials.length > 0 ? (
          <div className="tilt-group grid grid-cols-1 gap-6 lg:grid-cols-3">
            {writtenTestimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard className="flex h-full flex-col p-7">
                  <Quote size={20} className="text-accent" />
                  <p className="mt-3 flex-1 font-heading text-lg italic leading-relaxed text-plum/85">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-primary/10 pt-4">
                    <p className="text-sm font-semibold text-plum">{t.name}</p>
                    <p className="text-xs text-plum/60">{t.company}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-primary/25 bg-white/40 px-8 py-10 text-center">
            <p className="text-sm text-plum/60">
              Written testimonials are being collected from current clients
              and will appear here soon.
            </p>
          </div>
        )}
      </div>
    </ChapterSection>
  );
}
