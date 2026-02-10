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
import { createPackage, updatePackage } from "@/actions/packages";
import { slugify } from "@/lib/utils";
import type { Package, PackageFeature } from "@/types";
import { Plus, X, Check, Minus } from "lucide-react";

interface PackageFormProps {
  pkg?: Package;
}

export function PackageForm({ pkg }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<PackageFeature[]>(
    (pkg?.features as PackageFeature[]) || []
  );
  const [newFeatureText, setNewFeatureText] = useState("");
  const [newFeatureIncluded, setNewFeatureIncluded] = useState(true);

  function addFeature() {
    if (newFeatureText.trim()) {
      setFeatures([
        ...features,
        { text: newFeatureText.trim(), included: newFeatureIncluded },
      ]);
      setNewFeatureText("");
      setNewFeatureIncluded(true);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const data = {
      name: form.get("name") as string,
      slug: form.get("slug") as string,
      description: (form.get("description") as string) || undefined,
      monthly_price: form.get("monthly_price")
        ? Number(form.get("monthly_price"))
        : null,
      yearly_price: form.get("yearly_price")
        ? Number(form.get("yearly_price"))
        : null,
      features,
      is_popular: form.get("is_popular") === "on",
      cta_text: (form.get("cta_text") as string) || "Get Started",
      display_order: Number(form.get("display_order")) || 0,
      is_active: form.get("is_active") === "on",
    };

    const result = pkg
      ? await updatePackage(pkg.id, data)
      : await createPackage(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(pkg ? "Package updated" : "Package created");
      router.push("/admin/packages");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={pkg?.name}
            onChange={(e) => {
              if (!pkg) {
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
            defaultValue={pkg?.slug}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={pkg?.description || ""}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="monthly_price">Monthly Price ($)</Label>
          <Input
            id="monthly_price"
            name="monthly_price"
            type="number"
            step="0.01"
            defaultValue={pkg?.monthly_price ?? ""}
            placeholder="0"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearly_price">Yearly Price ($)</Label>
          <Input
            id="yearly_price"
            name="yearly_price"
            type="number"
            step="0.01"
            defaultValue={pkg?.yearly_price ?? ""}
            placeholder="0"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeatureText}
            onChange={(e) => setNewFeatureText(e.target.value)}
            placeholder="Add a feature"
            className="border-[#1f1f25] bg-[#0b0b0f]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setNewFeatureIncluded(!newFeatureIncluded)}
            className={`border-[#1f1f25] ${
              newFeatureIncluded
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
            title={newFeatureIncluded ? "Included" : "Not included"}
          >
            {newFeatureIncluded ? (
              <Check className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addFeature}
            className="border-[#1f1f25] bg-[#111116]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-[#1f1f25] bg-[#111116] px-3 py-2 text-sm"
            >
              {f.included ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              ) : (
                <Minus className="h-3.5 w-3.5 shrink-0 text-red-400" />
              )}
              <span className="flex-1 text-gray-300">{f.text}</span>
              <button
                type="button"
                onClick={() =>
                  setFeatures(features.filter((_, j) => j !== i))
                }
              >
                <X className="h-3 w-3 text-gray-500 hover:text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cta_text">CTA Text</Label>
          <Input
            id="cta_text"
            name="cta_text"
            defaultValue={pkg?.cta_text || "Get Started"}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={pkg?.display_order || 0}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Switch
            id="is_popular"
            name="is_popular"
            defaultChecked={pkg?.is_popular ?? false}
          />
          <Label htmlFor="is_popular">Popular (highlighted)</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="is_active"
            name="is_active"
            defaultChecked={pkg?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <GlowButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : pkg
              ? "Update Package"
              : "Create Package"}
        </GlowButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/packages")}
          className="border-[#1f1f25] bg-[#111116]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
