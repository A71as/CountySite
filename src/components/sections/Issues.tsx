"use client";

import {
  Calculator,
  Home,
  Baby,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface Issue {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}

export function Issues() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";

  // David Guirgis's Big 4 Policies
  const issues: Issue[] = [
    {
      icon: Calculator,
      title: "Audit Everything",
      description:
        "Hudson County has never had an independent audit. We don't know where $700 million goes each year. Audit Everything is the foundation—exposing waste and corruption to fund the other three policies.",
      number: "01",
    },
    {
      icon: Home,
      title: "Social Housing on County Land",
      description:
        "Branching from Audit Everything: we use recovered funds and better land stewardship to build permanently affordable, publicly-owned social housing—not luxury developments that price out working families.",
      number: "02",
    },
    {
      icon: Baby,
      title: "Universal Childcare",
      description:
        "Branching from Audit Everything: we reinvest savings to make childcare accessible and affordable for all families in Hudson County.",
      number: "03",
    },
    {
      icon: GraduationCap,
      title: "Free HCCC",
      description:
        "Branching from Audit Everything: we fund free tuition at Hudson County Community College so every resident can access education without crushing debt.",
      number: "04",
    },
  ];

  const [foundation, ...branches] = issues;

  return (
    <SectionWrapper id="issues" background="default">
      {/* Swiss-style header */}
      <div className="mb-20 max-w-5xl">
        <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium mb-6">
          Platform
        </div>
        <h2 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
          Big Four Policies
        </h2>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          Audit Everything is the foundation—funding the other three policies
          with real savings and accountability for {county} County.
        </p>
      </div>

      {/* Foundation policy (root) */}
      <div className="relative mx-auto mb-16 max-w-4xl">
        <div
          className="absolute -top-16 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-primary-500/70 to-primary-200"
          aria-hidden="true"
        />
        <div
          className="absolute -top-[4.5rem] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-primary-300 bg-white shadow-sm"
          aria-hidden="true"
        />
        <div
          className="absolute -top-8 left-1/2 h-[3px] w-48 -translate-x-1/2 bg-primary-200"
          aria-hidden="true"
        />
        <div
          className="absolute -top-6 left-1/2 h-[6px] w-32 -translate-x-1/2 bg-primary-500"
          aria-hidden="true"
        />
        <div className="relative border border-primary-200/80 bg-gradient-to-br from-rose-50/80 via-white to-rose-100/70 p-9 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] sm:p-11">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <span className="text-7xl font-bold text-primary-600 leading-none select-none sm:text-8xl">
                {foundation.number}
              </span>
              <span className="inline-flex h-14 w-14 items-center justify-center bg-primary-500 shadow-[0_10px_24px_-10px_rgba(14,116,144,0.7)]">
                <foundation.icon
                  className="h-7 w-7 text-white"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {foundation.title}
              </h3>
              <p className="mt-2 text-primary-600 font-semibold">
                We deserve transparency.
              </p>
            </div>
          </div>
          <p className="mt-6 text-slate-700 leading-relaxed">
            {foundation.description}
          </p>
        </div>
      </div>

      {/* Branching policies */}
      <div className="relative">
        <div
          className="hidden md:block absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary-400/70 to-primary-200"
          aria-hidden="true"
        />
        <div
          className="hidden md:block absolute left-1/2 top-10 h-px w-[min(100%,54rem)] -translate-x-1/2 bg-gradient-to-r from-primary-200 via-primary-300/70 to-primary-200"
          aria-hidden="true"
        />
        <div
          className="hidden md:block absolute left-1/2 top-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-12">
          {branches.map((issue, index) => {
            const Icon = issue.icon;
            return (
              <div key={index} className="group relative pt-12 md:pt-18">
                <div
                  className="hidden md:block absolute left-1/2 -top-1 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-primary-300/80 to-primary-200"
                  aria-hidden="true"
                />
                <div
                  className="hidden md:block absolute left-1/2 -top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary-300"
                  aria-hidden="true"
                />
                <div className="relative border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_22px_50px_-30px_rgba(15,23,42,0.55)]">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl font-bold text-primary-500 leading-none select-none">
                      {issue.number}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center bg-primary-500 shadow-[0_8px_20px_-12px_rgba(14,116,144,0.7)]">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-xl font-bold text-slate-900 leading-tight">
                      {issue.title}
                    </h3>
                    <p className="text-primary-600 text-sm font-semibold mb-3">
                      We deserve{" "}
                      {issue.title === "Social Housing on County Land"
                        ? "housing we can afford"
                        : issue.title === "Universal Childcare"
                          ? "childcare for all"
                          : "to learn"}
                      .
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {issue.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
