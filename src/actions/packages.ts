"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { packageSchema, type PackageFormData } from "@/schemas/package";
import type { Package } from "@/types";

export async function getPackages(): Promise<Package[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Package[];
}

export async function getAllPackages(): Promise<Package[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Package[];
}

export async function createPackage(formData: PackageFormData) {
  const parsed = packageSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase.from("packages").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/admin/packages");
  revalidatePath("/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function updatePackage(id: string, formData: PackageFormData) {
  const parsed = packageSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/packages");
  revalidatePath("/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function deletePackage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/packages");
  revalidatePath("/pricing");
  revalidatePath("/");
  return { success: true };
}
