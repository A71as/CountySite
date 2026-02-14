import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

const DEFAULT_FADE_HEIGHT = "clamp(96px, 12vh, 180px)";

export type FadeStop = { color: string; at: string };

export interface FadeConfig {
  from: string;
  to: string;
  height?: string;
  stops?: FadeStop[];
  /** e.g. "multiply" for darkening-into-footer fades; omit for pattern reveals */
  blendMode?: React.CSSProperties["mixBlendMode"];
}

function getFadeBackground(fade: FadeConfig): string {
  if (fade.stops?.length) {
    const stopsStr = fade.stops.map((s) => `${s.color} ${s.at}`).join(", ");
    return `linear-gradient(to bottom, ${stopsStr})`;
  }
  return `linear-gradient(to bottom, ${fade.from}, ${fade.to})`;
}

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: "default" | "cream" | "white" | "blush" | "lightPink" | "dark" | "navy" | "primary" | "accent" | "transparent";
  animated?: boolean;
  /** When true, children render full width with no inner max-w container */
  fullBleed?: boolean;
  topFade?: FadeConfig;
  bottomFade?: FadeConfig;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      className,
      id,
      background = "default",
      animated = true,
      fullBleed = false,
      topFade,
      bottomFade,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const backgroundVariants: Record<string, string> = {
      default: "bg-lightPink",
      cream: "bg-cream",
      white: "bg-white",
      blush: "bg-blush",
      lightPink: "bg-lightPink",
      dark: "bg-[#1C0A0C] text-white relative",
      navy: "bg-navy text-white",
      primary: "bg-primary-500 text-white",
      accent: "bg-accent-400 text-slate-900",
      transparent: "bg-transparent",
    };

    const hasPaperTexture = ["default", "cream", "white", "blush", "lightPink"].includes(background);

    const topH = topFade?.height ?? DEFAULT_FADE_HEIGHT;
    const bottomH = bottomFade?.height ?? DEFAULT_FADE_HEIGHT;

    const content = fullBleed ? (
      <div className="relative z-20">{children}</div>
    ) : (
      <div className="relative z-20 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    );

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "w-full py-16 md:py-24 relative",
          backgroundVariants[background],
          className
        )}
        style={{
          scrollMarginTop: "var(--anchor-offset)",
          ...style,
        }}
        {...props}
      >
        {hasPaperTexture && (
          <div className="section-paper-texture" aria-hidden="true" />
        )}
        {/* Stronger grain on pink/red for risograph feel */}
        {(background === "lightPink" || background === "primary") && (
          <div className="grain-overlay-colored" aria-hidden="true" />
        )}
        {topFade && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 z-10"
            style={{
              height: topH,
              background: getFadeBackground(topFade),
              transform: "translateZ(0)",
              ...(topFade.blendMode && { mixBlendMode: topFade.blendMode }),
            }}
          />
        )}
        {bottomFade && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
            style={{
              height: bottomH,
              background: getFadeBackground(bottomFade),
              transform: "translateZ(0)",
              ...(bottomFade.blendMode && { mixBlendMode: bottomFade.blendMode }),
            }}
          />
        )}
        {background === "dark" && (
          <div
            className="absolute top-0 left-0 right-0 h-2 bg-primary-500 z-10 organic-bar-top"
            aria-hidden="true"
          />
        )}
        {animated ? (
          <AnimatedSection>{content}</AnimatedSection>
        ) : (
          content
        )}
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper };
