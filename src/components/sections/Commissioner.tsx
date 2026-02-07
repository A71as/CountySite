"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Commissioner() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";

  return (
    <SectionWrapper id="commissioner" background="cream">
      {/* Swiss-style section header */}
      <div className="mb-16 max-w-5xl">
        <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium mb-6">
          The Role
        </div>
        <h2 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
          What is a County Commissioner?
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column - Explanation */}
        <div className="space-y-8">
          <div className="border-l-[6px] border-primary-500 pl-6">
            <p className="text-xl text-slate-700 leading-relaxed">
              County Commissioners run the county government. In {county}{" "}
              County, they vote on a budget of over{" "}
              <span className="font-bold text-slate-900">$700 million</span> and
              decide how your tax dollars are spent.
            </p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-lg">
              They fund and oversee core public services, including:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Public parks & recreation",
                "County roads & bridges",
                "Community college (HCCC)",
                "County jail & corrections",
                "Social services",
                "Public health programs",
                "Economic development",
                "Environmental protection",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
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
              they do. That&apos;s why accountability matters—and why this race
              matters.
            </p>
          </div>
        </div>

        {/* Right column - District Map */}
        <div className="space-y-6">
          <div className="uppercase text-xs tracking-[0.2em] text-slate-500 font-medium">
            District 4
          </div>

          {/* District Map Container */}
          <div className="relative w-full border-2 border-primary-500 bg-slate-50 aspect-square">
            <iframe
              src="/arcgis-map.html"
              title="Hudson County District 4 Map"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              aria-label="Hudson County map with District 4 highlighted"
            />
          </div>

          <p className="text-sm text-slate-600">
            District 4 includes the Heights, Journal Square, McGinley Square,
            and the West Side.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
