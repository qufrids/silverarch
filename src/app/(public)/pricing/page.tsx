import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { getPackages } from "@/actions/packages";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { GlowButton } from "@/components/shared/glow-button";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for our digital services. Choose the plan that fits your business needs.",
  path: "/pricing",
});

export default async function PricingPage() {
  let packages: Awaited<ReturnType<typeof getPackages>> = [];
  try {
    packages = await getPackages();
  } catch {
    packages = [];
  }

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs. All plans include our premium quality guarantee and dedicated project manager."
        />

        {packages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <p className="text-lg font-semibold text-foreground">
              Custom Pricing Available
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Every project is different. Get in touch for a free consultation
              and we&apos;ll put together a detailed, fixed-price proposal
              tailored to your exact requirements.
            </p>
            <GlowButton href="/contact">
              Get a Free Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </GlowButton>
          </div>
        ) : (
          <PricingCards packages={packages} />
        )}
      </div>

      <CTASection />
    </div>
  );
}
