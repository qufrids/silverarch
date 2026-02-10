import { z } from "zod/v4";

export const testimonialSchema = z.object({
  client_name: z.string().min(2, "Name is required"),
  client_title: z.string().optional(),
  client_company: z.string().optional(),
  client_avatar_url: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  rating: z.number().min(1).max(5).default(5),
  project_id: z.string().optional(),
  is_featured: z.boolean().default(false),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;
