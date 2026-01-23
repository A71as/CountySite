"use client";

import { LoadingAnimation } from "@/components/LoadingAnimation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingAnimation />
      {children}
    </>
  );
}
