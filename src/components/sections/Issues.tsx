"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Home,
  Baby,
  GraduationCap,
  LucideIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const cardStagger = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

interface Issue {
  icon: LucideIcon;
  title: string;
  description: string;
  fullExplainer: string;
}

export function Issues() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";
  const reduceMotion = useReducedMotion();
  // -1 = foundation card expanded, 0/1/2 = branch card expanded, null = none
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const issues: Issue[] = [
    {
      icon: Calculator,
      title: "Audit Everything",
      description: `${county} County carries an operating budget of over $750 million per year — and we run on a surplus. So why are our county schools facing an $11 million budget deficit?`,
      fullExplainer: `One out of every three tax dollars you pay go straight to the County. But for too long, machine politicians and pay-to-play corruption have ensured you don't know where it's going or how it's being spent. That's unacceptable.\n\nAs County Commissioner, I'm going to audit everything — and I'll be a loud voice against corruption. It's time to shine a light on where our money is going and how it's being spent. Because the era of wasteful pay-to-play contracts, no- or low-show jobs, and outrageous payouts for crooked party cronies is over.`,
    },
    {
      icon: Home,
      title: "Green Social Housing",
      description:
        "The county owns TKTKTK parcels of vacant land — yet they're selling it to a private developer for 20% affordable housing. Meanwhile, a nonprofit developer built 55% affordable housing in Jersey City just last year.",
      fullExplainer: `And Montgomery County, MD, is following the model of cities like Chicago and New York using their land to build 100% affordable mixed-income housing, with community benefits like recreational access.\n\nThis is called social housing — and I think we should build it right here in Hudson County. 20% affordable housing isn't enough to meet the demands of a housing crisis that makes this city the most expensive cities in the country to rent in, and pre-emptively ceding to private developers displays the exact lack of political imagination that brought us this affordability crisis.\n\nInstead, I'll build 100% affordable, green social housing with access to childcare for all.`,
    },
    {
      icon: Baby,
      title: "Universal Childcare",
      description:
        "Childcare for all should be embedded in every county service and program — so no family has to choose between a paycheck and their kids' care.",
      fullExplainer: `And I'll ensure childcare for all is embedded in all of our county's services and programs — including onsite daycare for Hudson County Community College students. Parents shouldn't have to choose between a paycheck and their kids' safety. This is an investment in our families and in our economy.`,
    },
    {
      icon: GraduationCap,
      title: "Free HCCC",
      description:
        "Education is a right. Hudson County Community College has changed the lives of millions of people in this county, including my own mother.",
      fullExplainer: `It should be treated as the public good as it is —and it should be free for everyone, no questions asked.`,
    },
  ];

  const [foundation, ...branches] = issues;
  const tilts = ["tilt-1", "tilt-2", "tilt-3"];
  const cardRadii = ["organic-card-1", "organic-card-2", "organic-card-3"];
  const cardBorders = [
    "border-2 border-slate-200 border-l-4 border-l-primary-400",
    "border-2 border-slate-200",
    "border-2 border-slate-200 border-t-4 border-t-primary-400",
  ];

  return (
    <SectionWrapper id="issues" background="blush" fullBleed className="relative overflow-hidden section-spacing-top section-spacing-bottom" topFade={{ from: "#FFF5F5", to: "transparent" }} bottomFade={{
        from: "rgba(61,26,30,0)",
        to: "#3D1A1E",
        height: "clamp(56px, 7vh, 120px)",
        blendMode: "multiply",
        stops: [
          { color: "rgba(61,26,30,0)", at: "0%" },
          { color: "rgba(61,26,30,0.10)", at: "20%" },
          { color: "rgba(61,26,30,0.22)", at: "45%" },
          { color: "rgba(61,26,30,0.38)", at: "65%" },
          { color: "rgba(61,26,30,0.62)", at: "85%" },
          { color: "#3D1A1E", at: "100%" },
        ],
      }}>
      {/* Pattern full-bleed with gradient mask so it fades in from Donate gradient and out into footer */}
      <div className="absolute inset-0 pattern-fade-vertical pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 texture-speckle" />
        <div className="absolute inset-0 brand-crosshatch-dark" />
        <div className="absolute inset-0 brand-crosshatch-pink opacity-70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      {/* Section opener + header — SectionHeader is the single animation source; lead line static */}
      <div className="relative mb-14 max-w-5xl">
        <SectionHeader
          showDivider={false}
          title={
            <>
              <span className="hand-underline">Audit Everything</span> is the
              foundation.
            </>
          }
        />

        <p className="accent-callout font-accent text-3xl sm:text-4xl lg:text-5xl text-primary-500 mt-6">
          We deserve more.
        </p>
      </div>

      {/* Foundation card — full-width, dominant, campaign graphic style */}
      <div className="relative mx-auto mb-6 w-full max-w-6xl">
        <motion.div
          initial={reduceMotion ? undefined : cardStagger.initial}
          whileInView={reduceMotion ? undefined : cardStagger.visible}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...cardStagger.transition, delay: 0 }}
          className="relative organic-lg border-4 border-primary-500 bg-gradient-to-br from-rose-50 via-white to-primary-50/60 p-8 sm:p-10 lg:p-12 shadow-elevated tilt-2 overflow-hidden"
        >
          {/* Large "AUDIT EVERYTHING" header with 3D shadow */}
          <div
            className="absolute inset-x-0 top-0 py-6 px-4 text-center pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-primary-500 select-none opacity-[0.12]"
              style={{
                textShadow:
                  "2px 2px 0 rgba(0,0,0,0.08), 4px 4px 0 rgba(0,0,0,0.06), 6px 6px 0 rgba(233,33,40,0.04)",
              }}
            >
              Audit Everything
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mt-4">
            <div className="flex items-center gap-5">
              <span className="relative inline-flex h-16 w-16 items-center justify-center bg-primary-500 organic-md shadow-md slight-tilt-sm-right flex-shrink-0 ">
                <span
                  className="absolute inset-0 organic-md border-2 border-dashed border-primary-300 scale-[1.12] opacity-70"
                  aria-hidden="true"
                />
                <foundation.icon className="h-8 w-8 text-white icon-sketch" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                  {foundation.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-6 text-slate-700 leading-relaxed font-body text-base sm:text-lg max-w-3xl">
            {foundation.description}
          </p>

          <AnimatePresence initial={false}>
            {expandedIndex === -1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="relative z-10 pt-6 mt-6 organic-divider-t text-slate-700 leading-relaxed font-body text-base sm:text-lg max-w-3xl space-y-4">
                  {foundation.fullExplainer.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpandedIndex(expandedIndex === -1 ? null : -1)}
            className="relative z-10 mt-4 min-h-[44px] flex items-center gap-1.5 py-2 text-sm font-subhead font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 organic-sm transition-colors"
            aria-expanded={expandedIndex === -1}
          >
            {expandedIndex === -1 ? (
              <>
                Read less <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

        </motion.div>
      </div>

      {/* Hand-drawn squiggly connectors: one trunk down, three branches to cards */}
      <div className="relative hidden md:block mx-auto max-w-6xl h-20 px-4" aria-hidden="true">
        <svg viewBox="0 0 800 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <path
            className="squiggly-connector"
            d="M 400 0 Q 404 20 398 40 Q 402 55 400 80"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="squiggly-connector"
            d="M 400 40 Q 200 50 133 80"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="squiggly-connector"
            d="M 400 40 Q 400 60 400 80"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="squiggly-connector"
            d="M 400 40 Q 600 50 667 80"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Three branch cards with accordion — single column on mobile */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 pt-2">
        {branches.map((issue, index) => {
          const Icon = issue.icon;
          const isExpanded = expandedIndex === index;
          return (
            <motion.div
              key={index}
              initial={reduceMotion ? undefined : cardStagger.initial}
              whileInView={reduceMotion ? undefined : cardStagger.visible}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...cardStagger.transition, delay: (index + 1) * 0.1 }}
              className={cn("relative", tilts[index])}
            >
              <div
                className={cn(
                  "relative bg-white/95 p-7 sm:p-8 shadow-soft backdrop-blur-sm transition-all duration-300 hover:shadow-elevated overflow-hidden",
                  cardRadii[index],
                  cardBorders[index]
                )}
              >
                <div
                  className={cn("absolute inset-0 texture-speckle opacity-40 pointer-events-none", cardRadii[index])}
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-4 min-w-0">
                  <span className="relative inline-flex h-14 w-14 flex-shrink-0 items-center justify-center bg-primary-500 organic-sm shadow-sm ">
                    <span
                      className="absolute inset-0 organic-sm border-2 border-dashed border-primary-300 scale-[1.15] opacity-60"
                      aria-hidden="true"
                    />
                    <Icon className="h-7 w-7 text-white icon-sketch" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                      {issue.title}
                    </h3>
                  </div>
                </div>

                <p className="relative mt-5 text-slate-600 leading-relaxed text-base font-body">
                  {issue.description}
                </p>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 organic-divider-t text-slate-700 leading-relaxed text-base font-body space-y-3">
                        {issue.fullExplainer.split(/\n\n+/).map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="mt-5 min-h-[48px] flex items-center gap-1.5 py-2 text-base font-subhead font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 organic-sm transition-colors"
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? (
                    <>
                      Read less <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </SectionWrapper>
  );
}
