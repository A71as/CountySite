"use client";

import { cn } from "@/lib/utils";

const STROKE_BY_VARIANT = {
  default: "rgba(233,33,40,0.35)",
  light: "rgba(255,255,255,0.3)",
} as const;

/**
 * Single reusable hand-drawn line for section boundaries and header underlines.
 * Slight organic wobble; placed inside section padding—never as a thick bar.
 */
export function HandDrawnDivider({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <svg
      aria-hidden
      className={cn("w-full h-6", className)}
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
    >
      <path
        d="M0,12 C120,10 240,14 360,12 C480,10 600,14 720,12 C840,10 960,14 1080,12 C1140,11 1170,13 1200,12"
        fill="none"
        stroke={STROKE_BY_VARIANT[variant]}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
