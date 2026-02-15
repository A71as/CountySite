"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { SignupForm } from "@/components/forms/SignupForm";
import { Section } from "@/components/ui/Section";

const HERO_BIO =
  "David Sabry Guirgis is a social worker, organizer and democratic socialist running for Hudson County Commissioner to win for the working class.";

const DISTRICT_LABEL =
  "DISTRICT 4 · JOURNAL SQUARE · DOWNTOWN · THE HEIGHTS";

const CANDIDATE_IMAGE = "/images/candidate/DG Logos and Horizontals.png";

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
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#donate";

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
    <Section
      id="home"
      className="relative w-full overflow-visible hero-splash-bg pb-0"
      aria-label="Hero"
    >
      {/* Paper grain overlay — subtle texture */}
      <div className="hero-grain-overlay section-paper-texture" aria-hidden="true" />

      {/* Two-column layout: left = logo, right = content; mobile: content leads */}
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
              <Image
                src={CANDIDATE_IMAGE}
                alt="David Sabry Guirgis campaign logo"
                width={2400}
                height={800}
                className="hero-cutout-image hero-logo-image"
                priority
                quality={100}
                sizes="(max-width: 1023px) 90vw, 42vw"
              />
            </div>
            <div className="hero-photo-area-right-fade" aria-hidden="true" />
          </div>
        </div>

        {/* RIGHT COLUMN: Hierarchy — district → headline → annotation → form */}
        <div className="hero-right-column order-2 lg:order-2">
          <div className="hero-form-animate w-full">
            {/* 1. District identifier — Bernoru, small caps, #E92128, 12–14px, letter-spacing 2px */}
            <p className="hero-district-label">
              {DISTRICT_LABEL}
            </p>

            {/* 2. Main headline — justified, word-spaced, line-by-line colors (client mockup) */}
            <h1 className="hero-headline hero-headline-desktop">
              <span className="hero-headline-black">DAVID </span>
              <span className="hero-headline-black">SABRY</span>
              <span className="hero-headline-black"> GUIRGIS IS A</span>{" "}
              <span className="hero-headline-red">SOCIAL WORKER, ORGANIZER AND DEMOCRATIC SOCIALIST</span>{" "}
              <span className="hero-headline-black">RUNNING FOR HUDSON COUNTY COMMISSIONER TO</span>{" "}
              <span className="hero-headline-red">WIN FOR THE WORKING CLASS.</span>
            </h1>
            <h1 className="hero-headline hero-headline-mobile" aria-hidden="true">
              <span className="hero-headline-black">DAVID SABRY GUIRGIS</span>{" "}
              <span className="hero-headline-black">IS A</span>{" "}
              <span className="hero-headline-red">SOCIAL WORKER AND ORGANIZER</span>{" "}
              <span className="hero-headline-black">RUNNING FOR HUDSON COUNTY COMMISSIONER</span>{" "}
              <span className="hero-headline-red">TO WIN FOR WORKING PEOPLE.</span>
            </h1>

            <div className="hero-quick-actions">
              <Link href="/volunteer" className="hero-quick-action hero-quick-action-outline">
                Volunteer
              </Link>
              <a
                href={actBlueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-quick-action hero-quick-action-solid"
              >
                Donate
              </a>
            </div>

            {/* 3. Handwritten accent — Homemade Apple, right-aligned margin annotation (mockup) */}
            <p className="hero-join-annotation">
              Join the fight<span className="hero-join-exclamation">!</span>
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
      {/* Bold red separator line — spans full width, barrier between Hero and About */}
      <div className="relative z-10 w-full h-2 bg-primary-500" aria-hidden="true" />
    </Section>
  );
}
