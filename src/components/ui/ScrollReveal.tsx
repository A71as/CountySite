"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Target } from "framer-motion";
import { type ReactNode } from "react";

/** Viewport: once visible, stay; small margin so animation starts just before in view */
const defaultViewport = { once: true, margin: "-60px 0px" };

/** Section header: fade-in + 20px up, 400ms ease-out */
export const headerReveal = {
  initial: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/** Card stagger: from bottom with slight scale */
export const cardReveal = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/** Photo: gentle scale 1.02 → 1 */
export const photoReveal = {
  initial: { opacity: 0.7, scale: 1.02 },
  visible: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

/** Map: rotate -3deg → 0 + fade */
export const mapReveal = {
  initial: { opacity: 0, rotate: -3 },
  visible: { opacity: 1, rotate: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

/** Pop-in (e.g. donation buttons) */
export const popReveal = {
  initial: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

/** Endorsement from left */
export const fromLeftReveal = {
  initial: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/** Endorsement from right */
export const fromRightReveal = {
  initial: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/** Shape shared by presets and custom — compatible with motion initial/whileInView */
type RevealConfig = {
  initial: Target;
  visible: Target;
  transition?: { duration: number; ease?: string };
};

export interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants"> {
  children: ReactNode;
  /** Preset: header | card | photo | map | pop | fromLeft | fromRight */
  variant?: "header" | "card" | "photo" | "map" | "pop" | "fromLeft" | "fromRight";
  /** Custom initial/visible/transition; overrides variant when set */
  custom?: RevealConfig;
  viewport?: { once?: boolean; margin?: string; amount?: number };
}

const presets: Record<string, RevealConfig> = {
  header: headerReveal,
  card: cardReveal,
  photo: photoReveal,
  map: mapReveal,
  pop: popReveal,
  fromLeft: fromLeftReveal,
  fromRight: fromRightReveal,
};

/**
 * Scroll-triggered reveal. Respects prefers-reduced-motion (no animation when set).
 */
export function ScrollReveal({
  children,
  variant = "header",
  custom,
  viewport = defaultViewport,
  ...rest
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const config = custom ?? presets[variant];

  const initial = reduceMotion ? config.visible : config.initial;
  const whileInView = reduceMotion ? undefined : config.visible;
  const transition = reduceMotion ? { duration: 0 } : config.transition;

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
