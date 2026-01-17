"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error("Application error:", error);

    // In production, you could send error to an error reporting service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-lg border border-error/20 bg-error/5 p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mb-2 font-heading text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>
        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Please try again or contact us if the problem
          persists.
        </p>
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              Error details (development only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs text-gray-800">
              {error.message}
              {error.stack && `\n${error.stack}`}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="primary" size="md">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="secondary"
            size="md"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
