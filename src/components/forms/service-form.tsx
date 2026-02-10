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
import { createService, updateService } from "@/actions/services";
import { slugify } from "@/lib/utils";
import type { Service } from "@/types";
import { Plus, X } from "lucide-react";

interface ServiceFormProps {
  service?: Service;
}

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>(
    (service?.features as string[]) || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    (service?.benefits as string[]) || []
  );
  const [newFeature, setNewFeature] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const data = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
      short_description: form.get("short_description") as string,
      long_description: (form.get("long_description") as string) || undefined,
      icon: (form.get("icon") as string) || undefined,
      features,
      benefits,
      display_order: Number(form.get("display_order")) || 0,
      is_active: form.get("is_active") === "on",
    };

    const result = service
      ? await updateService(service.id, data)
      : await createService(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(service ? "Service updated" : "Service created");
      router.push("/admin/services");
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
            defaultValue={service?.title}
            onChange={(e) => {
              if (!service) {
                const slugInput = document.getElementById("slug") as HTMLInputElement;
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
            defaultValue={service?.slug}
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
          defaultValue={service?.short_description}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="long_description">Long Description (Markdown)</Label>
        <Textarea
          id="long_description"
          name="long_description"
          rows={8}
          defaultValue={service?.long_description || ""}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon (Lucide name)</Label>
          <Input
            id="icon"
            name="icon"
            defaultValue={service?.icon || ""}
            placeholder="Globe"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={service?.display_order || 0}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            className="border-[#1f1f25] bg-[#0b0b0f]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (newFeature.trim()) {
                  setFeatures([...features, newFeature.trim()]);
                  setNewFeature("");
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              if (newFeature.trim()) {
                setFeatures([...features, newFeature.trim()]);
                setNewFeature("");
              }
            }}
            className="border-[#1f1f25] bg-[#111116]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded-full border border-[#1f1f25] bg-[#111116] px-3 py-1 text-sm text-gray-300"
            >
              {f}
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, j) => j !== i))}
              >
                <X className="h-3 w-3 text-gray-500 hover:text-white" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        <Label>Benefits</Label>
        <div className="flex gap-2">
          <Input
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            placeholder="Add a benefit"
            className="border-[#1f1f25] bg-[#0b0b0f]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (newBenefit.trim()) {
                  setBenefits([...benefits, newBenefit.trim()]);
                  setNewBenefit("");
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              if (newBenefit.trim()) {
                setBenefits([...benefits, newBenefit.trim()]);
                setNewBenefit("");
              }
            }}
            className="border-[#1f1f25] bg-[#111116]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {benefits.map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded-full border border-[#1f1f25] bg-[#111116] px-3 py-1 text-sm text-gray-300"
            >
              {b}
              <button
                type="button"
                onClick={() => setBenefits(benefits.filter((_, j) => j !== i))}
              >
                <X className="h-3 w-3 text-gray-500 hover:text-white" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch id="is_active" name="is_active" defaultChecked={service?.is_active ?? true} />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <div className="flex gap-4">
        <GlowButton type="submit" disabled={loading}>
          {loading ? "Saving..." : service ? "Update Service" : "Create Service"}
        </GlowButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/services")}
          className="border-[#1f1f25] bg-[#111116]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
