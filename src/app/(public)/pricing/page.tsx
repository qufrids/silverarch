import { createPageMetadata } from "@/lib/metadata";
import { getPackages } from "@/actions/packages";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
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

        <PricingCards packages={packages} />
      </div>

      <CTASection />
    </div>
  );
}
