"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/types";

export async function getSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("group_name");

  if (error) throw error;
  return (data ?? []) as SiteSetting[];
}

export async function getSettingsByGroup(
  group: string
): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .eq("group_name", group);

  if (error) return {};
  return Object.fromEntries((data ?? []).map((s) => [s.key, s.value]));
}

export async function getSetting(key: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return null;
  return data.value;
}

export async function updateSetting(key: string, value: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value })
    .eq("key", key);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
