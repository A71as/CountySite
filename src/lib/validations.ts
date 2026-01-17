import { z } from "zod";

// Zip code validation: 5 digits or 5+4 format
const zipCodeRegex = /^\d{5}(-\d{4})?$/;
const zipCodeSchema = z
  .string()
  .regex(zipCodeRegex, "Zip code must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)");

// Phone validation: 10-11 digits (strips non-digits for validation)
const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true; // Optional field
      const digitsOnly = val.replace(/\D/g, "");
      return digitsOnly.length >= 10 && digitsOnly.length <= 11;
    },
    { message: "Phone number must be 10-11 digits" }
  );

// Signup form validation
export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  zip_code: zipCodeSchema,
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

// Volunteer form validation
export const volunteerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema,
  zip_code: zipCodeSchema.optional(),
  interests: z.array(z.string()).optional(),
  availability: z.string().optional(),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

// Yard sign request validation
export const yardSignSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema,
  address_line1: z.string().min(1, "Address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2 characters (e.g., CA, NY)"),
  zip_code: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  quantity: z.number().int().min(1).max(5).default(1),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

// Export inferred TypeScript types
export type SignupFormData = z.infer<typeof signupSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type YardSignFormData = z.infer<typeof yardSignSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
