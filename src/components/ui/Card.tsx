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
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    };

    const baseClasses = cn(
      "rounded-lg border border-gray-200 bg-white",
      paddingVariants[padding],
      shadowVariants[shadow],
      hover && "transition-shadow hover:shadow-lg",
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
