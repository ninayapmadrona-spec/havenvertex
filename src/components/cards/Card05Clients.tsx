"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { clients } from "@/lib/content";

export function Card05Clients() {
  return (
    <ChapterSection id="clients">
      <AuroraBackground variant="light" />

      <div className="mb-12 max-w-2xl">
        <ChapterTag index="05" label="Clients" />
        <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
          Businesses That{" "}
          <span className="text-gradient font-semibold">Trust Haven Vertex.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-plum/75">
          From clubs and hospitality to renewable energy and education, these
          are some of the businesses we&rsquo;ve had the privilege of
          supporting.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((client, i) => (
          <motion.div
            key={client.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <ClientLogo name={client.name} slug={client.slug} />
          </motion.div>
        ))}
      </div>
    </ChapterSection>
  );
}
