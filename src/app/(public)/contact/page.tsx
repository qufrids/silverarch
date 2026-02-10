import { Mail, Phone, MapPin } from "lucide-react";
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
    label: "Email",
    value: "hello@silverarch.dev",
    href: "mailto:hello@silverarch.dev",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Office",
    value: "San Francisco, CA",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Let's Build Something Together"
          description="Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you within 24 hours."
        />

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6 sm:p-8">
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
                    <p className="text-sm font-medium text-gray-400">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white hover:text-purple-400"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-xl border border-[#1f1f25]">
              <div className="flex aspect-square items-center justify-center bg-[#111116]">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-gray-600" />
                  <p className="mt-2 text-sm text-gray-500">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
