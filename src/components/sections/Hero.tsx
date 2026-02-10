"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { SignupForm } from "@/components/forms/SignupForm";

const HERO_BIO =
  "David Sabry Guirgis is a social worker, organizer and democratic socialist running for Hudson County Commissioner to win for the working class.";

const DISTRICT_LABEL =
  "DISTRICT 4 · JOURNAL SQUARE · DOWNTOWN · THE HEIGHTS";

const CANDIDATE_IMAGE = "/images/candidate/no-bg1.png";

/** Photo area background: soft radial gradients + paper texture (no geometric rays) */
function HeroPhotoBackground() {
  return (
    <div className="hero-photo-bg-wrap" aria-hidden="true">
      <div className="hero-photo-bg-base" />
      <div className="hero-photo-bg-glow" />
      <div className="hero-photo-bg-texture" aria-hidden="true" />
    </div>
  );
}

export function Hero() {
  const cutoutRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const section = document.getElementById("home");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      const scrolled = Math.min(Math.max(-rect.top / viewportHeight, 0), 1);
      setParallaxOffset(scrolled * 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-visible hero-splash-bg"
      aria-label="Hero"
    >
      {/* Paper grain overlay — subtle texture */}
      <div className="hero-grain-overlay section-paper-texture" aria-hidden="true" />

      {/* Two-column layout: left = sunburst + photo (contained), right = content; mobile: photo stacks above */}
      <div className="hero-grid">
        {/* LEFT COLUMN: Photo area (gradient bg + texture + right fade + photo), bottom mask */}
        <div className="hero-left-column order-1 lg:order-1">
          <div className="hero-photo-area">
            <HeroPhotoBackground />
            <div
              ref={cutoutRef}
              className="hero-cutout-wrapper"
              style={{ ["--parallax-y" as string]: `${parallaxOffset}px` }}
            >
              <div className="hero-cutout-shadow" aria-hidden="true" />
              <div className="hero-photo-duotone">
                <Image
                  src={CANDIDATE_IMAGE}
                  alt="David Sabry Guirgis, candidate for Hudson County Commissioner"
                  width={4050}
                  height={5400}
                  className="hero-cutout-image"
                  priority
                  sizes="(max-width: 1023px) 85vw, 42vw"
                />
              </div>
            </div>
            {/* Right edge: feathered fade so pink breathes into content area */}
            <div className="hero-photo-area-right-fade" aria-hidden="true" />
          </div>

          {/* Election date bubble — above David, tail points at him */}
          <div className="hero-election-bubble-wrapper">
            <div className="speech-bubble-election-callout speech-bubble-tail-at-david election-bubble-pop px-3 py-2 sm:px-4 sm:py-2.5">
              <p className="font-subhead font-bold text-black text-xs sm:text-sm uppercase tracking-tight whitespace-nowrap">
                ELECTION DAY IS ON JUNE 2, 2026
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Hierarchy — district → headline → annotation → form */}
        <div className="hero-right-column order-2 lg:order-2">
          <div className="hero-form-animate w-full">
            {/* 1. District identifier — Bernoru, small caps, #E92128, 12–14px, letter-spacing 2px */}
            <p className="hero-district-label">
              {DISTRICT_LABEL}
            </p>

            {/* 2. Main headline — Barber Chop, clamp 36–60px, black; identity phrase in red */}
            <h1 className="hero-headline">
              David Sabry Guirgis is a{" "}
              <span className="text-[#E92128]">social worker, organizer and democratic socialist</span>
              {" "}running for Hudson County Commissioner to win for the working class.
            </h1>

            {/* 3. Hand-written annotation — Homemade Apple, #E92128, -2deg, 22–26px */}
            <p className="hero-join-annotation">
              Join the movement.
            </p>

            {/* 4. Form — minimal spacing for natural next action */}
            <SignupForm
              variant="hero"
              submitLabel="COUNT ME IN"
              privacyVariant="short"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
