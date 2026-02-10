import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/forms/project-form";
import type { Project } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="text-sm text-gray-400">
          Update &ldquo;{(data as Project).title}&rdquo;
        </p>
      </div>
      <ProjectForm project={data as Project} />
    </div>
  );
}
