"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HandDrawnDivider } from "./HandDrawnDivider";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  note?: string;
  className?: string;
  /** When false, render static (no Framer Motion). Default true. */
  animate?: boolean;
  /** "light" for white text + light divider on dark (e.g. red) backgrounds. Default "default". */
  variant?: "default" | "light";
  /** Optional extra class(es) on the title h2 (e.g. meet-david-underline for custom underline layout). */
  titleClassName?: string;
  /** When false, hide the hand-drawn divider below the title. Default true. */
  showDivider?: boolean;
}

/**
 * Shared section header: eyebrow → title → hand-drawn underline → optional note.
 * Animates on scroll when animate=true; respects prefers-reduced-motion.
 * Eyebrow/title classes match Commissioner + Issues for visual parity.
 */
export function SectionHeader({
  eyebrow,
  title,
  note,
  className,
  animate = true,
  variant = "default",
  titleClassName,
  showDivider = true,
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;
  const isLight = variant === "light";

  const eyebrowClass = isLight
    ? "uppercase text-base sm:text-lg tracking-[0.2em] text-white font-subhead font-bold mb-6"
    : "uppercase text-base sm:text-lg tracking-[0.2em] text-primary-500 font-subhead font-bold mb-6";

  const titleClass = cn(
    isLight
      ? "font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight"
      : "font-display text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight",
    titleClassName
  );

  const content = (
    <>
      {eyebrow ? (
        <div className={eyebrowClass}>
          {eyebrow}
        </div>
      ) : null}

      <div className={cn("flex items-end justify-between gap-6", eyebrow && "mt-0")}>
        <h2 className={titleClass}>
          {title}
        </h2>

        {note ? (
          <div className={cn("font-accent -rotate-2 text-2xl shrink-0", isLight ? "text-white/90" : "text-primary-500")}>
            {note}
          </div>
        ) : null}
      </div>

      {showDivider ? (
        <div className="mt-3">
          <HandDrawnDivider variant={isLight ? "light" : "default"} />
        </div>
      ) : null}
    </>
  );

  if (shouldAnimate) {
    return (
      <motion.header
        className={cn("max-w-5xl", className)}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {content}
      </motion.header>
    );
  }

  return (
    <header className={cn("max-w-5xl", className)}>
      {content}
    </header>
  );
}
