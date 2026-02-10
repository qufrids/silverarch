"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const testimonials = [
  {
    name: "Sarah Chen",
    title: "CEO at TechFlow",
    content:
      "SilverArch transformed our online presence completely. The attention to detail and the quality of work exceeded our expectations. Our conversion rate increased by 40% after the redesign.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    title: "Founder at Velocity",
    content:
      "Working with SilverArch was a game-changer. They delivered a stunning e-commerce platform that our customers love. The team was professional, responsive, and truly understood our vision.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    title: "CTO at DataPulse",
    content:
      "The SaaS dashboard SilverArch built for us is incredibly intuitive and performant. They handled complex data visualization requirements with ease. Highly recommended!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our clients have to say about working with us."
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
