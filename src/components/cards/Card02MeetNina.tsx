"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { brand, keyStats } from "@/lib/content";

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
        {/* The real photo, treated like Welcome's photography rather than
            an illustrated stand-in: a tall portrait crop with a glass
            caption bar carrying attribution and a LinkedIn link, instead
            of a circular monogram. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-glow-lg"
        >
          <Image
            src="/team/nina.jpg"
            alt="Nina Madrona, Founder of Haven Vertex"
            fill
            sizes="(min-width: 1024px) 28vw, 80vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-white/70 px-5 py-4 backdrop-blur-md">
            <div>
              <p className="font-heading text-base font-semibold text-plum">
                Nina Madrona
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/80">
                Founder, Haven Vertex
              </p>
            </div>
            <a
              href={brand.founderLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nina Madrona on LinkedIn"
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary text-white shadow-glow transition-transform hover:scale-105"
            >
              <Linkedin size={16} strokeWidth={2} />
            </a>
          </div>
        </motion.div>

        <div>
          <ChapterTag index="02" label="Meet Nina" />

          <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
            Hi, I&rsquo;m{" "}
            <span className="text-gradient font-semibold">Nina.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/80">
            I created Haven Vertex to help business owners stay visible,
            organized, and focused on growth. By bringing websites, content,
            systems, and digital support together in one place, I help
            businesses spend less time managing the details and more time
            moving forward.
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
