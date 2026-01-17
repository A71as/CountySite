"use client";

import { useState, useEffect } from "react";

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Custom hook for countdown timer
 * @param targetDate - The target date to count down to
 * @returns Object with days, hours, minutes, seconds, and isExpired flag
 */
export function useCountdown(targetDate: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() => {
    return calculateTimeLeft(targetDate);
  });

  useEffect(() => {
    // Calculate initial time left
    const initialTime = calculateTimeLeft(targetDate);
    setTimeLeft(initialTime);

    // If already expired, don't set up interval
    if (initialTime.isExpired) {
      return;
    }

    // Set up interval to update every second
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(targetDate);
      setTimeLeft(newTime);

      // Clear interval if countdown has expired
      if (newTime.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup interval on unmount or when targetDate changes
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

/**
 * Calculates the time difference between now and target date
 */
function calculateTimeLeft(targetDate: Date): CountdownResult {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  // If target date has passed, return expired state
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}
