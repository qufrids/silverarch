import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PackageForm } from "@/components/forms/package-form";
import type { Package } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Package</h1>
        <p className="text-sm text-gray-400">
          Update &ldquo;{(data as Package).name}&rdquo;
        </p>
      </div>
      <PackageForm pkg={data as Package} />
    </div>
  );
}
