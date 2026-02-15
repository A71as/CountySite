"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "@/hooks/useCountdown";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [electionDate] = useState<Date | null>(() => {
    const dateString = process.env.NEXT_PUBLIC_ELECTION_DATE;
    if (dateString) {
      const normalized = dateString.trim();
      const iso = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
        ? `${normalized}T10:00:00.000Z`
        : normalized;
      const date = new Date(iso);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return new Date("2026-06-02T10:00:00.000Z");
  });
  const barRef = useRef<HTMLDivElement | null>(null);

  // Always call hook - use a far future date as fallback to avoid errors
  const defaultDate = new Date("2099-12-31");
  const countdown = useCountdown(electionDate || defaultDate);

  // Update CSS variable for layout offset before paint
  useLayoutEffect(() => {
    const root = document.documentElement;

    if (isDismissed || !electionDate) {
      root.style.setProperty("--announcement-height", "0px");
      return;
    }

    const updateHeight = () => {
      const height = barRef.current?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--announcement-height", `${height}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isDismissed, electionDate]);

  // Don't render if dismissed or no election date
  if (isDismissed || !electionDate) {
    return null;
  }

  // Format countdown display
  const formatCountdown = () => {
    if (countdown.isExpired) {
      return "Election Day is here!";
    }
    return `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`;
  };

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 text-white"
      style={{ backgroundColor: "#E92128" }}
    >
      <div className="mx-auto max-w-[1200px] px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 md:px-6 lg:px-8 min-w-0 min-h-[40px] md:min-h-[48px] flex items-center announcement-bar-inner">
        <div className="flex items-center justify-between gap-2 min-w-0 w-full">
          {/* Countdown — smaller on small screens */}
          <div className="min-w-0 flex-1 flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2">
            {countdown.isExpired ? (
              <span className="text-xl md:text-2xl font-subhead font-bold uppercase tracking-[0.08em] countdown-pulse">
                Election Day is here!
              </span>
            ) : (
              <>
                <span className="sm:hidden text-xl font-subhead font-bold uppercase tracking-[0.08em] countdown-pulse">
                  Election Day: {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </span>
                <span className="hidden sm:inline text-xl md:text-2xl font-subhead font-bold uppercase tracking-[0.08em] countdown-pulse">
                  Election Day: {formatCountdown()}
                </span>
              </>
            )}
          </div>

          {/* CTA link — tappable, readable */}
          <Link
            href="/volunteer"
            className="accent-callout flex-shrink-0 text-sm md:text-base font-accent font-medium underline underline-offset-2 transition-opacity hover:opacity-80 whitespace-nowrap py-1.5 md:py-2 min-h-[40px] md:min-h-[46px] inline-flex items-center"
          >
            Join the movement
          </Link>

          {/* Dismiss — touch target */}
          <button
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 organic-sm min-h-[40px] min-w-[40px] md:min-h-[46px] md:min-w-[46px] flex items-center justify-center p-2 transition-colors hover:bg-primary-700/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 touch-manipulation"
            aria-label="Dismiss announcement"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
