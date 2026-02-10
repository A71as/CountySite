"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { volunteerSchema, type VolunteerFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const interestOptions = [
  "Knock on doors",
  "Make phone calls",
  "Send texts",
  "Help at events",
  "Social media outreach",
  "Data entry",
  "Other",
];

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: VolunteerFormData) => {
    // Validate turnstile token
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      // Success
      setIsSuccess(true);
      reset();
      setValue("turnstileToken", "");
      setValue("interests", []);
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      // Track analytics
      trackEvent("Volunteer Signup", {
        interests: data.interests?.length || 0,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
      // Reset turnstile on error
      setTurnstileToken(null);
      setValue("turnstileToken", "");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Success message */}
      {isSuccess && (
        <div className="organic-sm bg-success/20 border-2 border-success/30 p-4 text-sm text-white">
          <p className="font-subhead font-bold">Thanks for signing up!</p>
          <p>A volunteer coordinator will be in touch soon.</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="organic-sm bg-error/20 border-2 border-error/30 p-4 text-sm text-white">
          {error}
        </div>
      )}

      {/* Hidden turnstile token field for validation */}
      <input type="hidden" {...register("turnstileToken")} />

      {/* Name fields - two columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide">
            First Name
          </label>
          <Input
            type="text"
            placeholder="John"
            error={errors.first_name?.message}
            className="bg-white text-gray-900"
            {...register("first_name")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide">
            Last Name
          </label>
          <Input
            type="text"
            placeholder="Doe"
            error={errors.last_name?.message}
            className="bg-white text-gray-900"
            {...register("last_name")}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide">
          Email
        </label>
        <Input
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          className="bg-white text-gray-900"
          {...register("email")}
        />
      </div>

      {/* Phone and ZIP - two columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide">
            Phone (optional)
          </label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            error={errors.phone?.message}
            className="bg-white text-gray-900"
            {...register("phone")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide">
            ZIP Code
          </label>
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="12345"
            error={errors.zip_code?.message}
            className="bg-white text-gray-900"
            {...register("zip_code")}
          />
        </div>
      </div>

      {/* Interest checkboxes */}
      <div>
        <label className="mb-3 block text-sm font-subhead font-bold text-white tracking-wide">
          How would you like to help? (select all that apply)
        </label>
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {interestOptions.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center space-x-2 organic-sm border-2 border-white/20 bg-white/10 p-3 hover:bg-white/20 hover:border-white/30 transition-all duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={field.value?.includes(interest) || false}
                    onChange={(e) => {
                      const currentValue = field.value || [];
                      if (e.target.checked) {
                        field.onChange([...currentValue, interest]);
                      } else {
                        field.onChange(currentValue.filter((item) => item !== interest));
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="text-sm text-white">{interest}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.interests && (
          <p className="mt-1.5 text-sm text-error">{errors.interests.message}</p>
        )}
      </div>

      {/* Availability textarea */}
      <div>
        <label
          htmlFor="availability"
          className="mb-1.5 block text-sm font-subhead font-bold text-white tracking-wide"
        >
          Availability (optional)
        </label>
        <textarea
          id="availability"
          placeholder="When are you typically available to volunteer?"
          rows={3}
          className={cn(
            "w-full organic-input border-2 border-white/20 bg-white px-4 py-3 text-sm text-gray-900 transition-all duration-200",
            "placeholder:text-slate-400 placeholder:italic",
            "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-600 focus:border-white/40",
            "hover:border-white/30 hover:shadow-sm",
            errors.availability && "border-error focus:ring-error"
          )}
          {...register("availability")}
        />
        {errors.availability && (
          <p className="mt-1.5 text-sm text-error">{errors.availability.message}</p>
        )}
      </div>

      {/* Turnstile */}
      {turnstileSiteKey && (
        <div className="flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setValue("turnstileToken", token);
            }}
            options={{
              theme: "light",
              size: "normal",
            }}
          />
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        variant="accent"
        size="md"
        isLoading={isSubmitting}
        disabled={isSubmitting || !turnstileToken}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Sign Up to Volunteer"}
      </Button>
    </form>
  );
}
