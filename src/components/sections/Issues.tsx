"use client";

import {
  Home,
  Briefcase,
  Shield,
  Leaf,
  GraduationCap,
  HeartPulse,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface Issue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Issues() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  const issues: Issue[] = [
    {
      icon: Home,
      title: "Affordable Housing",
      description:
        "Fighting for rent stabilization, affordable development, and anti-displacement policies to keep families in their communities.",
    },
    {
      icon: Briefcase,
      title: "Good Local Jobs",
      description:
        "Supporting living wages, economic development, and small business growth to create opportunities for all residents.",
    },
    {
      icon: Shield,
      title: "Public Safety",
      description:
        "Advocating for community-based solutions, mental health resources, and violence prevention programs that work.",
    },
    {
      icon: Leaf,
      title: "Clean Environment",
      description:
        "Protecting our parks, ensuring clean water, and supporting the transition to clean energy for future generations.",
    },
    {
      icon: GraduationCap,
      title: "Quality Education",
      description:
        "Championing school funding, teacher support, and early childhood programs to give every child a strong start.",
    },
    {
      icon: HeartPulse,
      title: "Healthcare Access",
      description:
        "Expanding affordable care, mental health services, and reproductive healthcare access for all residents.",
    },
  ];

  return (
    <SectionWrapper id="issues" background="default" className="bg-white relative overflow-hidden">
      {/* Retro decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-5 translate-y-1/2 -translate-x-1/2" />
      
      {/* Section header */}
      <div className="relative mb-16 text-center">
        <div className="inline-block mb-4">
          <span className="text-sm font-bold uppercase tracking-widest text-accent-500">Our Platform</span>
        </div>
        <h2 className="font-display text-4xl leading-none text-primary-600 sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
          Fighting for What Matters
        </h2>
        <p className="mt-6 text-xl text-gray-800 sm:text-2xl font-medium max-w-2xl mx-auto">
          Real solutions for the challenges facing {county} families.
        </p>
      </div>

      {/* Issues grid */}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
        {issues.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-accent-500 hover:shadow-2xl"
            >
              {/* Retro accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-500 rounded-t-xl"></div>
              
              {/* Icon - retro style */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative">
                  <Icon className="h-12 w-12 text-accent-500 group-hover:text-retro-red transition-colors" />
                </div>
              </div>

              {/* Title - retro-modern typography */}
              <h3 className="mb-4 font-display text-2xl font-bold text-navy leading-tight tracking-tight">
                {issue.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-base">
                {issue.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
