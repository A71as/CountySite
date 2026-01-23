"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

// =============================================================================
// ENDORSEMENTS DATA - EASY TO EDIT
// Add new endorsements by copying the template below:
// {
//   name: "Organization or Person Name",
//   type: "organization" | "individual",
//   logo: "/images/endorsements/logo.png", // Optional for organizations
//   title: "Position or description", // Optional for individuals
//   quote: "Their endorsement quote here",
// }
// =============================================================================

interface Endorsement {
  name: string;
  type: "organization" | "individual";
  logo?: string;
  title?: string;
  quote?: string;
}

// Main endorsements data - edit this array to add/remove endorsements
const endorsements: Endorsement[] = [
  // -------------------------------------
  // ORGANIZATIONS
  // -------------------------------------
  {
    name: "North Jersey DSA",
    type: "organization",
    logo: "/images/endorsements/dsa-logo.png",
    quote: "David Guirgis represents the grassroots, working-class politics Hudson County needs. He's committed to fighting for housing justice, worker rights, and democratic accountability.",
  },
  {
    name: "Working Families Party",
    type: "organization",
    logo: "/images/endorsements/wfp-logo.png",
    quote: "We're proud to endorse David Guirgis for Hudson County Commissioner. He shares our vision of a county that works for working families, not developers and special interests.",
  },
  // -------------------------------------
  // Add more organizations here...
  // -------------------------------------
  
  // -------------------------------------
  // INDIVIDUALS  
  // -------------------------------------
  // {
  //   name: "Jane Doe",
  //   type: "individual",
  //   title: "Community Leader, Jersey City",
  //   quote: "David has been organizing alongside our community for years...",
  // },
  // -------------------------------------
  // Add more individuals here...
  // -------------------------------------
];

export function Endorsements() {
  const organizations = endorsements.filter((e) => e.type === "organization");
  const individuals = endorsements.filter((e) => e.type === "individual");

  return (
    <SectionWrapper id="endorsements" background="default">
      {/* Swiss-style section header */}
      <div className="mb-16">
        <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium mb-4">
          Coalition
        </div>
        <h2 className="font-heading text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl max-w-xl">
          Endorsed by leaders who fight for working people.
        </h2>
      </div>

      {/* Organization endorsements */}
      {organizations.length > 0 && (
        <div className="mb-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {organizations.map((endorsement, index) => (
              <motion.div
                key={endorsement.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="border-l-[6px] border-primary-500 bg-white p-8"
              >
                {/* Logo */}
                {endorsement.logo && (
                  <div className="mb-6 h-16 relative">
                    <OptimizedImage
                      src={endorsement.logo}
                      alt={`${endorsement.name} logo`}
                      height={64}
                      width={200}
                      className="h-16 w-auto object-contain object-left"
                    />
                  </div>
                )}
                
                {/* Organization name (fallback if no logo) */}
                {!endorsement.logo && (
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                    {endorsement.name}
                  </h3>
                )}

                {/* Quote */}
                {endorsement.quote && (
                  <blockquote className="text-slate-700 leading-relaxed">
                    &ldquo;{endorsement.quote}&rdquo;
                  </blockquote>
                )}

                {/* Name below quote if logo present */}
                {endorsement.logo && (
                  <p className="mt-4 font-semibold text-slate-900">
                    — {endorsement.name}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Individual endorsements */}
      {individuals.length > 0 && (
        <div>
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-8">
            Community Voices
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {individuals.map((endorsement) => (
              <motion.div
                key={endorsement.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="border border-slate-200 bg-white p-6"
              >
                {endorsement.quote && (
                  <blockquote className="text-slate-700 leading-relaxed mb-4 text-sm">
                    &ldquo;{endorsement.quote}&rdquo;
                  </blockquote>
                )}
                <div>
                  <p className="font-semibold text-slate-900">
                    {endorsement.name}
                  </p>
                  {endorsement.title && (
                    <p className="text-sm text-slate-600">{endorsement.title}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <p className="text-slate-600 text-center">
          Want to add your voice?{" "}
          <a 
            href="mailto:hello@davidguirgis.com?subject=Endorsement%20for%20David%20Guirgis"
            className="text-primary-600 font-semibold hover:text-primary-700 underline"
          >
            Get in touch
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
