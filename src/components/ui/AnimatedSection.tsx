"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Lightweight scroll-triggered fade-up using IntersectionObserver.
 * Trigger at 15% visibility, once; 400ms ease-out, 20px travel.
 * Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px", threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const visible = isVisible || reduceMotion;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[400ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
      style={{ transitionDelay: visible ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
}
