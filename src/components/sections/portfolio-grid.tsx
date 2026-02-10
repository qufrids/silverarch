"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "border border-[#1f1f25] bg-[#111116] text-gray-400 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1f1f25] bg-[#111116]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white/10">
                      {project.title}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
                        {project.category}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {project.short_description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech_stack as string[]).slice(0, 4).map((tag) => (
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
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-gray-500">
          No projects found in this category.
        </p>
      )}
    </>
  );
}
