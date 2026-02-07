import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: "default" | "cream" | "white" | "blush" | "dark" | "navy" | "primary" | "accent";
  animated?: boolean;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      className,
      id,
      background = "default",
      animated = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const backgroundVariants = {
      default: "bg-cream",
      cream: "bg-cream",
      white: "bg-white",
      blush: "bg-cream",
      dark: "bg-[#1C0A0C] text-white border-t-[3px] border-t-primary-500",
      navy: "bg-navy text-white",
      primary: "bg-primary-500 text-white",
      accent: "bg-accent-400 text-slate-900",
    };

    const content = (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    );

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "w-full py-16 md:py-24",
          backgroundVariants[background],
          className
        )}
        style={{
          scrollMarginTop: "calc(var(--announcement-height, 0px) + 4rem)",
          ...style,
        }}
        {...props}
      >
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
