"use client";

import {
  Globe,
  Palette,
  ShoppingCart,
  TrendingUp,
  Smartphone,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { GlowCard } from "@/components/shared/glow-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  ShoppingCart: <ShoppingCart className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Video: <Video className="h-6 w-6" />,
};

const services = [
  {
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks and best practices.",
    icon: "Globe",
    slug: "web-development",
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed to delight users and drive conversions.",
    icon: "Palette",
    slug: "ui-ux-design",
  },
  {
    title: "E-Commerce",
    description:
      "Scalable online stores that convert visitors into customers.",
    icon: "ShoppingCart",
    slug: "e-commerce",
  },
  {
    title: "Digital Strategy",
    description:
      "Data-driven strategies to grow your digital presence and reach your goals.",
    icon: "TrendingUp",
    slug: "digital-strategy",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    icon: "Smartphone",
    slug: "mobile-apps",
  },
  {
    title: "Video & Animation",
    description:
      "Engaging motion graphics and video content that tells your story.",
    icon: "Video",
    slug: "video-animation",
  },
];

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
          {services.map((service) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <Link href={`/services/${service.slug}`}>
                <GlowCard className="group h-full cursor-pointer">
                  <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-purple-400">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
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
