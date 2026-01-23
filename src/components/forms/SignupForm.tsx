"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { signupSchema, type SignupFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface SignupFormProps {
  variant?: "hero" | "footer";
}

export function SignupForm({ variant = "hero" }: SignupFormProps) {
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Extract UTM parameters from URL
  const getUTMParams = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
    };
  };

  const onSubmit = async (data: SignupFormData) => {
    // Validate turnstile token
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const utmParams = getUTMParams();
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          zip_code: data.zip_code,
          turnstileToken: turnstileToken,
          source: variant,
          ...utmParams,
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
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      // Track analytics
      trackEvent("Signup", {
        source: variant,
        ...utmParams,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "space-y-4",
        variant === "footer" && "max-w-md"
      )}
    >
      {/* Success message */}
      {isSuccess && (
        <div className="rounded-lg bg-success/10 border border-success/20 p-4 text-sm text-success">
          <p className="font-semibold">You&apos;re in! 🎉</p>
          <p>Check your email for next steps.</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-error/10 border border-error/20 p-4 text-sm text-error">
          {error}
        </div>
      )}

      {/* Hidden turnstile token field for validation */}
      <input
        type="hidden"
        {...register("turnstileToken")}
      />

      {/* Form fields */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Input
          type="text"
          label="First Name"
          placeholder="First name"
          error={errors.first_name?.message}
          {...register("first_name")}
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Last name"
          error={errors.last_name?.message}
          {...register("last_name")}
        />
        <Input
          type="email"
          label="Email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="tel"
          label="Phone"
          placeholder="(555) 123-4567"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <div className="sm:col-span-2">
          <Input
            type="text"
            label="ZIP Code"
            placeholder="07302"
            error={errors.zip_code?.message}
            {...register("zip_code")}
            className="sm:max-w-[200px]"
          />
        </div>
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
        {isSubmitting ? "Joining..." : "Join the Campaign"}
      </Button>

      {/* Legal text */}
      <p className="text-xs leading-relaxed text-slate-500">
        By signing up, you agree to receive campaign updates via email and text. 
        Message and data rates may apply. Text STOP to opt out.{" "}
        <Link
          href="/privacy"
          className="underline hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-sm"
        >
          Privacy Policy
        </Link>
        {" · "}
        <Link
          href="/terms"
          className="underline hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-sm"
        >
          Terms of Service
        </Link>
      </p>
    </form>
  );
}
