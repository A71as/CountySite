"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { YardSignForm } from "@/components/forms/YardSignForm";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function YardSign() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";

  return (
    <SectionWrapper
      id="yard-sign"
      background="default"
      className="bg-accent-50/30"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column - Content (appears first on mobile) */}
        <div className="order-1 flex flex-col justify-center space-y-6">
          <div>
            <div className="mb-3">
              <span className="text-sm font-subhead font-bold uppercase tracking-wide text-accent-600">
                Yard Signs
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl uppercase tracking-tight">
              Show Your Support
            </h2>
            <p className="mt-4 text-lg text-slate-700 sm:text-xl">
              Request a free yard sign and let your neighbors know you&apos;re
              voting for{" "}
              <span className="font-heading font-bold text-primary-600">
                {candidateName}
              </span>
              !
            </p>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Yard signs are the most visible way to build momentum. We&apos;ll
            deliver directly to your door.
          </p>

          <div className="mt-4">
            <YardSignForm />
          </div>
        </div>

        {/* Right column - Image: scroll-in scale (no form animation) */}
        <div className="order-2 flex items-center justify-center">
          <div className="relative w-full max-w-md slight-tilt-right">
            <ScrollReveal variant="photo" className="relative photo-frame-standard overflow-hidden">
              <OptimizedImage
                src={IMAGE_PATHS.yardSign}
                alt="Campaign yard sign mockup showing the design and layout of the yard sign"
                width={600}
                height={800}
                priority={false}
                placeholder="blur"
                className="drop-shadow-2xl w-full h-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
