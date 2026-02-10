"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { leadSchema, type LeadFormData } from "@/schemas/lead";
import type { Lead } from "@/types";

export async function createLead(formData: LeadFormData) {
  const parsed = leadSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Lead;
}

export async function markLeadAsRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ is_read: true })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function archiveLead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ is_archived: true })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/leads");
  return { success: true };
}

export async function updateLeadNotes(id: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ notes })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/leads");
  return { success: true };
}
