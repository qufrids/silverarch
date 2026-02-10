"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const bucket = (formData.get("bucket") as string) || "images";

  if (!file) return { error: "No file provided" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return { success: true, url: publicUrl };
}

export async function deleteImage(url: string, bucket: string = "images") {
  const fileName = url.split("/").pop();
  if (!fileName) return { error: "Invalid URL" };

  const supabase = await createClient();
  const { error } = await supabase.storage.from(bucket).remove([fileName]);

  if (error) return { error: error.message };
  return { success: true };
}
