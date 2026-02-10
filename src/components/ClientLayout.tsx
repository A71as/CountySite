"use client";

import dynamic from "next/dynamic";

const DonationModalTrigger = dynamic(
  () => import("@/components/DonationModalTrigger").then((m) => m.DonationModalTrigger),
  { ssr: false }
);

/**
 * Global frame: full viewport poster border (6–8px solid black, ~2–3px radius),
 * fixed so it stays visible on scroll. Only rigid-edge element on the site.
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen box-border relative">
      <DonationModalTrigger />
      {children}
    </div>
  );
}
