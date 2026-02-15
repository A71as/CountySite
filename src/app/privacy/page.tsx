import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://davidguirgis.com";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${candidateName}'s campaign for ${office}. Learn how we collect, use, and protect your personal information.`,
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${candidateName} for ${office}`,
    description: `Privacy policy for ${candidateName}'s campaign for ${office}.`,
    url: `${siteUrl}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${candidateName} for ${office}`,
    description: `Privacy policy for ${candidateName}'s campaign for ${office}.`,
  },
};

export default function PrivacyPage() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";
  const campaignEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";
  const lastUpdated = "February 6, 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none font-body">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary-on-light-pink sm:text-5xl uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg leading-relaxed">
          This Privacy Policy describes how {candidateName} for {office} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
          collects, uses, and protects your personal information when you visit our campaign
          website and interact with our services.
        </p>

        {/* Information We Collect */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Information We Collect
          </h2>
          <p className="mt-4 leading-relaxed">
            We collect information that you voluntarily provide to us, including:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Contact Information:</strong> Name, email address, phone number, and
              mailing address when you sign up, volunteer, request a yard sign, or contact us.
            </li>
            <li>
              <strong>Location Information:</strong> ZIP code and address information for
              organizing and outreach purposes.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect anonymized usage data through analytics
              tools to understand how visitors use our website. This may include pages visited,
              time spent on pages, and general location information (city/state level).
            </li>
            <li>
              <strong>Volunteer Information:</strong> If you volunteer, we may collect
              information about your interests, availability, and activities.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            How We Use Your Information
          </h2>
          <p className="mt-4 leading-relaxed">
            We use collected information for the following purposes:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Campaign Updates and Communications:</strong> To send you campaign news,
              event invitations, and updates about {candidateName}&apos;s campaign for {office}.
            </li>
            <li>
              <strong>Volunteer Coordination:</strong> To organize volunteer activities, assign
              tasks, and communicate with volunteers about opportunities.
            </li>
            <li>
              <strong>Yard Sign Fulfillment:</strong> To process and deliver yard sign requests
              to your address.
            </li>
            <li>
              <strong>Analytics and Improvement:</strong> To analyze website usage and improve
              our website and campaign outreach efforts.
            </li>
            <li>
              <strong>Campaign Finance Compliance:</strong> Federal and state campaign finance
              laws require us to collect and report certain information about contributors and
              supporters.
            </li>
          </ul>
        </section>

        {/* Text Message Communications */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Text Message (SMS) Communications
          </h2>
          <p className="mt-4 leading-relaxed">
            By providing your phone number and opting in to receive text messages, you consent
            to receive automated text messages from {candidateName} for {office}. Message
            frequency varies. Message and data rates may apply.
          </p>
          <p className="mt-4 leading-relaxed">
            You can opt out at any time by replying <strong>STOP</strong> to any message. For
            help, reply <strong>HELP</strong>. Carriers are not liable for delayed or undelivered
            messages.
          </p>
        </section>

        {/* Information Sharing */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Information Sharing
          </h2>
          <p className="mt-4 leading-relaxed">
            <strong>We do not sell your personal information.</strong> We may share your
            information in the following circumstances:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Campaign Staff and Volunteers:</strong> Authorized campaign staff and
              volunteers may access your information to coordinate activities and communicate
              with you.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with third-party
              service providers who help us operate our website, send emails, process
              donations, or manage data. These providers are contractually obligated to protect
              your information.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information when required by
              law, including campaign finance disclosure requirements. Federal law requires us to
              collect and report the name, address, occupation, and employer of contributors.
            </li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Your Rights</h2>
          <p className="mt-4 leading-relaxed">
            You have the following rights regarding your personal information:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Access:</strong> You can request access to the personal information we
              hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct any inaccurate or
              incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your personal
              information, subject to legal and campaign finance requirements.
            </li>
            <li>
              <strong>Opt Out:</strong> You can opt out of receiving communications from us at
              any time by clicking unsubscribe links in emails, replying STOP to text messages,
              or contacting us directly.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            To exercise these rights, please contact us using the information provided in the
            &quot;Contact Us&quot; section below.
          </p>
        </section>

        {/* Data Security */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Data Security</h2>
          <p className="mt-4 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 leading-relaxed">
            If you have questions about this Privacy Policy or wish to exercise your rights,
            please contact us:
          </p>
          <div className="mt-4 organic-sm bg-gray-50 p-4">
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${campaignEmail}`}
                className="text-primary-600 hover:text-primary-700 underline"
              >
                {campaignEmail}
              </a>
            </p>
            <p>
              <strong>Campaign:</strong> {candidateName} for {office}
            </p>
            <p>
              <strong>Location:</strong> {county} County, {state}
            </p>
          </div>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Changes to This Privacy Policy
          </h2>
          <p className="mt-4 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any
            material changes by posting the new Privacy Policy on this page and updating the
            &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        {/* Back to home */}
        <div className="mt-12 pt-8 organic-divider-t">
          <Link href="/">
            <Button variant="secondary" size="md">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
