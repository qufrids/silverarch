import Link from "next/link";
import {
  Globe,
  Palette,
  ShoppingCart,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import type { Metadata } from "next";
import { getServices } from "@/actions/services";
import { staticServices } from "@/lib/services-data";
import { GlowCard } from "@/components/shared/glow-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore our full range of digital services including web development, UI/UX design, e-commerce, and more.",
  path: "/services",
});

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  ShoppingCart: <ShoppingCart className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
};

export default async function ServicesPage() {
  let dbServices: Awaited<ReturnType<typeof getServices>> = [];
  try {
    dbServices = await getServices();
  } catch {
    dbServices = [];
  }

  // Use DB data when available; otherwise fall back to the shared static services
  const services =
    dbServices.length > 0
      ? dbServices.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          short_description: s.short_description,
          icon: s.icon ?? "Globe",
          features: (s.features as string[]) ?? [],
        }))
      : staticServices.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          short_description: s.short_description,
          icon: s.icon,
          features: s.features,
        }));

  return (
    <div className="pb-0 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading
          label="What We Do"
          title="Our Services"
          description="From strategy to execution, we deliver comprehensive digital solutions tailored to your business goals."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <GlowCard className="group h-full cursor-pointer">
                <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                  {iconMap[service.icon] ?? <Globe className="h-6 w-6" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-purple-400">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {service.short_description}
                </p>
                {service.features.length > 0 && (
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs text-muted-foreground">
                        &bull; {f}
                      </li>
                    ))}
                  </ul>
                )}
              </GlowCard>
            </Link>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
