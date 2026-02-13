"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_FADE_HEIGHT = "clamp(96px, 12vh, 180px)";

export type FadeStop = { color: string; at: string };

export type Fade = {
  from: string;
  to: string;
  height?: string;
  stops?: FadeStop[];
  /** e.g. "multiply" for darkening-into-footer fades; omit for pattern reveals */
  blendMode?: React.CSSProperties["mixBlendMode"];
};

function getFadeBackground(fade: Fade): string {
  if (fade.stops?.length) {
    const stopsStr = fade.stops.map((s) => `${s.color} ${s.at}`).join(", ");
    return `linear-gradient(to bottom, ${stopsStr})`;
  }
  return `linear-gradient(to bottom, ${fade.from}, ${fade.to})`;
}

export type SectionProps = React.PropsWithChildren<
  Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
    id?: string;
    className?: string;
    innerClassName?: string;
    topFade?: Fade;
    bottomFade?: Fade;
  }
>;

/**
 * Section wrapper with optional top/bottom gradient overlays for elegant
 * transitions between sections (no thick fog bands or hard seams).
 */
export function Section({
  id,
  className,
  innerClassName,
  topFade,
  bottomFade,
  children,
  style,
  ...rest
}: SectionProps) {
  const topH = topFade?.height ?? DEFAULT_FADE_HEIGHT;
  const bottomH = bottomFade?.height ?? DEFAULT_FADE_HEIGHT;

  return (
    <section id={id} className={cn("relative", className)} style={style} {...rest}>
      {topFade ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: topH,
            background: getFadeBackground(topFade),
            transform: "translateZ(0)",
            ...(topFade.blendMode && { mixBlendMode: topFade.blendMode }),
          }}
        />
      ) : null}

      <div className={cn("relative z-0", innerClassName)}>{children}</div>

      {bottomFade ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: bottomH,
            background: getFadeBackground(bottomFade),
            transform: "translateZ(0)",
            ...(bottomFade.blendMode && { mixBlendMode: bottomFade.blendMode }),
          }}
        />
      ) : null}
    </section>
  );
}
