"use client";

import { ArrowRight } from "lucide-react";
import { GlowButton } from "@/components/shared/glow-button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-[#1f1f25]">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20" />
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="relative px-8 py-16 text-center sm:px-16 sm:py-24">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Build Something{" "}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Extraordinary
                </span>
                ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                Let&apos;s discuss your project and see how we can help turn
                your vision into reality.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GlowButton href="/contact" size="lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </GlowButton>
                <GlowButton href="/portfolio" variant="secondary" size="lg">
                  See Our Work
                </GlowButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
