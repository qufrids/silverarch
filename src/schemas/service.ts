import { z } from "zod/v4";

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  short_description: z.string().min(10, "Description is required"),
  long_description: z.string().optional(),
  icon: z.string().optional(),
  image_url: z.string().optional(),
  features: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
