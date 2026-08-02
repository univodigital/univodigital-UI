import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter your phone number.")
    .max(20, "Phone number is too long.")
    .regex(
      /^[\d\s+\-()]+$/,
      "Please enter a valid phone number.",
    ),
  subject: z.enum([
    "general",
    "consultation",
    "branding",
    "website",
    "social",
    "performance",
    "other",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more detail (at least 20 characters).")
    .max(4000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
