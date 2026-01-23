"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

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
              {county} County Commissioners control a <span className="font-bold text-slate-900">$700+ million budget</span> that affects every aspect of daily life.
            </p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-lg">
              County Commissioners oversee critical services including:
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
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-lg">
              Yet most people don&apos;t know who their commissioner is or what they do. 
              That&apos;s why accountability matters—and why this race matters.
            </p>
          </div>
        </div>

        {/* Right column - District Map */}
        <div className="space-y-6">
          <div className="uppercase text-xs tracking-[0.2em] text-slate-500 font-medium">
            District 4
          </div>
          
          {/* District Map Container */}
          <div className="relative aspect-square w-full bg-slate-100 border border-slate-200">
            {/* Placeholder for district map - will be replaced with actual map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary-500 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 font-medium">District Map</p>
                <p className="text-xs text-slate-500 mt-1">Coming soon</p>
              </div>
            </div>
            
            {/* Uncomment when map image is available */}
            {/* <OptimizedImage
              src="/images/district-4-map.png"
              alt="Hudson County District 4 Map"
              fill
              className="object-contain"
            /> */}
          </div>

          <p className="text-sm text-slate-600">
            District 4 includes parts of Jersey City, including the Heights, 
            Journal Square, and surrounding neighborhoods.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
