import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";

// Configure fonts - retro-modern aesthetic
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Get environment variables for metadata
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
const county = process.env.NEXT_PUBLIC_COUNTY || "County";
const state = process.env.NEXT_PUBLIC_STATE || "State";

// Export metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${candidateName} for ${office}`,
    template: `%s | ${candidateName} for ${office}`,
  },
  description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}. Learn about our platform, volunteer opportunities, and how you can help bring change to our community.`,
  keywords: [
    candidateName,
    office,
    county,
    state,
    "campaign",
    "election",
    "politics",
    "volunteer",
    "donate",
    "yard sign",
    "political campaign",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${candidateName} for ${office}`,
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${candidateName} for ${office}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body
        className={`${inter.className} bg-cream text-navy antialiased`}
      >
        <StructuredData />
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
