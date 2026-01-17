import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { VideoQuote } from "@/components/sections/VideoQuote";
import { About } from "@/components/sections/About";
import { Issues } from "@/components/sections/Issues";
import { Endorsements } from "@/components/sections/Endorsements";
import { Events } from "@/components/sections/Events";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { YardSign } from "@/components/sections/YardSign";
import { Donate } from "@/components/sections/Donate";
import { News } from "@/components/sections/News";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
const county = process.env.NEXT_PUBLIC_COUNTY || "County";
const state = process.env.NEXT_PUBLIC_STATE || "State";

export const metadata: Metadata = {
  title: `${candidateName} for ${office}`,
  description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}. Learn about our platform, volunteer opportunities, and how you can help bring change to our community.`,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoQuote />
      <About />
      <Issues />
      <Endorsements />
      <Events />
      <GetInvolved />
      <YardSign />
      <Donate />
      <News />
    </>
  );
}
