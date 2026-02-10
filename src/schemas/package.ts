import { z } from "zod/v4";

export const packageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  monthly_price: z.number().nullable().default(null),
  yearly_price: z.number().nullable().default(null),
  features: z
    .array(z.object({ text: z.string(), included: z.boolean() }))
    .default([]),
  is_popular: z.boolean().default(false),
  cta_text: z.string().default("Get Started"),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

export type PackageFormData = z.infer<typeof packageSchema>;
