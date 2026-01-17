"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const subjectOptions = [
  { value: "", label: "Select a subject (optional)" },
  { value: "general", label: "General inquiry" },
  { value: "press", label: "Press/Media" },
  { value: "endorsement", label: "Endorsement request" },
  { value: "event", label: "Event request" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Validate turnstile token
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
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
      setTurnstileToken(null);
      turnstileRef.current?.reset();

      // Track analytics
      trackEvent("Contact Form Submission", {
        subject: data.subject || "none",
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
          <p className="font-semibold">Message sent!</p>
          <p>We&apos;ll get back to you as soon as possible.</p>
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

      {/* Name */}
      <Input
        type="text"
        label="Name"
        placeholder="Your name"
        error={errors.name?.message}
        {...register("name")}
      />

      {/* Email */}
      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Subject dropdown (optional) */}
      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Subject (optional)
        </label>
        <select
          id="subject"
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "hover:border-primary-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors.subject && "border-error focus:ring-error"
          )}
          {...register("subject")}
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1.5 text-sm text-error">{errors.subject.message}</p>
        )}
      </div>

      {/* Message textarea */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          placeholder="Your message here..."
          rows={5}
          className={cn(
            "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "hover:border-primary-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y",
            errors.message && "border-error focus:ring-error"
          )}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-error">{errors.message.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Minimum 10 characters required
        </p>
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
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
