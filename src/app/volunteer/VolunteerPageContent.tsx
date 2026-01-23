"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

// Volunteer form schema with full address
const volunteerPageSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 11;
      },
      { message: "Phone number must be 10-11 digits" }
    ),
  text_opt_in: z.boolean().default(false),
  address_line1: z.string().min(1, "Street address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2 characters (e.g., NJ)"),
  zip_code: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
  interests: z.array(z.string()).optional(),
  availability: z.string().optional(),
  turnstileToken: z.string().min(1, "Please complete verification"),
});

type VolunteerPageFormData = z.infer<typeof volunteerPageSchema>;

const volunteerInterests = [
  { id: "canvassing", label: "Door-to-door canvassing" },
  { id: "phone_banking", label: "Phone banking" },
  { id: "text_banking", label: "Text banking" },
  { id: "events", label: "Event support" },
  { id: "social_media", label: "Social media" },
  { id: "data_entry", label: "Data entry" },
  { id: "photography", label: "Photography/Videography" },
  { id: "other", label: "Other" },
];

export function VolunteerPageContent() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<VolunteerPageFormData>({
    resolver: zodResolver(volunteerPageSchema),
    defaultValues: {
      text_opt_in: false,
      state: "NJ",
    },
  });

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const onSubmit = async (data: VolunteerPageFormData) => {
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          interests: selectedInterests,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setIsSuccess(true);
      reset();
      setSelectedInterests([]);
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      trackEvent("Volunteer_Signup", {
        interests: selectedInterests.join(","),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-500 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-slate-900 mb-4">
              Welcome to the team!
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for volunteering with the {candidateName} campaign. 
              We&apos;ll be in touch soon with next steps.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <div className="max-w-2xl">
            <div className="uppercase text-xs tracking-[0.2em] text-primary-400 font-medium mb-4">
              Join the Movement
            </div>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl mb-6">
              Volunteer with David
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              People power wins elections. Join hundreds of volunteers building 
              a campaign that puts working families first.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              Contact Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="text"
                label="First Name *"
                placeholder="First name"
                error={errors.first_name?.message}
                {...register("first_name")}
              />
              <Input
                type="text"
                label="Last Name *"
                placeholder="Last name"
                error={errors.last_name?.message}
                {...register("last_name")}
              />
              <Input
                type="email"
                label="Email *"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                type="tel"
                label="Phone *"
                placeholder="(555) 123-4567"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            
            {/* Text opt-in */}
            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                {...register("text_opt_in")}
                className="mt-1 w-4 h-4 border-slate-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-slate-600">
                I agree to receive text messages from the campaign. Message and data 
                rates may apply. Reply STOP to opt out.
              </span>
            </label>
          </div>

          {/* Address */}
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              Address
            </h2>
            <div className="grid gap-4">
              <Input
                type="text"
                label="Street Address *"
                placeholder="123 Main Street"
                error={errors.address_line1?.message}
                {...register("address_line1")}
              />
              <Input
                type="text"
                label="Apartment, suite, etc."
                placeholder="Apt 4B"
                error={errors.address_line2?.message}
                {...register("address_line2")}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input
                  type="text"
                  label="City *"
                  placeholder="Jersey City"
                  error={errors.city?.message}
                  {...register("city")}
                />
                <Input
                  type="text"
                  label="State *"
                  placeholder="NJ"
                  maxLength={2}
                  error={errors.state?.message}
                  {...register("state")}
                />
                <Input
                  type="text"
                  label="ZIP Code *"
                  placeholder="07302"
                  error={errors.zip_code?.message}
                  {...register("zip_code")}
                />
              </div>
            </div>
          </div>

          {/* Volunteer Interests */}
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              How would you like to help?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {volunteerInterests.map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center gap-3 p-4 border-2 text-left transition-colors ${
                    selectedInterests.includes(interest.id)
                      ? "border-primary-500 bg-primary-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 flex items-center justify-center border-2 ${
                      selectedInterests.includes(interest.id)
                        ? "border-primary-500 bg-primary-500"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedInterests.includes(interest.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-slate-900">{interest.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
              Availability (optional)
            </h2>
            <textarea
              {...register("availability")}
              rows={3}
              placeholder="Let us know your general availability (weekends, evenings, etc.)"
              className="w-full px-4 py-3 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Turnstile */}
          <input type="hidden" {...register("turnstileToken")} />
          {turnstileSiteKey && (
            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onSuccess={(token) => {
                  setTurnstileToken(token);
                  setValue("turnstileToken", token);
                }}
                options={{ theme: "light", size: "normal" }}
              />
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting || !turnstileToken}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Sign Up to Volunteer"}
          </Button>

          {/* Legal */}
          <p className="text-xs text-slate-500 leading-relaxed text-center">
            By submitting, you agree to our{" "}
            <Link href="/privacy" className="underline hover:text-slate-700">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline hover:text-slate-700">
              Terms of Service
            </Link>
            .
          </p>
        </form>
      </div>
    </main>
  );
}
