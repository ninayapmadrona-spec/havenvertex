"use client";

import { motion } from "framer-motion";
import { PlayCircle, Quote } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { clients, trustSignals, videoTestimonials, writtenTestimonials } from "@/lib/content";

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
          <p className="mt-4 text-base leading-relaxed text-plum/75">
            The proof is still being written. Here&rsquo;s where it stands
            today — and how you could be part of what comes next.
          </p>
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

      {/* A single featured video slot — honest about being pending, without
          tripling the same placeholder — paired with a quiet trust strip of
          real, already-approved client names for proof that isn't pending. */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md lg:mx-0"
        >
          <TiltCard className="overflow-hidden p-0">
            <div className="relative flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-secondary to-plum">
              <PlayCircle size={44} strokeWidth={1.5} className="text-white/70" />
              <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                {videoTestimonials[0] ? "Video Testimonial" : "Story In Progress"}
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-plum">
                {videoTestimonials[0]?.clientName ?? "Client story in progress"}
              </p>
              <p className="mt-0.5 text-xs text-plum/60">
                {videoTestimonials[0]?.role ?? "Real client footage will be featured here"}
              </p>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary/70">
            Already Trusted By
          </p>
          <p className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 font-heading text-lg leading-relaxed text-plum/70 lg:justify-start">
            {clients.map((client, i) => (
              <span key={client.slug}>
                {client.name}
                {i < clients.length - 1 && (
                  <span className="ml-3 text-primary/30">&middot;</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
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
              We&rsquo;re just getting started collecting stories like these.
              If you&rsquo;re already a client, we&rsquo;d love to feature
              yours — and if you&rsquo;re not yet, let&rsquo;s change that.
            </p>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-4 text-sm font-semibold text-secondary transition-colors hover:text-primary"
            >
              Start the conversation &rarr;
            </button>
          </div>
        )}
      </div>
    </ChapterSection>
  );
}
