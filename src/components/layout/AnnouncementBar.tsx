"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "@/hooks/useCountdown";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [electionDate, setElectionDate] = useState<Date | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Election date: env or default June 2, 2026, 6:00 AM Eastern (NJ polls open)
  useEffect(() => {
    const dateString = process.env.NEXT_PUBLIC_ELECTION_DATE;
    if (dateString) {
      // If env is date-only (e.g. "2026-06-02"), append polls-open time (6 AM Eastern)
      const iso = /^\d{4}-\d{2}-\d{2}$/.test(dateString.trim())
        ? `${dateString.trim()}T10:00:00.000Z`
        : dateString;
      const date = new Date(iso);
      if (!isNaN(date.getTime())) {
        setElectionDate(date);
        return;
      }
    }
    setElectionDate(new Date("2026-06-02T10:00:00.000Z"));
  }, []);

  // Always call hook - use a far future date as fallback to avoid errors
  const defaultDate = new Date("2099-12-31");
  const countdown = useCountdown(electionDate || defaultDate);

  // Update CSS variable for layout offset
  useEffect(() => {
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
      <div className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          {/* Countdown — brand red, white text, no clock icon */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-sm font-medium countdown-pulse">
              Election Day: {formatCountdown()}
            </span>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 sm:hidden">
            <span className="text-sm font-medium countdown-pulse">
              {countdown.isExpired
                ? "Election Day is here!"
                : `${countdown.days}d ${countdown.hours}h`}
            </span>
          </div>

          {/* CTA link - warmer, more inviting */}
          <Link
            href="/volunteer"
            className="accent-callout hidden text-sm font-accent font-medium underline underline-offset-2 transition-opacity hover:opacity-80 sm:inline-block"
          >
            Join the movement
          </Link>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="ml-auto flex-shrink-0 organic-sm p-1 transition-colors hover:bg-primary-700/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            aria-label="Dismiss announcement"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
