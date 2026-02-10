"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      padding = "md",
      shadow = "md",
      hover = false,
      children,
      // Exclude event handlers that conflict with Framer Motion
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...props
    },
    ref
  ) => {
    const paddingVariants = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const shadowVariants = {
      none: "",
      sm: "block-shadow-sm",
      md: "block-shadow",
      lg: "block-shadow-md",
    };

    const baseClasses = cn(
      "organic-card-1 border-2 border-black bg-white tilt-1",
      paddingVariants[padding],
      shadowVariants[shadow],
      hover &&
        "transition-all duration-200 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] active:scale-[0.99]",
      className
    );

    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={baseClasses}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
