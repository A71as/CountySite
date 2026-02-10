import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: "default" | "cream" | "white" | "blush" | "lightPink" | "dark" | "navy" | "primary" | "accent";
  animated?: boolean;
  /** When true, children render full width with no inner max-w container */
  fullBleed?: boolean;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      className,
      id,
      background = "default",
      animated = true,
      fullBleed = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const backgroundVariants = {
      default: "bg-lightPink",
      cream: "bg-cream",
      white: "bg-white",
      blush: "bg-blush",
      lightPink: "bg-lightPink",
      dark: "bg-[#1C0A0C] text-white relative",
      navy: "bg-navy text-white",
      primary: "bg-primary-500 text-white",
      accent: "bg-accent-400 text-slate-900",
    };

    const hasPaperTexture = ["default", "cream", "white", "blush", "lightPink"].includes(background);

    const content = fullBleed ? (
      <>{children}</>
    ) : (
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
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
          scrollMarginTop: "calc(var(--announcement-height, 0px) + 4rem)",
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
