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
        "Hudson County has never had an independent audit. We don't know where $700 million goes each year. It's time for full transparency and accountability in county spending.",
      number: "01",
    },
    {
      icon: Home,
      title: "Social Housing on County Land",
      description:
        "The county owns valuable land that could be used for permanently affordable, publicly-owned social housing—not luxury developments that price out working families.",
      number: "02",
    },
    {
      icon: Baby,
      title: "Universal Childcare",
      description:
        "Families in Hudson County pay some of the highest childcare costs in the nation. We can use county resources to make childcare accessible and affordable for all.",
      number: "03",
    },
    {
      icon: GraduationCap,
      title: "Free HCCC",
      description:
        "Hudson County Community College should be free for county residents. Investing in education pays dividends for our entire community.",
      number: "04",
    },
  ];

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
          Real solutions for {county} County—not empty promises.
        </p>
      </div>

      {/* Grid layout - 2x2 for Big 4 */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        {issues.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <div key={index} className="group relative">
              {/* Large number - Swiss style */}
              <div className="absolute -top-2 -left-2 text-8xl font-bold text-slate-100 leading-none select-none">
                {issue.number}
              </div>
              
              <div className="relative">
                {/* Red square icon */}
                <div className="mb-6 w-14 h-14 bg-primary-500 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                
                {/* Content */}
                <h3 className="mb-4 font-heading text-2xl font-bold text-slate-900 leading-tight">
                  {issue.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
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
