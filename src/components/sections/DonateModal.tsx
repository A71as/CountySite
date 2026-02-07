"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DONATION_AMOUNTS, buildActBlueUrl } from "@/config/donate";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

export function DonateModal({ open, onClose }: DonateModalProps) {
  // Accessibility: Escape to close + focus trap
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap within modal
      if (event.key === "Tab") {
        const modal = document.getElementById("donate-modal");
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C0A0C]/50 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
          onClick={onClose}
        >
          <motion.div
            id="donate-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Support the campaign with a donation"
            className="relative w-full max-w-lg rounded-sm bg-white p-6 shadow-elevated sm:p-8"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Close donation pop-up"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="space-y-5">
              <div className="uppercase text-xs tracking-[0.2em] text-primary-500 font-semibold">
                Quick Donate
              </div>
              <h2 className="font-heading text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                They have the money. We have each other.
              </h2>
              <p className="text-sm text-slate-600">
                Every dollar helps us knock more doors, talk to more neighbors,
                and hold Hudson County government accountable. Chip in now.
              </p>

              {/* Amount buttons */}
              <div className="grid grid-cols-3 gap-3">
                {DONATION_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    href={buildActBlueUrl(amount)}
                    external
                    variant="secondary"
                    size="sm"
                    className="w-full font-heading text-base"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Primary CTA */}
              <Button
                href={buildActBlueUrl()}
                external
                variant="primary"
                size="md"
                className="w-full"
              >
                Give another amount
              </Button>

              <p className="text-[11px] leading-relaxed text-slate-500">
                Contributions are not tax deductible. By donating, you confirm
                that you are a U.S. citizen or lawfully admitted permanent
                resident and that this contribution is made from your own funds.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

