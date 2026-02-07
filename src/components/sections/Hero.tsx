import Image from "next/image";
import { SignupForm } from "@/components/forms/SignupForm";
import { DavidLogo } from "@/components/ui/DavidLogo";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function Hero() {
  const candidateName =
    process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-primary-500"
    >
      {/* ── Brand crosshatch texture ── */}
      <div
        className="absolute inset-0 brand-crosshatch pointer-events-none"
        aria-hidden="true"
      />
      {/* ── Sunburst rays background ── */}
      <div className="absolute inset-0 hero-sunburst" aria-hidden="true" />

      {/* ── Subtle grain texture for retro printed-paper feel ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* ── Content grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-0 min-h-[max(640px,90vh)]">
          {/* ── Left column — text & form ── */}
          <div className="order-1 lg:col-span-7 flex flex-col justify-center py-10 sm:py-12 lg:py-20">
            {/* DAVID! speech bubble logo — white variant on red bg */}
            <h1>
              <DavidLogo
                variant="white"
                className="h-20 sm:h-28 lg:h-36 xl:h-44 w-auto"
              />
            </h1>

            {/* Speech bubble — election day call-out */}
            <div className="relative inline-block mt-5 w-fit bg-white rounded-2xl px-6 py-3.5 shadow-lg speech-bubble">
              <p className="font-heading font-bold text-primary-500 text-base sm:text-lg lg:text-xl uppercase tracking-wide">
                Election Day is June 2, 2026
              </p>
            </div>

            {/* Title block — matching brand guide styling */}
            <div className="mt-6 sm:mt-8">
              <p className="font-subtitle italic font-black text-white text-2xl sm:text-3xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.1]">
                <span className="text-[0.85em]">for</span> {office}
              </p>
            </div>

            {/* District info — bold band */}
            <p className="mt-3 sm:mt-4 font-heading text-sm sm:text-base lg:text-lg xl:text-xl text-white font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              District 4 &middot; Journal Square &middot; Downtown &middot; The
              Heights
            </p>

            {/* ── Signup form in white card ── */}
            <div className="mt-7 max-w-lg rounded-xl bg-white/95 backdrop-blur-sm p-4 sm:p-5 shadow-elevated">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">
                Stand with David.
              </h2>
              <SignupForm variant="hero" />
            </div>
          </div>

          {/* ── Right column — candidate image (poster-style) ── */}
          {/*
            Desktop: self-stretch fills full section height. Scale transform
            makes David larger and -ml pushes him leftward for more presence.
            Mobile: fixed height, stacked below the form.
          */}
          <div className="order-2 lg:col-span-5 relative self-end lg:self-stretch flex items-end justify-center lg:justify-end">
            <div
              className="relative w-[320px] h-[420px] sm:w-[400px] sm:h-[520px] lg:w-full lg:h-full lg:-ml-12 xl:-ml-16 hero-halftone"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Multi-layer spotlight glow behind candidate */}
              <div
                className="absolute inset-x-0 bottom-0 top-[10%] blur-[100px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.20) 0%, rgba(255,200,200,0.10) 40%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-[15%] bottom-[5%] top-[20%] blur-[60px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Candidate image — natural colors + subtle red edge glow */}
              <Image
                src={IMAGE_PATHS.candidate.hero}
                alt={`${candidateName} for ${office}`}
                fill
                priority
                quality={85}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 520px, 600px"
                className="relative z-[2] object-contain object-bottom hero-image-fade lg:scale-110 xl:scale-[1.15]"
                style={{
                  transformOrigin: "bottom center",
                  filter:
                    "drop-shadow(0 0 30px rgba(233,33,40,0.3)) drop-shadow(0 0 80px rgba(233,33,40,0.15))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent z-20"
        aria-hidden="true"
      />
    </section>
  );
}
