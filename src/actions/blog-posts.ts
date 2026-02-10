"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { blogPostSchema, type BlogPostFormData } from "@/schemas/blog-post";
import { calculateReadingTime } from "@/lib/utils";
import type { BlogPost } from "@/types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as BlogPost;
}

export async function createBlogPost(formData: BlogPostFormData) {
  const parsed = blogPostSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const postData = {
    ...parsed.data,
    reading_time: calculateReadingTime(parsed.data.content),
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert(postData);

  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function updateBlogPost(id: string, formData: BlogPostFormData) {
  const parsed = blogPostSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const postData = {
    ...parsed.data,
    reading_time: calculateReadingTime(parsed.data.content),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update(postData)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
