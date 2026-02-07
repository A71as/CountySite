"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "@/hooks/useCountdown";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [electionDate, setElectionDate] = useState<Date | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Get election date from environment variable
  useEffect(() => {
    const dateString = process.env.NEXT_PUBLIC_ELECTION_DATE;
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        setElectionDate(date);
      }
    }
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
      className="fixed top-0 left-0 right-0 z-50 bg-primary-600 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          {/* Countdown - hidden on mobile, shown on desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">
              Election Day: {formatCountdown()}
            </span>
          </div>

          {/* Mobile: Just show icon and text */}
          <div className="flex items-center gap-2 sm:hidden">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">
              {countdown.isExpired
                ? "Election Day is here!"
                : `${countdown.days}d ${countdown.hours}h`}
            </span>
          </div>

          {/* Volunteer link - hidden on mobile, shown on desktop */}
          <Link
            href="/volunteer"
            className="hidden text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-80 sm:block"
          >
            Get involved
          </Link>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="ml-auto flex-shrink-0 rounded-md p-1 transition-colors hover:bg-primary-700/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            aria-label="Dismiss announcement"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
