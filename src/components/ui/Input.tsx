import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorMessage?: string;
  /** "hero" = rounded corners, 1.5px black border, focus pink (for hero form card) */
  inputVariant?: "default" | "hero";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", label, error, errorMessage, id, inputVariant = "default", ...props },
    ref
  ) => {
    // Always call useId hook unconditionally
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const hasError = error || errorMessage;
    const isHero = inputVariant === "hero";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-subhead font-bold text-foreground mb-1.5 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className={cn(isHero ? "input-hero-wrap" : "input-wavy-bottom")}>
          <input
            type={type}
            id={inputId}
            ref={ref}
            aria-required={props.required ? "true" : undefined}
            className={cn(
              "flex h-11 w-full px-4 py-2 text-sm font-body transition-all duration-200",
              "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-slate-400 placeholder:italic",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isHero
                ? cn(
                    "rounded-[11px] border-[1.5px] border-black bg-white focus:bg-[#FFAEAE] focus:outline-none focus:border-black",
                    hasError && "border-red-500"
                  )
                : cn(
                    "border border-b-0 border-primary-200/70 bg-primary-50/40 rounded-t organic-input rounded-b-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:bg-white focus-visible:border-primary-300",
                    "hover:bg-white",
                    hasError && "border-error/70 focus-visible:ring-error"
                  ),
              className
            )}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm font-medium text-error"
            role="alert"
          >
            {errorMessage || error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
