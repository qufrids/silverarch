"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { projectSchema, type ProjectFormData } from "@/schemas/project";
import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("display_order")
    .limit(3);

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Project;
}

export async function createProject(formData: ProjectFormData) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}

export async function updateProject(id: string, formData: ProjectFormData) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}
