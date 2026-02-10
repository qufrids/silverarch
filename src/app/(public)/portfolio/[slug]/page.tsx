import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getProjectBySlug } from "@/actions/projects";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { GlowCard } from "@/components/shared/glow-card";
import { CTASection } from "@/components/sections/cta-section";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ProjectResult } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.short_description,
    path: `/portfolio/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const results = (project.results || []) as ProjectResult[];
  const techStack = (project.tech_stack || []) as string[];

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Projects
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <GradientText className="text-sm font-semibold uppercase tracking-widest">
              {project.category}
            </GradientText>
            {project.client_name && (
              <>
                <span className="text-gray-600">&bull;</span>
                <span className="text-sm text-muted-foreground">
                  {project.client_name}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {project.short_description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.live_url && (
            <div className="mt-6">
              <GlowButton href={project.live_url}>
                Visit Live Site
                <ExternalLink className="ml-2 h-4 w-4" />
              </GlowButton>
            </div>
          )}
        </div>

        {/* Project image placeholder */}
        <div className="mb-16 aspect-video overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/10">
            <span className="text-3xl font-bold text-white/10">
              {project.title}
            </span>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            {results.map((result) => (
              <GlowCard key={result.metric} className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {result.value}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{result.metric}</p>
              </GlowCard>
            ))}
          </div>
        )}

        {/* Content */}
        {project.long_description && (
          <div className="mx-auto max-w-3xl">
            <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80">
              <ReactMarkdown>{project.long_description}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <CTASection />
    </div>
  );
}
