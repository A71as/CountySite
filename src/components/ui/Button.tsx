import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
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
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md focus-visible:ring-primary-500 active:bg-primary-800",
      secondary:
        "border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-500 active:bg-slate-100",
      accent:
        "bg-accent-600 text-white shadow-sm hover:bg-accent-700 hover:shadow-md focus-visible:ring-accent-500 active:bg-accent-800",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
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
