import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", label, error, errorMessage, id, ...props },
    ref
  ) => {
    // Always call useId hook unconditionally
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const hasError = error || errorMessage;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            "hover:border-primary-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError &&
              "border-error focus-visible:ring-error hover:border-error",
            className
          )}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-error"
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
