import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      href,
      external = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-display font-bold uppercase tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 block-shadow-sm block-shadow-press";

    const variants = {
      primary:
        "organic-md bg-[#E92128] text-white hover:bg-[#DC2626] focus-visible:ring-[#E92128] active:scale-[0.98] active:translate-y-0.5",
      secondary:
        "organic-md border-2 border-black bg-white text-black hover:bg-slate-50 focus-visible:ring-accent-500 active:scale-[0.98] active:translate-y-0.5",
      accent:
        "organic-md bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-500 active:scale-[0.98] active:translate-y-0.5",
    };

    const sizes = {
      sm: "min-h-[44px] h-auto py-2 px-3 text-sm",
      md: "min-h-[44px] h-auto py-2.5 px-5 text-base",
      lg: "min-h-[48px] h-auto py-3 px-6 text-lg",
      xl: "min-h-[52px] h-auto py-3.5 px-8 text-xl",
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className,
    );

    // If href is provided, render as link
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {children}
              </>
            ) : (
              children
            )}
          </a>
        );
      } else {
        return (
          <Link href={href} className={buttonClasses}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {children}
              </>
            ) : (
              children
            )}
          </Link>
        );
      }
    }

    // Render as button
    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
