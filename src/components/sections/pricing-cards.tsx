"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { GlowButton } from "@/components/shared/glow-button";
import { cn, formatPrice } from "@/lib/utils";
import type { Package, PackageFeature } from "@/types";

interface PricingCardsProps {
  packages: Package[];
}

export function PricingCards({ packages }: PricingCardsProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      {/* Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span
          className={cn(
            "text-sm font-medium",
            !yearly ? "text-white" : "text-gray-500"
          )}
        >
          Monthly
        </span>
        <button
          onClick={() => setYearly(!yearly)}
          className={cn(
            "relative h-7 w-12 rounded-full border transition-colors",
            yearly
              ? "border-purple-500 bg-purple-600"
              : "border-[#1f1f25] bg-[#111116]"
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
              yearly ? "translate-x-5.5" : "translate-x-0.5"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm font-medium",
            yearly ? "text-white" : "text-gray-500"
          )}
        >
          Yearly{" "}
          <span className="text-xs text-green-400">(Save 2 months)</span>
        </span>
      </div>

      {/* Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {packages.map((pkg) => {
          const price = yearly ? pkg.yearly_price : pkg.monthly_price;
          const features = (pkg.features || []) as PackageFeature[];

          return (
            <motion.div
              key={pkg.id}
              variants={staggerItem}
              className={cn(
                "relative rounded-xl border p-8",
                pkg.is_popular
                  ? "border-purple-500/30 bg-[#111116] shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                  : "border-[#1f1f25] bg-[#111116]"
              )}
            >
              {pkg.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {pkg.description}
                </p>
              </div>

              <div className="mb-6">
                {price ? (
                  <>
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(price)}
                    </span>
                    <span className="text-sm text-gray-400">
                      {" "}
                      / {yearly ? "year" : "project"}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-white">Custom</span>
                )}
              </div>

              <ul className="mb-8 space-y-3">
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 shrink-0 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-gray-600" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included ? "text-gray-300" : "text-gray-600"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <GlowButton
                href="/contact"
                variant={pkg.is_popular ? "primary" : "secondary"}
                className="w-full"
              >
                {pkg.cta_text}
              </GlowButton>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
