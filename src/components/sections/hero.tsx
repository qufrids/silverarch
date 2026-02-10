"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GlowButton } from "@/components/shared/glow-button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/5 blur-[80px] animate-pulse-glow [animation-delay:4s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1f1f25] bg-[#111116]/60 px-4 py-1.5 text-sm text-gray-400 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We Build Digital{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experiences
            </span>{" "}
            That Matter
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
          >
            SilverArch is a full-service digital agency crafting elegant web
            solutions, stunning designs, and scalable platforms for ambitious
            brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <GlowButton href="/contact" size="lg">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
            <GlowButton href="/portfolio" variant="secondary" size="lg">
              View Our Work
            </GlowButton>
          </motion.div>

          {/* Trusted by (optional social proof) */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-xs uppercase tracking-widest text-gray-600">
              Trusted by innovative companies
            </p>
            <div className="flex items-center gap-8 opacity-40">
              {["Company A", "Company B", "Company C", "Company D"].map(
                (name) => (
                  <span
                    key={name}
                    className="text-sm font-medium tracking-wider text-gray-500"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-gray-600" />
      </motion.div>
    </section>
  );
}
