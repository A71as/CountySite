"use client";

import { useId } from "react";

interface DavidLogoProps {
  /** Red bubble for light backgrounds, white bubble for dark/red backgrounds */
  variant?: "red" | "white";
  className?: string;
}

/* Speech bubble path — rounded rectangle body + tail at bottom-left */
const BUBBLE_PATH =
  "M20,5 h260 a15,15 0 0 1 15,15 v47 a15,15 0 0 1 -15,15 h-208 l-16,23 l-10,-23 h-26 a15,15 0 0 1 -15,-15 v-47 a15,15 0 0 1 15,-15 z";

export function DavidLogo({ variant = "red", className }: DavidLogoProps) {
  const uid = useId();
  const isRed = variant === "red";

  const bubbleFill = isRed ? "#E92128" : "white";
  const textFill = isRed ? "white" : "#1C1917";
  const shadowFill = isRed ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.12)";
  const hatchStroke = isRed ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.04)";

  return (
    <svg
      viewBox="0 0 300 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="DAVID! for Hudson County Commissioner"
    >
      <defs>
        {/* Crosshatch diamond-grid texture */}
        <pattern
          id={`${uid}-hatch`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0" y1="0" x2="10" y2="10"
            stroke={hatchStroke}
            strokeWidth="0.7"
          />
          <line
            x1="10" y1="0" x2="0" y2="10"
            stroke={hatchStroke}
            strokeWidth="0.7"
          />
        </pattern>
        <clipPath id={`${uid}-clip`}>
          <path d={BUBBLE_PATH} />
        </clipPath>
      </defs>

      {/* Bubble shape with thick border */}
      <path
        d={BUBBLE_PATH}
        fill={bubbleFill}
        stroke="#1C1917"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Crosshatch texture inside bubble */}
      <rect
        x="0"
        y="0"
        width="300"
        height="110"
        fill={`url(#${uid}-hatch)`}
        clipPath={`url(#${uid}-clip)`}
      />

      {/* 3D shadow text (offset 3px right, 3px down) */}
      <text
        x="153"
        y="63"
        textAnchor="middle"
        style={{
          fontFamily:
            "var(--font-display), 'Bebas Neue', Impact, 'Arial Black', sans-serif",
        }}
        fontSize="56"
        letterSpacing="3"
        fill={shadowFill}
      >
        DAVID!
      </text>

      {/* Main DAVID! text — stroke drawn behind fill via paintOrder */}
      <text
        x="150"
        y="60"
        textAnchor="middle"
        style={{
          fontFamily:
            "var(--font-display), 'Bebas Neue', Impact, 'Arial Black', sans-serif",
        }}
        fontSize="56"
        letterSpacing="3"
        fill={textFill}
        stroke={isRed ? "#1C1917" : "none"}
        strokeWidth={isRed ? "1.5" : "0"}
        paintOrder="stroke"
      >
        DAVID!
      </text>
    </svg>
  );
}
