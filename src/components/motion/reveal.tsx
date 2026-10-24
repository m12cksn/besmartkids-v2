"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
