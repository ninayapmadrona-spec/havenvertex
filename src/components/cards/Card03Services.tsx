"use client";

import {
  BarChart3,
  Cog,
  HeartHandshake,
  Images,
  Laptop,
  Search,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/decor/AuroraBackground";
import { ChapterSection } from "@/components/layout/ChapterSection";
import { ChapterTag } from "@/components/ui/SectionKicker";
import { TiltCard } from "@/components/ui/TiltCard";
import { services } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  laptop: Laptop,
  search: Search,
  gallery: Images,
  heart: HeartHandshake,
  gears: Cog,
  chart: BarChart3,
};

export function Card03Services() {
  return (
    <ChapterSection id="services">
      <AuroraBackground variant="light" />

      <div className="mb-12 max-w-2xl">
        <ChapterTag index="03" label="Services" />
        <h2 className="mt-6 font-heading text-4xl font-medium leading-tight sm:text-5xl">
          Your Business.{" "}
          <span className="text-gradient font-semibold">
            Supported From Every Angle.
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-plum/75">
          From websites to systems, we take care of the details so you can
          focus on what you do best — growing your business.
        </p>
      </div>

      <div className="tilt-group grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <TiltCard className="h-full p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-2xl font-medium text-plum">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-plum/70">
                  {service.copy}
                </p>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </ChapterSection>
  );
}
