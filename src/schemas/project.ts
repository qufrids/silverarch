import { z } from "zod/v4";

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  short_description: z.string().min(10, "Description is required"),
  long_description: z.string().optional(),
  client_name: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  thumbnail_url: z.string().optional(),
  images: z.array(z.string()).default([]),
  live_url: z.string().optional(),
  tech_stack: z.array(z.string()).default([]),
  results: z
    .array(z.object({ metric: z.string(), value: z.string() }))
    .default([]),
  is_featured: z.boolean().default(false),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
