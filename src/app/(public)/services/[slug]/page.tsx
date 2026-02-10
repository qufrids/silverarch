import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getServiceBySlug, getServices } from "@/actions/services";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return createPageMetadata({
    title: service.title,
    description: service.short_description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Services
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <GradientText className="text-sm font-semibold uppercase tracking-widest">
            Our Services
          </GradientText>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {service.short_description}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {service.long_description && (
              <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80">
                <ReactMarkdown>{service.long_description}</ReactMarkdown>
              </div>
            )}

            {/* Features */}
            {service.features && (service.features as string[]).length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  What&apos;s Included
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(service.features as string[]).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <Check className="h-4 w-4 shrink-0 text-green-400" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits &&
              (service.benefits as string[]).length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Benefits
                  </h2>
                  <ul className="space-y-3">
                    {(service.benefits as string[]).map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                        <span className="text-foreground/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Sidebar - CTA form */}
          <div>
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Interested in {service.title}?
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Tell us about your project and we&apos;ll get back to you within
                24 hours.
              </p>
              <ContactForm
                source="service_page"
                serviceInterest={service.title}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
