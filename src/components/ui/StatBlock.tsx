"use client";

import { motion } from "framer-motion";

export function StatBlock({
  value,
  label,
  index = 0,
}: {
  value: string;
  label: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="border-l border-primary/20 pl-5"
    >
      <div className="font-heading text-4xl font-semibold text-gradient sm:text-5xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-plum/70">{label}</div>
    </motion.div>
  );
}
