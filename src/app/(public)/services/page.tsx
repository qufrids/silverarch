import Link from "next/link";
import {
  Globe,
  Palette,
  ShoppingCart,
  TrendingUp,
  Smartphone,
  Video,
} from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { createPageMetadata } from "@/lib/metadata";
import { getServices } from "@/actions/services";
import type { Metadata } from "next";

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
  Video: <Video className="h-6 w-6" />,
};

const fallbackServices = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    short_description:
      "Custom web applications and websites built with modern frameworks, clean code, and a focus on performance and scalability.",
    icon: "Globe",
    features: ["Next.js & React", "TypeScript", "API integrations", "CMS setup"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short_description:
      "Intuitive, beautiful interfaces designed to reduce friction, drive conversions, and create lasting impressions.",
    icon: "Palette",
    features: ["User research", "Wireframing", "Figma prototypes", "Design systems"],
  },
  {
    id: "e-commerce",
    slug: "e-commerce",
    title: "E-Commerce",
    short_description:
      "Scalable online stores engineered to convert — from product discovery to seamless checkout.",
    icon: "ShoppingCart",
    features: ["Shopify / custom", "Payment gateways", "Inventory systems", "SEO-ready"],
  },
  {
    id: "digital-strategy",
    slug: "digital-strategy",
    title: "Digital Strategy",
    short_description:
      "Data-driven strategies that align your digital presence with your business goals and market position.",
    icon: "TrendingUp",
    features: ["Market analysis", "Growth roadmaps", "Analytics setup", "Competitor audits"],
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    title: "Mobile Apps",
    short_description:
      "Native and cross-platform mobile applications for iOS and Android, built for performance and user delight.",
    icon: "Smartphone",
    features: ["React Native", "iOS & Android", "App Store publishing", "Push notifications"],
  },
  {
    id: "seo-marketing",
    slug: "seo-marketing",
    title: "SEO & Marketing",
    short_description:
      "Grow your organic reach and drive qualified traffic with technical SEO, content strategy, and digital marketing.",
    icon: "Video",
    features: ["Technical SEO", "Content strategy", "Core Web Vitals", "Link building"],
  },
];

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  const displayServices = services.length > 0 ? services : null;

  return (
    <div className="pb-0 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading
          label="What We Do"
          title="Our Services"
          description="From strategy to execution, we deliver comprehensive digital solutions tailored to your business goals."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(displayServices ?? fallbackServices).map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <GlowCard className="group h-full cursor-pointer">
                <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                  {iconMap[(service as { icon?: string | null }).icon ?? "Globe"] || (
                    <Globe className="h-6 w-6" />
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-purple-400">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {service.short_description}
                </p>
                {(service as { features?: string[] }).features && (
                  <ul className="space-y-1">
                    {((service as { features?: string[] }).features ?? [])
                      .slice(0, 3)
                      .map((f) => (
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
