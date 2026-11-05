"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * `index` staggers siblings by 45 ms. With reduced motion, content is simply there.
 */
export function Reveal({ children, index = 0, className, as = "div" }: { children: ReactNode; index?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const reduced = useReducedMotion();
  const M = motion[as];
  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.8, delay: Math.min(index, 8) * 0.045 }}
    >
      {children}
    </M>
  );
}
