import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Commissioner } from "@/components/sections/Commissioner";
import { Donate } from "@/components/sections/Donate";
import { Issues } from "@/components/sections/Issues";
import { Endorsements } from "@/components/sections/Endorsements";
import { SectionDivider } from "@/components/ui/SectionDivider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://davidguirgis.com";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";
const county = process.env.NEXT_PUBLIC_COUNTY || "Hudson";
const state = process.env.NEXT_PUBLIC_STATE || "New Jersey";

export const metadata: Metadata = {
  title: `${candidateName} for ${office}`,
  description: `Join ${candidateName}'s campaign for ${office}. Fighting for transparent government, social housing, universal childcare, and free community college in ${county} County, ${state}.`,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office}. Fighting for transparent government, social housing, universal childcare, and free community college.`,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office}. Fighting for transparent government, social housing, universal childcare, and free community college.`,
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero with contact form */}
      <Hero />
      <SectionDivider index={0} />

      {/* Bio section */}
      <About />
      <SectionDivider index={1} />

      {/* WTF is a County Commissioner + District Map */}
      <Commissioner />
      <SectionDivider index={2} />

      {/* Donation solicitation */}
      <Donate />
      <SectionDivider index={3} />

      {/* Big 4 Policies */}
      <Issues />
      <SectionDivider index={4} />

      {/* Endorsements */}
      <Endorsements />
    </>
  );
}
