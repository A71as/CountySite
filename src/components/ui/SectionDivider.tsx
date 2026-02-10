"use client";

import { cn } from "@/lib/utils";

export type DividerVariant = "wavy" | "torn" | "brush";

export interface SectionDividerProps {
  /** Wavy (default), torn, or brush. Default cycles by index. */
  variant?: DividerVariant;
  /** Optional index (0-based); used to pick variant if variant not set. */
  index?: number;
}

const VARIANTS: DividerVariant[] = ["wavy", "torn", "brush"];

function getVariant(variant?: DividerVariant, index?: number): DividerVariant {
  if (variant) return variant;
  const i = index ?? 0;
  return VARIANTS[i % VARIANTS.length];
}

/** Full-width wavy path — gentle hand-torn paper edge (not ocean waves) */
function WavyDividerLine({ className }: { className?: string }) {
  const d =
    "M0,14 Q120,8 240,16 Q360,10 480,14 Q600,20 720,12 Q840,18 960,14 Q1080,10 1200,14";
  return (
    <svg
      viewBox="0 0 1200 28"
      className={cn("w-full h-7 flex-shrink-0", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-300"
      />
    </svg>
  );
}

/** Full-width irregular/torn edge — jagged hand-torn feel */
function TornDividerLine({ className }: { className?: string }) {
  const d =
    "M0,14 L90,10 L180,16 L270,12 L360,18 L450,11 L540,15 L630,10 L720,16 L810,12 L900,14 L990,11 L1080,16 L1200,14";
  return (
    <svg
      viewBox="0 0 1200 28"
      className={cn("w-full h-7 flex-shrink-0", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-300"
      />
    </svg>
  );
}

/** Full-width soft brush squiggle */
function BrushDividerLine({ className }: { className?: string }) {
  const d =
    "M0,14 Q200,8 400,16 Q600,10 800,14 Q1000,20 1200,14";
  return (
    <svg
      viewBox="0 0 1200 28"
      className={cn("w-full h-7 flex-shrink-0", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-400/80"
      />
    </svg>
  );
}

/**
 * Section divider between major page sections.
 * Full-width wavy / hand-torn / brush SVG paths (no straight lines). Center speech bubble with hover wiggle.
 */
export function SectionDivider({ variant: variantProp, index }: SectionDividerProps) {
  const variant = getVariant(variantProp, index);

  const renderWavyLine = () => {
    switch (variant) {
      case "torn":
        return <TornDividerLine />;
      case "brush":
        return <BrushDividerLine />;
      default:
        return <WavyDividerLine />;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center py-8 md:py-10 px-4 w-full"
      aria-hidden="true"
    >
      {renderWavyLine()}
    </div>
  );
}
