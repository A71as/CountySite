"use client";

import Image from "next/image";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LOGO_ASSETS } from "@/lib/constants/images";
import { ENDORSEMENTS } from "@/lib/constants/endorsements";

// Stagger cards + varied organic radii and tilts (scales with more orgs)
const orgTilts = ["tilt-4", "tilt-5", "tilt-1", "tilt-2", "tilt-3"];
const orgRadii = ["organic-card-2", "organic-card-3", "organic-card-1"];
const orgOffsets = ["md:translate-y-0", "md:translate-y-8", "md:translate-y-2", "md:translate-y-6"];

export function Endorsements() {
  const organizations = ENDORSEMENTS.filter((e) => e.type === "organization");
  const individuals = ENDORSEMENTS.filter((e) => e.type === "individual");
  const totalCount = ENDORSEMENTS.length;
  const reduceMotion = useReducedMotion();
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";

  return (
    <SectionWrapper id="endorsements" background="lightPink" className="relative">
      {/* Background texture + crosshatch */}
      <div className="absolute inset-0 texture-speckle pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 brand-crosshatch-dark pointer-events-none opacity-80" aria-hidden="true" />

      {/* Section header + prominent counter badge */}
      <ScrollReveal variant="header" className="relative mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="uppercase text-sm tracking-[0.2em] text-primary-on-light-pink font-subhead font-bold">
            Coalition
          </span>
          {/* Prominent red pill badge — updates automatically as endorsements are added */}
          <span className="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-display font-bold tracking-wide organic-sm shadow-md">
            {totalCount}+ ENDORSEMENTS
          </span>
        </div>
        <h2 className="font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl max-w-xl uppercase tracking-tight">
          Endorsed by leaders who fight for <span className="hand-underline">working people.</span>
        </h2>
      </ScrollReveal>

      {/* Tier 1: ORGANIZATIONS — large cards with logos + quote blurbs */}
      {organizations.length > 0 && (
        <div className="relative mb-16">
          <h3 className="font-subhead font-bold text-slate-700 uppercase tracking-[0.15em] text-sm mb-6">
            Organizations
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {organizations.map((endorsement, index) => (
              <motion.div
                key={`org-${endorsement.name}`}
                variants={
                  reduceMotion
                    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
                    : {
                        hidden: { opacity: 0, x: index % 2 === 0 ? -24 : 24 },
                        visible: { opacity: 1, x: 0 },
                      }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative bg-white border-2 border-black p-8 block-shadow transition-all duration-300 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] ${orgRadii[index % orgRadii.length]} ${orgTilts[index % orgTilts.length]} ${orgOffsets[index % orgOffsets.length]}`}
              >
                <span
                  className="absolute top-4 right-6 font-display text-6xl text-primary-100 leading-none select-none"
                  aria-hidden="true"
                >
                  &rdquo;
                </span>

                {endorsement.image && (
                  <div className={`mb-6 h-16 relative ${index % 2 === 0 ? "rotate-[1deg]" : "-rotate-[1deg]"}`}>
                    <OptimizedImage
                      src={endorsement.image}
                      alt={endorsement.type === "organization" ? `${endorsement.name} logo` : `${endorsement.name}, ${endorsement.title}`}
                      height={64}
                      width={200}
                      className="h-16 w-auto object-contain object-left"
                    />
                  </div>
                )}

                {!endorsement.image && (
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                    {endorsement.name}
                  </h3>
                )}

                {endorsement.quote && (
                  <blockquote className="relative font-body italic text-primary-600 leading-relaxed text-base">
                    &ldquo;{endorsement.quote}&rdquo;
                  </blockquote>
                )}

                {endorsement.image && (
                  <p className="mt-4 font-heading font-bold text-slate-900">
                    — {endorsement.name}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Tier 2: INDIVIDUALS — grid with circular headshot, name (Bernoru bold), title (regular) */}
      {individuals.length > 0 && (
        <div className="relative">
          <h3 className="font-subhead font-bold text-slate-700 uppercase tracking-[0.15em] text-sm mb-6">
            Individual endorsers
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.06 },
              },
            }}
          >
            {individuals.map((endorsement, index) => (
              <motion.div
                key={`ind-${endorsement.name}`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Circular headshot */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary-200 bg-slate-100 flex-shrink-0 mb-3 ring-2 ring-white shadow-md">
                  <Image
                    src={endorsement.image}
                    alt={`${endorsement.name}, ${endorsement.title}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                {/* Name — Bernoru (font-subhead) bold */}
                <p className="font-subhead font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {endorsement.name}
                </p>
                {/* Title/office — regular weight */}
                {endorsement.title && (
                  <p className="mt-0.5 font-body text-slate-600 text-xs sm:text-sm font-normal">
                    {endorsement.title}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* CTA — mailto to campaign contact email (grassroots energy) */}
      <div className="relative mt-16 pt-12 organic-divider-t">
        <div className="flex justify-center">
          <a
            href={`mailto:${contactEmail}?subject=Endorsement%20for%20David%20Guirgis`}
            className="accent-callout inline-flex items-center justify-center gap-2 speech-bubble-accent px-6 py-4 font-accent font-bold text-primary-600 text-base sm:text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md tilt-5 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          >
            Want to add your voice? Get in touch
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
