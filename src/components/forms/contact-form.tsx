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

const budgetOptions = [
  { value: "", label: "Select a budget range" },
  { value: "Under £2,000", label: "Under £2,000" },
  { value: "£2,000 – £5,000", label: "£2,000 – £5,000" },
  { value: "£5,000 – £15,000", label: "£5,000 – £15,000" },
  { value: "£15,000 – £50,000", label: "£15,000 – £50,000" },
  { value: "£50,000+", label: "£50,000+" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "Web Development", label: "Web Development" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Digital Strategy", label: "Digital Strategy" },
  { value: "Mobile Apps", label: "Mobile Apps" },
  { value: "SEO & Marketing", label: "SEO & Marketing" },
  { value: "Other", label: "Other" },
];

const selectClass =
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40";

export function ContactForm({
  source = "contact_form",
  serviceInterest,
  compact = false,
  className,
}: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      service_interest:
        serviceInterest ||
        (formData.get("service_interest") as string) ||
        undefined,
      budget_range: (formData.get("budget_range") as string) || undefined,
      message: formData.get("message") as string,
      source,
    };

    const result = await createLead(data);

    if (result.error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      form.reset();
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
          <svg
            className="h-7 w-7 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Message Received!
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. A member of our team will be in touch
          within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-purple-400 underline hover:text-purple-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            minLength={2}
            placeholder="Jane Smith"
            className="border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
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
              placeholder="+44 7700 000000"
              className="border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Acme Ltd."
              className="border-border bg-background"
            />
          </div>
        </div>
      )}

      {!compact && !serviceInterest && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="service_interest">Service Interest</Label>
            <select
              id="service_interest"
              name="service_interest"
              className={selectClass}
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget_range">Budget Range</Label>
            <select
              id="budget_range"
              name="budget_range"
              className={selectClass}
            >
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={compact ? 3 : 5}
          placeholder="Tell us about your project — goals, timeline, and any specific requirements…"
          className="border-border bg-background"
        />
      </div>

      <GlowButton type="submit" disabled={loading} className="w-full">
        {loading ? "Sending…" : "Send Message"}
      </GlowButton>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
