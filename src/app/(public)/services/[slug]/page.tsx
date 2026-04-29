import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/actions/services";
import { getStaticServiceBySlug, staticServices } from "@/lib/services-data";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { ContactForm } from "@/components/forms/contact-form";
import { createPageMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render all known service slugs at build time.
// Falls back to on-demand rendering for any slug added later via the admin.
export async function generateStaticParams() {
  return staticServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first, fall back to static data
  let title = "";
  let description = "";

  try {
    const dbService = await getServiceBySlug(slug);
    if (dbService) {
      title = dbService.title;
      description = dbService.short_description;
    }
  } catch {
    // DB unavailable — use static data below
  }

  if (!title) {
    const staticService = getStaticServiceBySlug(slug);
    if (staticService) {
      title = staticService.title;
      description = staticService.short_description;
    }
  }

  if (!title) return {};

  return createPageMetadata({ title, description, path: `/services/${slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  // Attempt to load from DB; fall back to static data; 404 if neither exists
  let service: {
    title: string;
    short_description: string;
    long_description: string | null;
    features: string[];
    benefits: string[];
  } | null = null;

  try {
    const dbService = await getServiceBySlug(slug);
    if (dbService) {
      service = {
        title: dbService.title,
        short_description: dbService.short_description,
        long_description: dbService.long_description,
        features: (dbService.features as string[]) ?? [],
        benefits: (dbService.benefits as string[]) ?? [],
      };
    }
  } catch {
    // DB unavailable — fall through to static data
  }

  if (!service) {
    const staticService = getStaticServiceBySlug(slug);
    if (staticService) {
      service = {
        title: staticService.title,
        short_description: staticService.short_description,
        long_description: staticService.long_description,
        features: staticService.features,
        benefits: staticService.benefits,
      };
    }
  }

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
            {service.features.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  What&apos;s Included
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <Check className="h-4 w-4 shrink-0 text-green-400" />
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA block */}
            <div className="mt-16 rounded-xl border border-border bg-card p-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Ready to get started?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tell us about your project and we&apos;ll send a tailored
                proposal within 24 hours.
              </p>
              <GlowButton href="/contact" size="lg">
                Start Your Project
              </GlowButton>
            </div>
          </div>

          {/* Sidebar — contact form */}
          <div>
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Interested in {service.title}?
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Fill in the form and we&apos;ll get back to you within 24
                hours.
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
