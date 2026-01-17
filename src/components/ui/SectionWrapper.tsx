import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: "default" | "cream" | "navy" | "primary" | "accent";
  animated?: boolean;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    { className, id, background = "default", animated = true, children, ...props },
    ref
  ) => {
    const backgroundVariants = {
      default: "bg-white",
      cream: "bg-cream",
      navy: "bg-navy text-white",
      primary: "bg-primary-500 text-white",
      accent: "bg-accent-500 text-white",
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
