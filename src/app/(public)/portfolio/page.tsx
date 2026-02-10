import { createPageMetadata } from "@/lib/metadata";
import { getProjects } from "@/actions/projects";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTASection } from "@/components/sections/cta-section";
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
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Portfolio"
          description="A selection of our recent projects showcasing our expertise across industries and technologies."
        />

        <PortfolioGrid projects={projects} />
      </div>

      <CTASection />
    </div>
  );
}
