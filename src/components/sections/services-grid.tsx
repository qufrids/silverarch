"use client";

import {
  Globe,
  Palette,
  ShoppingCart,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { GlowCard } from "@/components/shared/glow-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";
import { staticServices } from "@/lib/services-data";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  ShoppingCart: <ShoppingCart className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
};

export function ServicesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Our Services"
            title="Everything You Need to Succeed Online"
            description="From strategy to execution, we deliver comprehensive digital solutions tailored to your business goals."
          />
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {staticServices.map((service) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <Link href={`/services/${service.slug}`}>
                <GlowCard className="group h-full cursor-pointer">
                  <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                    {iconMap[service.icon] ?? <Globe className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-purple-400">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.short_description}
                  </p>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
