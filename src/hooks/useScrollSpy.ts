"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for scroll spy functionality
 * Tracks which section is currently in view based on scroll position
 * @param sectionIds - Array of section IDs to observe
 * @param threshold - Intersection threshold (0-1), default 0.5
 * @returns The currently active section ID, or null if none are active
 */
export function useScrollSpy(
  sectionIds: string[],
  threshold: number = 0.5
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't create observer if no sections provided
    if (sectionIds.length === 0) {
      setActiveSection(null);
      return;
    }

    // Create new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Update the map with latest intersection data
        entries.forEach((entry) => {
          if (entry.target.id) {
            sectionsRef.current.set(entry.target.id, entry);
          }
        });

        // Find the section with highest intersection ratio
        let maxRatio = 0;
        let activeId: string | null = null;

        sectionsRef.current.forEach((entry, id) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = id;
          }
        });

        // Only set active if intersection ratio meets threshold
        if (maxRatio >= threshold && activeId) {
          setActiveSection(activeId);
        } else if (maxRatio < threshold) {
          // If no section meets threshold, find the one closest to viewport top
          const sortedSections = Array.from(sectionsRef.current.entries())
            .filter(([_, entry]) => entry.isIntersecting)
            .sort(([_, a], [__, b]) => {
              const aTop = a.boundingClientRect.top;
              const bTop = b.boundingClientRect.top;
              return Math.abs(aTop) - Math.abs(bTop);
            });

          if (sortedSections.length > 0) {
            setActiveSection(sortedSections[0][0]);
          }
        }
      },
      {
        threshold: [0, threshold, 1],
        rootMargin: "-20% 0px -20% 0px", // Only consider section active when it's in the middle 60% of viewport
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      sectionsRef.current.clear();
    };
  }, [sectionIds, threshold]);

  return activeSection;
}
