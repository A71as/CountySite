import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SignupForm } from "@/components/forms/SignupForm";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function Hero() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  return (
    <SectionWrapper id="home" background="default" className="relative overflow-hidden">
      {/* Retro decorative background elements */}
      <div className="absolute inset-0 bg-retro-diagonal opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left column - Image (appears second on mobile) */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Retro decorative shapes */}
            <div className="absolute -left-4 -top-4 h-full w-full rounded-lg bg-accent-600 rotate-3 opacity-90 lg:-left-6 lg:-top-6" />
            <div className="absolute -left-2 -top-2 h-full w-full rounded-lg bg-retro-red rotate-[-2deg] opacity-20 lg:-left-4 lg:-top-4" />

            {/* Candidate hero image */}
            <div className="relative z-10">
              <OptimizedImage
                src={IMAGE_PATHS.candidate.hero}
                alt={`${candidateName} for ${office}`}
                width={600}
                height={800}
                priority={true}
                placeholder="blur"
                className="rounded-lg shadow-2xl w-full h-auto border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* Right column - Content (appears first on mobile) */}
        <div className="order-1 flex flex-col justify-center space-y-8 lg:order-2">
          {/* Retro badge */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 bg-accent-500 text-white rounded-full text-sm font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Campaign 2024
          </div>

          {/* Main heading - retro-modern style */}
          <h1 className="font-display text-5xl leading-none text-navy sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
            <span className="block">Fighting for</span>
            <span className="block text-accent-500 mt-2">{" "}{county}</span>
            <span className="block mt-2">Families</span>
          </h1>

          {/* Subheading - more impactful */}
          <p className="text-xl text-gray-800 sm:text-2xl font-medium leading-relaxed max-w-xl">
            {candidateName} is running for {office} to deliver{" "}
            <span className="text-primary-600 font-semibold">real solutions</span>{" "}
            for {county} County. Join the movement for{" "}
            <span className="text-accent-500 font-semibold">working families</span>.
          </p>

          {/* Call to action */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-accent-500"></div>
              <p className="text-lg font-bold text-navy uppercase tracking-wider whitespace-nowrap">
                Join the fight.
              </p>
              <div className="h-px flex-1 bg-accent-500"></div>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
