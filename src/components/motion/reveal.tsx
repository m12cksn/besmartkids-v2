"use client";

import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    // Prefer no motion until the browser preference is known.
    () => true,
  );
  return (
    <motion.div
      data-motion-reveal
      className={className}
      initial={false}
      animate={
        reduceMotion ? { opacity: 1 } : { opacity: [0.85, 1], y: [6, 0] }
      }
      transition={{ duration: reduceMotion ? 0 : 0.2, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
