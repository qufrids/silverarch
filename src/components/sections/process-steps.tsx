"use client";

import { Search, Lightbulb, Code, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { processSteps } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
  Rocket: <Rocket className="h-6 w-6" />,
};

export function ProcessSteps() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Our Process"
            title="How We Bring Ideas to Life"
            description="A proven methodology that ensures every project is delivered on time, on budget, and beyond expectations."
          />
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-[#1f1f25] to-transparent lg:block" />

          {processSteps.map((step) => (
            <motion.div
              key={step.step}
              variants={staggerItem}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="relative mx-auto mb-6 flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-20" />
                <span className="relative text-sm font-bold text-purple-400">
                  0{step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4 inline-flex rounded-lg bg-[#111116] p-3 text-purple-400 ring-1 ring-[#1f1f25]">
                {iconMap[step.icon]}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
