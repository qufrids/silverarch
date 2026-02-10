import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StatsCounter } from "@/components/sections/stats-counter";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsCounter />
      <PortfolioPreview />
      <ProcessSteps />
      <PricingPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
