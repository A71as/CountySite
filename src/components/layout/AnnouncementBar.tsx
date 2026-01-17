"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "@/hooks/useCountdown";

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [electionDate, setElectionDate] = useState<Date | null>(null);

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
    <div className="relative bg-accent-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          {/* Countdown - hidden on mobile, shown on desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-lg">🗳️</span>
            <span className="text-sm font-medium sm:text-base">
              Election Day: {formatCountdown()}
            </span>
          </div>

          {/* Mobile: Just show emoji and text */}
          <div className="flex items-center gap-2 sm:hidden">
            <span className="text-lg">🗳️</span>
            <span className="text-sm font-medium">
              {countdown.isExpired
                ? "Election Day is here!"
                : `${countdown.days}d ${countdown.hours}h`}
            </span>
          </div>

          {/* Volunteer link - hidden on mobile, shown on desktop */}
          <Link
            href="#volunteer"
            className="hidden text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-80 sm:block"
          >
            Join the campaign today
          </Link>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="ml-auto flex-shrink-0 rounded-md p-1 transition-colors hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent-600"
            aria-label="Dismiss announcement"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
