"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/shared/glow-button";
import { createProject, updateProject } from "@/actions/projects";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types";
import { Plus, X } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [techStack, setTechStack] = useState<string[]>(
    project?.tech_stack || []
  );
  const [newTech, setNewTech] = useState("");

  function addTech() {
    if (newTech.trim()) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const data = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
      short_description: form.get("short_description") as string,
      long_description:
        (form.get("long_description") as string) || undefined,
      client_name: (form.get("client_name") as string) || undefined,
      category: form.get("category") as string,
      tech_stack: techStack,
      tags: [],
      images: [],
      results: [],
      is_featured: form.get("is_featured") === "on",
      display_order: Number(form.get("display_order")) || 0,
      is_active: form.get("is_active") === "on",
    };

    const result = project
      ? await updateProject(project.id, data)
      : await createProject(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(project ? "Project updated" : "Project created");
      router.push("/admin/projects");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            onChange={(e) => {
              if (!project) {
                const slugInput = document.getElementById(
                  "slug"
                ) as HTMLInputElement;
                if (slugInput) slugInput.value = slugify(e.target.value);
              }
            }}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={project?.slug}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description *</Label>
        <Textarea
          id="short_description"
          name="short_description"
          required
          rows={2}
          defaultValue={project?.short_description}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="long_description">
          Long Description (Markdown)
        </Label>
        <Textarea
          id="long_description"
          name="long_description"
          rows={8}
          defaultValue={project?.long_description || ""}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            name="client_name"
            defaultValue={project?.client_name || ""}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            name="category"
            required
            defaultValue={project?.category}
            placeholder="e.g. Web App, Mobile, AI"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label>Tech Stack</Label>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add a technology"
            className="border-[#1f1f25] bg-[#0b0b0f]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addTech}
            className="border-[#1f1f25] bg-[#111116]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded-full border border-[#1f1f25] bg-[#111116] px-3 py-1 text-sm text-gray-300"
            >
              {t}
              <button
                type="button"
                onClick={() =>
                  setTechStack(techStack.filter((_, j) => j !== i))
                }
              >
                <X className="h-3 w-3 text-gray-500 hover:text-white" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          defaultValue={project?.display_order || 0}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Switch
            id="is_featured"
            name="is_featured"
            defaultChecked={project?.is_featured ?? false}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="is_active"
            name="is_active"
            defaultChecked={project?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <GlowButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </GlowButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          className="border-[#1f1f25] bg-[#111116]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
