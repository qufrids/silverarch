import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "@/components/forms/service-form";
import type { Service } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Service</h1>
        <p className="text-sm text-gray-400">
          Update &ldquo;{(data as Service).title}&rdquo;
        </p>
      </div>
      <ServiceForm service={data as Service} />
    </div>
  );
}
