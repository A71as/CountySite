"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { yardSignSchema, type YardSignFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export function YardSignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<YardSignFormData>({
    resolver: zodResolver(yardSignSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: YardSignFormData) => {
    // Validate turnstile token
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/yard-sign", {
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
      setValue("quantity", 1);
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      // Track analytics
      trackEvent("Yard Sign Request", {
        quantity: data.quantity,
        state: data.state,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Success message */}
      {isSuccess && (
        <div className="rounded-lg bg-success/10 border border-success/20 p-4 text-sm text-success">
          <p className="font-semibold">Your yard sign request has been received!</p>
          <p>We'll deliver it within 1-2 weeks.</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-error/10 border border-error/20 p-4 text-sm text-error">
          {error}
        </div>
      )}

      {/* Hidden turnstile token field for validation */}
      <input type="hidden" {...register("turnstileToken")} />

      {/* Row 1: First name, Last name */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="text"
          label="First Name"
          placeholder="John"
          error={errors.first_name?.message}
          {...register("first_name")}
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Doe"
          error={errors.last_name?.message}
          {...register("last_name")}
        />
      </div>

      {/* Row 2: Email, Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="email"
          label="Email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="tel"
          label="Phone (optional)"
          placeholder="(555) 123-4567"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      {/* Row 3: Street address (full width) */}
      <Input
        type="text"
        label="Street Address"
        placeholder="123 Main Street"
        error={errors.address_line1?.message}
        {...register("address_line1")}
      />

      {/* Row 4: Address line 2 / Apt (full width, optional) */}
      <Input
        type="text"
        label="Address Line 2 / Apt (optional)"
        placeholder="Apt 4B"
        error={errors.address_line2?.message}
        {...register("address_line2")}
      />

      {/* Row 5: City, State (dropdown), ZIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          type="text"
          label="City"
          placeholder="Springfield"
          error={errors.city?.message}
          {...register("city")}
        />
        <div>
          <label
            htmlFor="state"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            State
          </label>
          <select
            id="state"
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              "hover:border-primary-400",
              "disabled:cursor-not-allowed disabled:opacity-50",
              errors.state && "border-error focus:ring-error"
            )}
            {...register("state")}
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1.5 text-sm text-error">{errors.state.message}</p>
          )}
        </div>
        <Input
          type="text"
          label="ZIP Code"
          placeholder="12345"
          error={errors.zip_code?.message}
          {...register("zip_code")}
        />
      </div>

      {/* Row 6: Quantity (number input or dropdown 1-5) */}
      <div>
        <label
          htmlFor="quantity"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Quantity
        </label>
        <select
          id="quantity"
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "hover:border-primary-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors.quantity && "border-error focus:ring-error"
          )}
          {...register("quantity", { valueAsNumber: true })}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "sign" : "signs"}
            </option>
          ))}
        </select>
        {errors.quantity && (
          <p className="mt-1.5 text-sm text-error">{errors.quantity.message}</p>
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
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        disabled={isSubmitting || !turnstileToken}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Request Yard Sign"}
      </Button>

      {/* Note below form */}
      <p className="text-xs leading-relaxed text-gray-600">
        Yard signs are available for addresses within {county}. For bulk requests,
        contact us.
      </p>
    </form>
  );
}
