"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 90, damping: 20, mass: 0.9 } as const;

/** A hairline that draws itself from the left the first time it is seen. */
export function Rule({ className, delay = 0, accent = false }: { className?: string; delay?: number; accent?: boolean }) {
  const reduced = useReducedMotion();
  const style = {
    display: "block",
    height: accent ? 2 : 1,
    background: accent ? "linear-gradient(90deg, var(--blue), var(--gold))" : "var(--border-strong)",
    transformOrigin: "0 50%",
  } as const;
  if (reduced) return <span className={className} style={style} aria-hidden="true" />;
  return (
    <motion.span
      className={className}
      style={style}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    />
  );
}

/**
 * Text that rises from behind its own baseline, one line at a time. Each child
 * of `lines` is one masked line.
 */
export function RiseLines({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
          {reduced ? (
            <span style={{ display: "block" }}>{line}</span>
          ) : (
            <motion.span
              style={{ display: "block" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ ...spring, delay: delay + i * 0.09 }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

/** A section heading with a serif index number and a rule that draws in. */
export function SectionHead({ index, kicker, title, id, aside }: { index: string; kicker: string; title: string; id: string; aside?: ReactNode }) {
  return (
    <div className="section-head-x">
      <div className="section-head-x__top">
        <span className="section-index">{index}</span>
        <span className="kicker">{kicker}</span>
        {aside ? <span className="section-aside">{aside}</span> : null}
      </div>
      <Rule className="section-rule" />
      <h2 id={id} className="section-title">
        {title}
      </h2>
    </div>
  );
}
