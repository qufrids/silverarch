"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowButton } from "@/components/shared/glow-button";

const projects = [
  {
    title: "Nexus SaaS Platform",
    category: "Web App",
    slug: "nexus-saas",
    image: "/placeholder-project-1.jpg",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    title: "Velocity E-Commerce",
    category: "E-Commerce",
    slug: "velocity-ecommerce",
    image: "/placeholder-project-2.jpg",
    tags: ["Shopify", "React", "Node.js"],
  },
  {
    title: "Pulse Analytics Dashboard",
    category: "SaaS",
    slug: "pulse-analytics",
    image: "/placeholder-project-3.jpg",
    tags: ["React", "D3.js", "PostgreSQL"],
  },
];

export function PortfolioPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Our Work"
            title="Projects That Speak for Themselves"
            description="A selection of our recent work showcasing our expertise across industries."
          />
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={staggerItem}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1f1f25] bg-[#111116]">
                  {/* Placeholder gradient since we don't have real images yet */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white/10">
                      {project.title}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-400">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#1f1f25] bg-[#111116] px-2.5 py-0.5 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <GlowButton href="/portfolio" variant="secondary">
            View All Projects
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
