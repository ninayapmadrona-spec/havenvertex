"use client";

import { CalendarCheck, Mail } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { brand } from "@/lib/content";
import { ContactForm } from "./ContactForm";

function focusContactForm() {
  document.getElementById("contact-name")?.focus({ preventScroll: false });
}

export function Card08Contact() {
  return (
    <ChapterSection id="contact" dark>
      <AuroraBackground variant="deep" />

      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="mb-6">
            <LogoMark size={56} />
          </div>

          <ChapterTag index="08" label="Let's Build Together" />

          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
            Let&rsquo;s Build{" "}
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent font-semibold">
              Something Better.
            </span>
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Your next digital partner is one conversation away.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={brand.calendlyUrl}>Book A Discovery Call</Button>
            <Button variant="ghost" onClick={focusContactForm} className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
              Send A Message
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-2">
              <CalendarCheck size={16} className="text-accent" />
              30-minute discovery call · No obligation
            </span>
            <a
              href={`mailto:${brand.contactEmail}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail size={16} className="text-accent" />
              {brand.contactEmail}
            </a>
          </div>

          <p className="mt-14 font-heading text-lg italic text-white/50">
            {brand.footerLine}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg">
          <h3 className="font-heading text-2xl font-medium text-white">
            Send a message
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
