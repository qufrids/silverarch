"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  testimonialSchema,
  type TestimonialFormData,
} from "@/schemas/testimonial";
import type { Testimonial } from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("display_order")
    .limit(3);

  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function createTestimonial(formData: TestimonialFormData) {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(
  id: string,
  formData: TestimonialFormData
) {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
