"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HandDrawnDivider } from "@/components/ui/HandDrawnDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { IMAGE_PATHS } from "@/lib/constants/images";

const DEFAULT_AMOUNT = 50;

export function Donate() {
  const reduceMotion = useReducedMotion();
  const [selectedAmount, setSelectedAmount] = useState<number>(DEFAULT_AMOUNT);
  const candidateName =
    process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const actBlueBaseUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

  const donationAmounts = [10, 25, 50, 100, 250, 500];

  const getActBlueUrl = (amount?: number) => {
    if (!amount || actBlueBaseUrl === "#") {
      return actBlueBaseUrl;
    }
    try {
      const url = new URL(actBlueBaseUrl);
      url.searchParams.set("amount", amount.toString());
      return url.toString();
    } catch {
      // If URL construction fails, append query param manually
      const separator = actBlueBaseUrl.includes("?") ? "&" : "?";
      return `${actBlueBaseUrl}${separator}amount=${amount}`;
    }
  };

  return (
    <SectionWrapper id="donate" background="transparent" fullBleed className="!p-0 overflow-hidden section-spacing-top section-spacing-bottom" bottomFade={{
        from: "transparent",
        to: "#FFF5F5",
        height: "clamp(56px, 7vh, 120px)",
        stops: [
          { color: "rgba(255,245,245,0)", at: "0%" },
          { color: "rgba(255,245,245,0)", at: "60%" },
          { color: "rgba(255,245,245,0.5)", at: "80%" },
          { color: "#FFF5F5", at: "100%" },
        ],
      }}>
      {/* Diamond pattern in bottom gradient zone so transition into Issues is smooth */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none pattern-fade-in-from-top opacity-60"
        style={{ height: "clamp(56px, 7vh, 120px)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 brand-crosshatch-pink" />
      </div>
      {/* Hand-drawn line at Commissioner|Donate boundary (within padding zone) */}
      <div className="w-full px-4 flex justify-center pt-8">
        <HandDrawnDivider variant="light" className="max-w-3xl h-7 -rotate-[0.3deg]" />
      </div>
      {/* Split background: left half red, right half white */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] w-full">
        {/* Left half — red background, all donation content; centered; top fade from white */}
        <div className="relative bg-primary-500 flex flex-col justify-center items-center py-12 lg:py-16 donate-half-red">
          <div className="grain-overlay-colored absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-xl flex flex-col items-center text-center">
              {/* Section header — SectionHeader is the single animation source; light variant on red */}
              <div className="w-full mb-8">
                <SectionHeader
                  variant="light"
                  eyebrow="SUPPORT THE CAMPAIGN"
                  title={
                    <>
                      <span className="hand-underline">People-powered.</span> No exceptions.
                    </>
                  }
                  titleClassName="heading-poster-3d"
                />
              </div>

              {/* Subheadline — speech bubble (white box) */}
              <div className="relative w-full max-w-lg mb-8 speech-bubble-accent px-6 py-5">
                <p className="font-body text-lg text-slate-700 leading-relaxed">
                  No corporate PAC money. No developers. No dark money. Just working
                  people who believe Hudson County can do better.
                </p>
              </div>

              {/* Campaign line — on red, outline */}
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.15] heading-poster-3d">
                They have the money. We have each other. Chip in now:
              </p>

              {/* Donation amount grid */}
              <motion.div
                className="relative grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md mb-4"
                initial={reduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                  },
                }}
              >
                {donationAmounts.map((amount) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <motion.button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={cn(
                        "relative flex items-center justify-center min-h-[48px] border-2 px-4 py-3 text-center font-heading text-lg font-bold transition-all duration-200 organic-sm",
                        "hover:scale-105 active:scale-[0.98]",
                        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500",
                        isSelected
                          ? "bg-white text-primary-600 border-black shadow-lg ring-2 ring-white ring-offset-2 ring-offset-primary-500"
                          : "bg-white text-primary-700 border-black/80 hover:border-black hover:bg-slate-50 hover:shadow-md",
                      )}
                      aria-pressed={isSelected}
                      aria-label={`Select $${amount} donation`}
                    >
                      ${amount}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Warm accent — on red, no outline */}
              <p className="accent-callout font-accent text-white text-base mb-6 max-w-md">
                Every dollar counts.
              </p>

              {/* Main donate CTA — no text outline */}
              <a
                href={getActBlueUrl(selectedAmount)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full max-w-lg flex items-center justify-center organic-card-1 bg-[#E92128] text-white border-2 border-black px-8 py-6 sm:py-7 text-center font-display text-2xl sm:text-3xl font-bold block-shadow block-shadow-press transition-all duration-200 uppercase tracking-tight",
                  "hover:bg-[#DC2626] active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500",
                  "-rotate-1",
                )}
              >
                DONATE NOW VIA ACTBLUE
              </a>

              {/* FEC disclaimer — on red, no outline */}
              <p className="mt-8 text-xs leading-relaxed text-white/90 max-w-md">
                Contributions are not tax deductible. Federal law requires us to
                collect and report the name, address, occupation, and employer of
                contributors.
              </p>
            </div>
          </div>
        </div>

        {/* Right half — white background, group photo only (3x larger) */}
        <div className="bg-white relative min-h-[640px] sm:min-h-[760px] lg:min-h-[960px] flex flex-col justify-center items-center py-12 lg:py-16 overflow-hidden">
          <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-[84rem] min-h-[640px] sm:min-h-[760px] lg:min-h-[960px] flex items-center justify-center">
              <div className="relative w-full h-full organic-lg border-4 border-primary-500 overflow-hidden" style={{ transform: "rotate(1.5deg) scale(0.9)" }}>
                <ScrollReveal variant="photo" className="relative w-full h-full min-h-[640px] sm:min-h-[760px] lg:min-h-[960px] organic-lg overflow-hidden bg-slate-100">
                  <OptimizedImage
                    src={IMAGE_PATHS.candidate.action}
                    alt={`${candidateName} at a community event with supporters`}
                    fill
                    priority={false}
                    placeholder="blur"
                    className="object-cover object-[center_30%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
