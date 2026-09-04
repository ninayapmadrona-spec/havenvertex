"use client";

import { CalendarCheck } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { brand } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function Card07Contact() {
  return (
    <ChapterSection id="contact" dark>
      <AuroraBackground variant="deep" />

      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="mb-6">
            <LogoMark size={56} />
          </div>

          <ChapterTag index="07" label="Let's Build Together" />

          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
            Let&rsquo;s Build{" "}
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent font-semibold">
              Something Great.
            </span>
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Book a discovery call and let&rsquo;s talk about where your
            business is now — and the systems that will get it further,
            faster.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={brand.calendlyUrl}>Book a Discovery Call</Button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
            <CalendarCheck size={16} className="text-accent" />
            30-minute discovery call · No obligation
          </div>

          <p className="mt-14 font-heading text-lg italic text-white/50">
            {brand.footerLine}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg">
          <h3 className="font-heading text-2xl font-medium text-white">
            Or send a message
          </h3>
          <p className="mt-1 text-sm text-white/60">
            We&rsquo;ll reply within one business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
