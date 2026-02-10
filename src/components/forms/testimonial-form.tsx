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
import {
  createTestimonial,
  updateTestimonial,
} from "@/actions/testimonials";
import type { Testimonial } from "@/types";
import { Star } from "lucide-react";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(testimonial?.rating ?? 5);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const data = {
      client_name: form.get("client_name") as string,
      client_title: (form.get("client_title") as string) || undefined,
      client_company: (form.get("client_company") as string) || undefined,
      content: form.get("content") as string,
      rating,
      is_featured: form.get("is_featured") === "on",
      display_order: Number(form.get("display_order")) || 0,
      is_active: form.get("is_active") === "on",
    };

    const result = testimonial
      ? await updateTestimonial(testimonial.id, data)
      : await createTestimonial(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(
        testimonial ? "Testimonial updated" : "Testimonial created"
      );
      router.push("/admin/testimonials");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name *</Label>
          <Input
            id="client_name"
            name="client_name"
            required
            defaultValue={testimonial?.client_name}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_title">Client Title</Label>
          <Input
            id="client_title"
            name="client_title"
            defaultValue={testimonial?.client_title || ""}
            placeholder="e.g. CEO, CTO"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client_company">Client Company</Label>
        <Input
          id="client_company"
          name="client_company"
          defaultValue={testimonial?.client_company || ""}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Testimonial Content *</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={5}
          defaultValue={testimonial?.content}
          placeholder="What did the client say..."
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-0.5 transition-colors"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-600"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-400">{rating}/5</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          defaultValue={testimonial?.display_order || 0}
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Switch
            id="is_featured"
            name="is_featured"
            defaultChecked={testimonial?.is_featured ?? false}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="is_active"
            name="is_active"
            defaultChecked={testimonial?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <GlowButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : testimonial
              ? "Update Testimonial"
              : "Create Testimonial"}
        </GlowButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/testimonials")}
          className="border-[#1f1f25] bg-[#111116]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
