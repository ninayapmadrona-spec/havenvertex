"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-body text-sm font-semibold tracking-wide transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:shadow-glow-lg hover:brightness-110"
      : "border border-primary/30 text-primary bg-white/40 backdrop-blur hover:bg-white/70";

  const content = (
    <motion.span
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
