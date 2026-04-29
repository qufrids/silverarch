import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { getProjects } from "@/actions/projects";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { GlowButton } from "@/components/shared/glow-button";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Explore our portfolio of successful digital projects across web development, e-commerce, and SaaS.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try {
    projects = await getProjects();
  } catch {
    projects = [];
  }

  return (
    <div className="pb-0 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading
          label="Our Work"
          title="Portfolio"
          description="A selection of our recent projects showcasing our expertise across industries and technologies."
        />

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <p className="text-lg font-semibold text-foreground">
              Portfolio Coming Soon
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              We&apos;re assembling our case studies. In the meantime, get in
              touch to discuss your project and see examples of our work
              first-hand.
            </p>
            <GlowButton href="/contact">
              Request a Portfolio Review
              <ArrowRight className="ml-2 h-4 w-4" />
            </GlowButton>
          </div>
        ) : (
          <PortfolioGrid projects={projects} />
        )}
      </div>

      <CTASection />
    </div>
  );
}
