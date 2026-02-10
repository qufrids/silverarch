"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { serviceSchema, type ServiceFormData } from "@/schemas/service";
import type { Service } from "@/types";

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Service;
}

export async function createService(formData: ServiceFormData) {
  const parsed = serviceSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase.from("services").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, formData: ServiceFormData) {
  const parsed = serviceSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}
