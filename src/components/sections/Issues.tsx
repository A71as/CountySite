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
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BUDGET_MILLIONS } from "@/lib/constants/copy";
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
  tagline: string;
}

export function Issues() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";
  const reduceMotion = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const issues: Issue[] = [
    {
      icon: Calculator,
      title: "Audit Everything",
      description: `${county} County has never had an independent audit. We don't know where $${BUDGET_MILLIONS} million goes each year. Audit Everything is the foundation—exposing waste and corruption to fund the other three policies.`,
      fullExplainer: `Hudson County has never had a truly independent, comprehensive audit. That means we don't know where hundreds of millions of taxpayer dollars go every year—only that working families aren't seeing the results. Audit Everything means: transparent accounting, forensic audits of contracts and land deals, and public accountability so we can reclaim wasted funds and redirect them to housing, childcare, and education. Every dollar we recover is a dollar we can invest in our community instead of in corruption and sweetheart deals.`,
      tagline: "We deserve transparency.",
    },
    {
      icon: Home,
      title: "Social Housing on County Land",
      description:
        "We use recovered funds and better land stewardship to build permanently affordable, publicly-owned social housing—not luxury developments that price out working families.",
      fullExplainer: `Branching from Audit Everything: we use recovered funds and better stewardship of county-owned land to build permanently affordable, publicly-owned social housing. That means housing that stays affordable forever—not luxury developments that displace working families. We'll prioritize county land for community benefit, partner with community land trusts, and ensure new construction serves residents who need it most, with strong tenant protections and no more backroom deals that hand public assets to developers.`,
      tagline: "We deserve housing we can afford.",
    },
    {
      icon: Baby,
      title: "Universal Childcare",
      description:
        "We reinvest savings from the audit to make childcare accessible and affordable for all families in Hudson County.",
      fullExplainer: `Branching from Audit Everything: we reinvest savings and reallocated funds to make childcare accessible and affordable for every family in Hudson County. Parents shouldn't have to choose between a paycheck and their kids' safety. We'll expand publicly funded childcare, support providers with living wages, and ensure no family is priced out of quality early care and education. This is an investment in our kids and in our economy.`,
      tagline: "We deserve childcare for all.",
    },
    {
      icon: GraduationCap,
      title: "Free HCCC",
      description:
        "We fund free tuition at Hudson County Community College so every resident can access education without crushing debt.",
      fullExplainer: `Branching from Audit Everything: we fund free tuition at Hudson County Community College so every resident can access higher education and workforce training without crushing debt. Community college should be a ladder for working families—not another bill. We'll work with HCCC to remove financial barriers, support wraparound services, and ensure that every person in Hudson County has a real shot at the education they deserve.`,
      tagline: "We deserve to learn.",
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
    <SectionWrapper id="issues" background="white" className="relative overflow-hidden">
      <div className="absolute inset-0 texture-speckle pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 brand-crosshatch-dark pointer-events-none opacity-80" aria-hidden="true" />

      {/* Section opener + header */}
      <ScrollReveal variant="header" className="relative mb-14 max-w-5xl">
        <p className="accent-callout font-accent text-3xl sm:text-4xl lg:text-5xl text-primary-500 mb-4">
          We deserve more.
        </p>
        <div className="uppercase text-sm tracking-[0.25em] text-primary-600 font-subhead font-bold mb-4">
          Big Four Policies
        </div>
        <h2 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight">
          <span className="hand-underline">Audit Everything</span> is the foundation.
        </h2>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl font-body">
          It funds the other three policies with real savings and accountability for {county} County.
        </p>
      </ScrollReveal>

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
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                  {foundation.title}
                </h3>
                <p className="mt-2 text-primary-600 text-lg font-body italic tagline-accent">
                  {foundation.tagline}
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-6 text-slate-700 leading-relaxed font-body text-base sm:text-lg max-w-3xl">
            {foundation.description}
          </p>

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
                  "relative bg-white/95 p-6 shadow-soft backdrop-blur-sm transition-all duration-300 hover:shadow-elevated overflow-hidden",
                  cardRadii[index],
                  cardBorders[index]
                )}
              >
                <div
                  className={cn("absolute inset-0 texture-speckle opacity-40 pointer-events-none", cardRadii[index])}
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-4 min-w-0">
                  <span className="relative inline-flex h-12 w-12 items-center justify-center bg-primary-500 organic-sm shadow-sm flex-shrink-0 ">
                    <span
                      className="absolute inset-0 organic-sm border-2 border-dashed border-primary-300 scale-[1.15] opacity-60"
                      aria-hidden="true"
                    />
                    <Icon className="h-6 w-6 text-white icon-sketch" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                      {issue.title}
                    </h3>
                    <p className="mt-1.5 text-primary-600 text-base font-body italic tagline-accent">
                      {issue.tagline}
                    </p>
                  </div>
                </div>

                <p className="relative mt-4 text-slate-600 leading-relaxed text-sm font-body">
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
                      <p className="pt-4 mt-4 organic-divider-t text-slate-700 leading-relaxed text-sm font-body">
                        {issue.fullExplainer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="mt-4 min-h-[44px] flex items-center gap-1.5 py-2 text-sm font-subhead font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 organic-sm transition-colors"
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
    </SectionWrapper>
  );
}
