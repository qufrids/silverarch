"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowButton } from "@/components/shared/glow-button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Starter",
    price: "$2,499",
    description: "Perfect for small businesses just getting started.",
    features: [
      { text: "5-page website", included: true },
      { text: "Responsive design", included: true },
      { text: "Basic SEO", included: true },
      { text: "Contact form", included: true },
      { text: "CMS integration", included: false },
      { text: "Custom animations", included: false },
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$4,999",
    description: "For growing businesses that need a strong digital presence.",
    features: [
      { text: "10-page website", included: true },
      { text: "Responsive design", included: true },
      { text: "Advanced SEO", included: true },
      { text: "Contact form", included: true },
      { text: "CMS integration", included: true },
      { text: "Custom animations", included: true },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale digital solutions for established businesses.",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Responsive design", included: true },
      { text: "Advanced SEO", included: true },
      { text: "Contact form", included: true },
      { text: "CMS integration", included: true },
      { text: "Custom animations", included: true },
    ],
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Pricing"
            title="Simple, Transparent Pricing"
            description="Choose the plan that fits your needs. All plans include our premium quality guarantee."
          />
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={staggerItem}
              className={cn(
                "relative rounded-xl border bg-card p-8",
                pkg.popular
                  ? "border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                  : "border-border"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pkg.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {pkg.price}
                </span>
                {pkg.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground"> / project</span>
                )}
              </div>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-gray-600" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included ? "text-foreground/80" : "text-gray-600"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <GlowButton
                href="/contact"
                variant={pkg.popular ? "primary" : "secondary"}
                className="w-full"
              >
                {pkg.price === "Custom" ? "Contact Us" : "Get Started"}
              </GlowButton>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <GlowButton href="/pricing" variant="secondary">
            Compare All Plans
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
