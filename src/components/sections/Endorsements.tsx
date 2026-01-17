"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { IMAGE_PATHS } from "@/lib/constants/images";

interface Endorsement {
  name: string;
  title: string;
  quote: string;
  image?: string;
}

export function Endorsements() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  const endorsements: Endorsement[] = [
    {
      name: "Mayor Jane Smith",
      title: "Mayor of Springfield",
      quote:
        "She understands how change is won—by building power and delivering for working people.",
      image: IMAGE_PATHS.endorsements.mayor,
    },
    {
      name: "John Martinez",
      title: "President, Local 1234",
      quote: `We need more workers representing us. ${candidateName} will fight for dignity and justice for all workers.`,
      image: IMAGE_PATHS.endorsements.unionPresident,
    },
    {
      name: "Sarah Johnson",
      title: "Community Organizer",
      quote: `${candidateName} has been in the trenches with us for years. She's the real deal.`,
      image: IMAGE_PATHS.endorsements.organizer,
    },
  ];

  return (
    <SectionWrapper id="endorsements" background="default" className="relative overflow-hidden">
      {/* Retro decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-5 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-5 translate-y-1/2 translate-x-1/2" />
      
      {/* Section header */}
      <div className="relative mb-16 text-center">
        <div className="inline-block mb-4">
          <span className="text-sm font-bold uppercase tracking-widest text-accent-500">Community Support</span>
        </div>
        <h2 className="font-display text-4xl leading-none text-primary-600 sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
          Endorsements
        </h2>
        <p className="mt-6 text-xl text-gray-800 sm:text-2xl font-medium max-w-2xl mx-auto">
          Trusted leaders and community members supporting our campaign
        </p>
      </div>

      {/* Endorsements list */}
      <motion.div
        className="space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {endorsements.map((endorsement, index) => {
          const isEven = index % 2 === 1;
          const hasImage = Boolean(endorsement.image);

          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={cn(
                "grid gap-8 lg:gap-12",
                hasImage
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1 lg:max-w-3xl lg:mx-auto"
              )}
            >
              {/* Image (left for odd, right for even) */}
              {hasImage && (
                <div
                  className={cn(
                    "order-2 lg:order-1",
                    isEven && "lg:order-2"
                  )}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                    <OptimizedImage
                      src={endorsement.image!}
                      alt={`${endorsement.name}, ${endorsement.title}`}
                      fill
                      priority={false}
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}

              {/* Quote card (right for odd, left for even) */}
              <div
                className={cn(
                  "order-1 flex items-center lg:order-2",
                  isEven && "lg:order-1"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full rounded-xl bg-white p-8 shadow-xl border-2 border-gray-100 lg:p-10"
                >
                  {/* Retro accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-500 rounded-t-xl"></div>
                  
                  {/* Decorative quotation marks */}
                  <div className="absolute left-6 top-6 text-accent-500 opacity-20">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-20 w-20 lg:h-24 lg:w-24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote content */}
                  <div className="relative z-10">
                    <blockquote className="mb-8">
                      <p className="font-display text-2xl leading-tight text-navy sm:text-3xl lg:text-4xl tracking-tight">
                        {endorsement.quote}
                      </p>
                    </blockquote>

                    {/* Attribution */}
                    <div className="border-t-2 border-accent-500/20 pt-6">
                      <p className="font-display text-xl font-bold text-primary-600 uppercase tracking-wide">
                        {endorsement.name}
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-600 uppercase tracking-wider">
                        {endorsement.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
