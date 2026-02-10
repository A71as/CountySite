"use client";

import { useEffect, useState } from "react";

/**
 * Optional custom cursor: small red dot on desktop. Reinforces brand without hurting usability.
 * Only active when pointer is fine (mouse), hidden on touch and when user prefers reduced motion.
 */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [useCustom, setUseCustom] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !hasFinePointer) {
      setUseCustom(false);
      return;
    }
    setUseCustom(true);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [visible]);

  if (!useCustom) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <div
        className="h-2 w-2 rounded-full bg-[#E92128]"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.5)" }}
      />
    </div>
  );
}
