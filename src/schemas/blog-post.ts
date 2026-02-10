import { z } from "zod/v4";

export const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(50, "Content is too short"),
  cover_image_url: z.string().optional(),
  author_name: z.string().default("SilverArch Team"),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  reading_time: z.number().optional(),
  is_published: z.boolean().default(false),
  published_at: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
