"use client";

import { useState, useEffect, useCallback } from "react";
import { DonateModal } from "@/components/sections/DonateModal";

const SESSION_KEY = "donate-modal-shown";
const DELAY_MS = 45000; // 45 seconds before first timed show
const EXIT_INTENT_THRESHOLD = 10; // mouse Y < this near top = exit intent

/**
 * Shows DonateModal once per session via:
 * - Timed: 45s after first page load
 * - Exit-intent: mouse leaving viewport toward top (e.g. to close tab)
 */
export function DonationModalTrigger() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const showModal = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const shown = sessionStorage.getItem(SESSION_KEY);
      if (shown === "true") return;
      sessionStorage.setItem(SESSION_KEY, "true");
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleTimedShow = () => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "true") return;
      } catch {
        // ignore
      }
      timer = setTimeout(showModal, DELAY_MS);
    };

    const handleExitIntent = (e: MouseEvent) => {
      // Exit intent: cursor leaves viewport at top (user may be closing tab or moving to address bar)
      if (e.clientY <= EXIT_INTENT_THRESHOLD) {
        showModal();
      }
    };

    handleTimedShow();
    document.addEventListener("mouseout", handleExitIntent);

    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [mounted, showModal]);

  const handleClose = useCallback(() => setOpen(false), []);

  return <DonateModal open={open} onClose={handleClose} />;
}
