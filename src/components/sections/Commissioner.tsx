"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BUDGET_MILLIONS } from "@/lib/constants/copy";

export function Commissioner() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";
  const [mapLightboxOpen, setMapLightboxOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMapLightboxOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (mapLightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mapLightboxOpen]);

  const services = [
    "Public parks & recreation",
    "County roads & bridges",
    "Community college (HCCC)",
    "County jail & corrections",
    "Social services",
    "Public health programs",
    "Economic development",
    "Environmental protection",
  ];

  // Slight random tilts for service cards
  const cardTilts = [
    "rotate-[0.3deg]",
    "-rotate-[0.5deg]",
    "rotate-[0.4deg]",
    "-rotate-[0.3deg]",
    "rotate-[0.6deg]",
    "-rotate-[0.4deg]",
    "rotate-[0.3deg]",
    "-rotate-[0.5deg]",
  ];

  return (
    <SectionWrapper id="commissioner" background="white" className="relative section-spacing-bottom commissioner-section-tighter-top">
      {/* Subtle texture only — no diamond pattern; Commissioner stays plain white */}
      <div className="absolute inset-0 texture-speckle pointer-events-none" aria-hidden="true" />

      {/* Section header — SectionHeader is the single animation source */}
      <div className="relative mb-16 max-w-5xl">
        <SectionHeader
          eyebrow="THE ROLE"
          title="What is a County Commissioner?"
        />
      </div>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column - Explanation */}
        <div className="space-y-8">
          {/* Main callout — speech bubble instead of red bar */}
          <div className="speech-bubble-accent px-6 py-5 tilt-2">
            <p className="text-lg text-slate-700 leading-relaxed">
              County Commissioners run the county government. In {county}{" "}
              County, they vote on a budget of over{" "}
              <span className="font-bold font-heading text-primary-600 bg-lightPink/60 px-1 py-0.5 rounded whitespace-nowrap text-xl">
                ${BUDGET_MILLIONS} million
              </span>{" "}
              and decide how your tax dollars are spent.
            </p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-lg font-body">
              They fund and oversee core public services, including:
            </p>

            {/* Service items as playful mini-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 bg-lightPink/20 organic-sm border border-primary-300 px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${cardTilts[index]}`}
                >
                  {/* Barber Chop–style bold red check */}
                  <div className="w-6 h-6 bg-primary-500 organic-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-subhead font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-lg">
              Think of a County Commissioner like a City Councilmember for the
              whole county. They pass local laws that affect housing, transit,
              parking, and public safety—and they decide how much each
              department gets.
            </p>

            <p className="text-lg">
              Yet most people don&apos;t know who their commissioner is or what
              they do. That&apos;s why <span className="font-bold text-primary-600 bg-lightPink/60 px-1 py-0.5 rounded">accountability matters</span>—and
              why this race matters.
            </p>
          </div>
        </div>

        {/* Right column - District Map (tappable on mobile for full-screen lightbox) */}
        <div className="space-y-6 min-w-0">
          <div className="text-xl sm:text-2xl tracking-[0.15em] text-primary-600 font-accent font-bold -rotate-[2deg] ml-2 mt-5">
            District 4
          </div>

          <ScrollReveal variant="map" className="relative w-full">
            <button
              type="button"
              onClick={() => setMapLightboxOpen(true)}
              className="relative w-full photo-frame-standard bg-slate-50 overflow-hidden text-left block min-h-[280px] sm:min-h-0 aspect-square focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-[inherit]"
              aria-label="View District 4 map (tap to expand)"
            >
              <iframe
                src="/arcgis-map.html"
                title="Map of Hudson County District 4"
                className="absolute inset-0 h-full w-full pointer-events-none sm:pointer-events-auto"
                loading="lazy"
                tabIndex={-1}
                aria-hidden="true"
              />
              <span className="absolute bottom-2 left-2 right-2 sm:hidden py-1.5 px-2 rounded bg-black/60 text-white text-xs font-subhead font-bold text-center">
                Tap to expand map
              </span>
            </button>
          </ScrollReveal>

          {mapLightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label="District 4 map (full screen)"
            >
              <button
                type="button"
                onClick={() => setMapLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close map"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="w-full max-w-2xl aspect-square max-h-[90vh] photo-frame-standard overflow-hidden bg-slate-50">
                <iframe
                  src="/arcgis-map.html"
                  title="Hudson County District 4 Map (full screen)"
                  className="absolute inset-0 h-full w-full"
                  aria-label="Hudson County District 4 map"
                />
              </div>
              <p className="mt-3 text-sm text-white/90">
                District 4 includes the Heights, Journal Square, McGinley Square, and the West Side.
              </p>
            </div>
          )}

          <p className="text-sm text-slate-600 break-words">
            District 4 includes the Heights, Journal Square, McGinley Square,
            and the West Side.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
