"use client";

import {
  Search,
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
      icon: Search,
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
          Audit Everything is the foundation—funding the other three policies with real
          savings and accountability for {county} County.
        </p>
      </div>

      {/* Featured foundation policy */}
      <div className="relative mb-16 border-l-4 border-primary-500 bg-rose-50/70 p-8 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <div className="relative pt-8">
            <div className="absolute -top-2 left-0 flex items-center">
              <span className="text-7xl font-bold text-primary-500 leading-none select-none">{foundation.number}</span>
              <span className="inline-flex ml-6 w-12 h-12 bg-primary-500 items-center justify-center">
                <foundation.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
            </div>
            <div className="relative mt-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {foundation.title}
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p className="text-primary-600 font-semibold">
              We deserve transparency.
            </p>
            <p>
              {foundation.description}
            </p>
          </div>
        </div>
      </div>

      {/* Divider / callout */}
      <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-rose-400 mb-10">
        <span className="h-px w-10 bg-rose-200" aria-hidden="true" />
        And invest in what we deserve
        <span className="h-px w-10 bg-rose-200" aria-hidden="true" />
      </div>

      {/* Branching policies */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-12">
        {branches.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <div key={index} className="group relative">
              {/* Large number - Swiss style, now red, with icon to the right */}
              <div className="flex items-center absolute -top-2 -left-2">
                <span className="text-7xl font-bold text-primary-500 leading-none select-none">{issue.number}</span>
                <span className="inline-flex ml-6 w-12 h-12 bg-primary-500 items-center justify-center">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>

              <div className="relative mt-20">
                {/* Content */}
                <h3 className="mb-3 font-heading text-xl font-bold text-slate-900 leading-tight">
                  {issue.title}
                </h3>
                <p className="text-primary-600 text-sm font-semibold mb-3">
                  We deserve {issue.title === "Social Housing on County Land" ? "housing we can afford" : issue.title === "Universal Childcare" ? "childcare for all" : "to learn"}.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {issue.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
