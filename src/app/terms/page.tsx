import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://davidguirgis.com";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${candidateName}'s campaign for ${office}. Read our terms and conditions for using the campaign website.`,
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${candidateName} for ${office}`,
    description: `Terms of service for ${candidateName}'s campaign for ${office}.`,
    url: `${siteUrl}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Terms of Service | ${candidateName} for ${office}`,
    description: `Terms of service for ${candidateName}'s campaign for ${office}.`,
  },
};

export default function TermsPage() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";
  const campaignEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";
  const actBlueUrl =
    process.env.NEXT_PUBLIC_ACTBLUE_URL ||
    "https://secure.actblue.com/donate/david-for-commissioner";
  const lastUpdated = "February 6, 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none font-body">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary-600 sm:text-5xl uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <p className="text-lg leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated
          by {candidateName} for {office} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using this
          website, you agree to be bound by these Terms.
        </p>

        {/* Acceptance of Terms */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Acceptance of Terms
          </h2>
          <p className="mt-4 leading-relaxed">
            By accessing or using this website, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and our Privacy Policy. If you do not agree to
            these Terms, please do not use this website.
          </p>
        </section>

        {/* Use of Website */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Use of Website</h2>
          <p className="mt-4 leading-relaxed">
            This website is provided for informational purposes and to facilitate campaign
            communications, volunteer activities, and support for {candidateName}&apos;s campaign for{" "}
            {office}.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong>Age Requirement:</strong> You must be at least 13 years old to submit forms
            or provide personal information through this website. If you are under 13, please do
            not use this website or provide any personal information.
          </p>
          <p className="mt-4 leading-relaxed">
            You agree to use this website only for lawful purposes and in accordance with these
            Terms. You agree not to:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Use the website in any way that violates any applicable law or regulation</li>
            <li>
              Transmit any malicious code, viruses, or other harmful materials through the
              website
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the website or its systems
            </li>
            <li>Interfere with or disrupt the website or servers connected to the website</li>
          </ul>
        </section>

        {/* User Submissions */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">User Submissions</h2>
          <p className="mt-4 leading-relaxed">
            When you submit information through forms on this website (including signup forms,
            volunteer forms, yard sign requests, or contact forms), you agree that:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Accuracy:</strong> All information you provide is accurate, current, and
              complete to the best of your knowledge.
            </li>
            <li>
              <strong>No Fraudulent Submissions:</strong> You will not submit false, fraudulent,
              or misleading information.
            </li>
            <li>
              <strong>Campaign Communications:</strong> By providing your contact information,
              you consent to receive communications from the campaign, including emails, text
              messages, and phone calls. You may opt out at any time.
            </li>
            <li>
              <strong>Use of Information:</strong> The campaign may use the information you
              provide for campaign purposes, including organizing volunteers, sending updates,
              and complying with campaign finance laws.
            </li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Intellectual Property
          </h2>
          <p className="mt-4 leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software,
            is the property of {candidateName} for {office} or its content suppliers and is
            protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mt-4 leading-relaxed">
            You are granted a limited, non-exclusive, non-transferable license to access and use
            this website for personal, non-commercial purposes related to supporting the
            campaign. You may share campaign content on social media or other platforms for
            non-commercial campaign support purposes, provided you do not modify the content and
            attribute it to the campaign.
          </p>
          <p className="mt-4 leading-relaxed">
            You may not reproduce, distribute, modify, create derivative works of, publicly
            display, or commercially exploit any content from this website without our express
            written permission.
          </p>
        </section>

        {/* Donations */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Donations</h2>
          <p className="mt-4 leading-relaxed">
            Donations to {candidateName} for {office} are processed through third-party payment
            processors, including ActBlue. When you make a donation, you are subject to the terms
            and conditions of the payment processor.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong>Campaign Finance Compliance:</strong> Federal and state campaign finance laws
            require us to collect and report certain information about contributors, including
            name, address, occupation, and employer. By making a donation, you consent to the
            collection and reporting of this information as required by law.
          </p>
          <p className="mt-4 leading-relaxed">
            Contributions are not tax deductible. All contributions are subject to applicable
            contribution limits and regulations.
          </p>
          <p className="mt-4 leading-relaxed">
            For questions about donations, please contact us at{" "}
            <a
              href={`mailto:${campaignEmail}`}
              className="text-primary-600 hover:text-primary-700 underline"
            >
              {campaignEmail}
            </a>
            .
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Disclaimer</h2>
          <p className="mt-4 leading-relaxed">
            This website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
            either express or implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
          <p className="mt-4 leading-relaxed">
            We do not warrant that the website will be uninterrupted, secure, or error-free, or
            that defects will be corrected. We do not warrant or make any representations
            regarding the use or the results of the use of the website in terms of its
            correctness, accuracy, reliability, or otherwise.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Limitation of Liability
          </h2>
          <p className="mt-4 leading-relaxed">
            To the fullest extent permitted by applicable law, {candidateName} for {office}, its
            officers, employees, volunteers, and agents shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or
            revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses resulting from:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Your access to or use of or inability to access or use the website</li>
            <li>Any conduct or content of third parties on the website</li>
            <li>Any unauthorized access, use, or alteration of your transmissions or content</li>
            <li>Any other matter relating to the website</li>
          </ul>
          <p className="mt-4 leading-relaxed">
            In no event shall our total liability to you for all damages exceed the amount you
            paid to us, if any, in the twelve (12) months prior to the action giving rise to the
            liability.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Changes to Terms</h2>
          <p className="mt-4 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify you of any
            material changes by posting the updated Terms on this page and updating the &quot;Last
            updated&quot; date. Your continued use of the website after any such changes constitutes
            your acceptance of the new Terms.
          </p>
          <p className="mt-4 leading-relaxed">
            We encourage you to review these Terms periodically to stay informed about how we
            are protecting your rights and governing your use of the website.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-gray-900">Contact</h2>
          <p className="mt-4 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us:
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
