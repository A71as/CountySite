"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { signupSchema, type SignupFormData } from "@/lib/validations";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface SignupFormProps {
  variant?: "hero" | "footer";
  /** Button label (e.g. "COUNT ME IN" for hero) */
  submitLabel?: string;
  /** "short" = "We respect your privacy." + links only */
  privacyVariant?: "short" | "full";
  /** Compact layout for footer — denser grid, smaller spacing */
  compact?: boolean;
}

export function SignupForm({
  variant = "hero",
  submitLabel,
  privacyVariant = "full",
  compact = false,
}: SignupFormProps) {
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
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
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
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
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

  const isHero = variant === "hero";
  const inputVariant = isHero ? "hero" : "default";

  const formContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "min-w-0 w-full",
        variant === "footer"
          ? compact
            ? "space-y-2 max-w-full"
            : "space-y-3 max-w-md"
          : "space-y-4"
      )}
    >
      {/* Success message */}
      {isSuccess && (
        <div className="organic-sm bg-success/10 border-2 border-success/20 p-4 text-sm text-success">
          <p className="font-subhead font-bold">You&apos;re in!</p>
          <p>Check your email for next steps.</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="organic-sm bg-error/10 border-2 border-error/20 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <input type="hidden" aria-label="Turnstile verification token" {...register("turnstileToken")} />

      {isHero ? (
        <div className="hero-form-fields">
          <div className="hero-form-row hero-form-row-1">
            <Input
              type="text"
              label="First Name"
              placeholder="Your first name"
              error={errors.first_name?.message}
              inputVariant={inputVariant}
              {...register("first_name")}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Your last name"
              error={errors.last_name?.message}
              inputVariant={inputVariant}
              {...register("last_name")}
            />
          </div>
          <div className="hero-form-row hero-form-row-2">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              inputVariant={inputVariant}
              {...register("email")}
            />
            <Input
              type="tel"
              label="Phone (optional)"
              placeholder="For text updates"
              error={errors.phone?.message}
              inputVariant={inputVariant}
              {...register("phone")}
            />
            <div className="hero-form-zip-wrap">
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                label="ZIP Code"
                placeholder="Your ZIP"
                error={errors.zip_code?.message}
                inputVariant={inputVariant}
                {...register("zip_code")}
              />
            </div>
          </div>
        </div>
      ) : compact ? (
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          <Input
            type="text"
            label="First"
            placeholder="First"
            error={errors.first_name?.message}
            inputVariant={inputVariant}
            {...register("first_name")}
          />
          <Input
            type="text"
            label="Last"
            placeholder="Last"
            error={errors.last_name?.message}
            inputVariant={inputVariant}
            {...register("last_name")}
          />
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            error={errors.email?.message}
            inputVariant={inputVariant}
            {...register("email")}
          />
          <div className="flex gap-2 items-end md:col-span-1">
            <Input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              label="ZIP"
              placeholder="ZIP"
              error={errors.zip_code?.message}
              inputVariant={inputVariant}
              {...register("zip_code")}
              className="min-w-0 flex-1"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
              className="shrink-0 font-subhead font-bold uppercase text-xs organic-sm"
            >
              {isSubmitting ? "…" : "Join"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <Input
            type="text"
            label="First Name"
            placeholder="Your first name"
            error={errors.first_name?.message}
            inputVariant={inputVariant}
            {...register("first_name")}
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Your last name"
            error={errors.last_name?.message}
            inputVariant={inputVariant}
            {...register("last_name")}
          />
          <div className="sm:col-span-2">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              inputVariant={inputVariant}
              {...register("email")}
            />
          </div>
          <Input
            type="tel"
            label="Phone (optional)"
            placeholder="For text updates"
            error={errors.phone?.message}
            inputVariant={inputVariant}
            {...register("phone")}
          />
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            label="ZIP Code"
            placeholder="Your ZIP"
            error={errors.zip_code?.message}
            inputVariant={inputVariant}
            {...register("zip_code")}
            className="sm:max-w-[140px]"
          />
        </div>
      )}

      {turnstileSiteKey && (
        <div className={cn("flex justify-center", isHero && "hero-turnstile-wrap")}>
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setValue("turnstileToken", token);
            }}
            options={{
              theme: "light",
              size: variant === "footer" ? "compact" : "normal",
            }}
          />
        </div>
      )}

      {privacyVariant !== "short" && (
        <p className="font-body text-xs leading-relaxed text-slate-600 bg-slate-50 p-3 organic-sm border border-slate-200">
          We respect your privacy. Unsubscribe anytime.
        </p>
      )}

      {variant === "hero" ? (
        <button
          type="submit"
          disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
          className="count-me-in-button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="inline-block h-5 w-5 animate-spin mr-2 align-middle" aria-hidden />
              Sending...
            </>
          ) : (
            submitLabel ?? "COUNT ME IN"
          )}
        </button>
      ) : !compact ? (
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
          className="w-full font-subhead font-bold uppercase tracking-wide organic-md"
        >
          {isSubmitting ? "Sending..." : submitLabel ?? "Get Campaign Updates"}
        </Button>
      ) : null}

      {privacyVariant === "short" ? (
        <p className="hero-form-privacy mt-3">
          We respect your privacy.{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>
        </p>
      ) : (
        <p className="font-body text-xs leading-relaxed text-slate-500">
          By signing up, you agree to receive campaign updates via email and text.
          Message and data rates may apply. Text STOP to opt out.{" "}
          <Link href="/privacy" className="underline hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 organic-sm">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="underline hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 organic-sm">
            Terms of Service
          </Link>
        </p>
      )}
    </form>
  );

  if (isHero) {
    return <div className="hero-form-card w-full">{formContent}</div>;
  }

  return formContent;
}
