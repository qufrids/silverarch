import { Mail, Globe, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { ContactForm } from "@/components/forms/contact-form";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with SilverArch. Let's discuss your project and how we can help bring your vision to life.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email Us",
    value: "hello@silverarch.dev",
    href: "mailto:hello@silverarch.dev",
    description: "We aim to respond within 24 hours.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "We Work Remotely",
    value: "Remote & Worldwide",
    href: null,
    description: "Serving clients across the globe.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Response Time",
    value: "Within 24 Hours",
    href: null,
    description: "Monday to Friday, 9am – 6pm GMT.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Let's Build Something Together"
          description="Have a project in mind? Fill out the form below and we'll get back to you within 24 hours with a tailored response."
        />

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <GlowCard key={info.label}>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-400">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-foreground hover:text-purple-400"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{info.value}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}

            {/* Trust signals */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-semibold text-foreground">
                Why work with us?
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Free initial consultation",
                  "Clear, fixed-price proposals",
                  "Dedicated project manager",
                  "Transparent progress updates",
                  "Post-launch support included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
