"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createLead } from "@/actions/leads";
import { GlowButton } from "@/components/shared/glow-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  source?: string;
  serviceInterest?: string;
  compact?: boolean;
  className?: string;
}

export function ContactForm({
  source = "contact_form",
  serviceInterest,
  compact = false,
  className,
}: ContactFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      company: (formData.get("company") as string) || undefined,
      service_interest: serviceInterest || (formData.get("service_interest") as string) || undefined,
      budget_range: (formData.get("budget_range") as string) || undefined,
      message: formData.get("message") as string,
      source,
    };

    const result = await createLead(data);

    if (result.error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
    >
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="John Doe"
            className="border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="border-border bg-background"
          />
        </div>
      </div>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              className="border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Acme Inc."
              className="border-border bg-background"
            />
          </div>
        </div>
      )}

      {!compact && !serviceInterest && (
        <div className="space-y-2">
          <Label htmlFor="service_interest">Service Interest</Label>
          <select
            id="service_interest"
            name="service_interest"
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="">Select a service</option>
            <option value="Web Development">Web Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Digital Strategy">Digital Strategy</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="SEO & Marketing">SEO & Marketing</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="Tell us about your project..."
          className="border-border bg-background"
        />
      </div>

      <GlowButton
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Sending..." : "Send Message"}
      </GlowButton>
    </form>
  );
}
