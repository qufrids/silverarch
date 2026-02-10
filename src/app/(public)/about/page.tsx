import { Users, Target, Zap, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { GradientText } from "@/components/shared/gradient-text";
import { StatsCounter } from "@/components/sections/stats-counter";
import { CTASection } from "@/components/sections/cta-section";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about SilverArch, our mission, team, and why we're passionate about building exceptional digital experiences.",
  path: "/about",
});

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Quality First",
    description:
      "We never compromise on quality. Every line of code, every pixel, and every interaction is crafted with care.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Innovation",
    description:
      "We stay ahead of the curve, using the latest technologies and methodologies to deliver cutting-edge solutions.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Collaboration",
    description:
      "We work closely with our clients, treating every project as a partnership built on trust and transparency.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Reliability",
    description:
      "We deliver on our promises. On time, on budget, and exceeding expectations — every single time.",
  },
];

const team = [
  { name: "Alex Morgan", role: "Founder & CEO", initials: "AM" },
  { name: "Jordan Lee", role: "Lead Developer", initials: "JL" },
  { name: "Sam Rivera", role: "Design Director", initials: "SR" },
  { name: "Taylor Kim", role: "Strategy Lead", initials: "TK" },
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-20 text-center">
          <GradientText className="text-sm font-semibold uppercase tracking-widest">
            About Us
          </GradientText>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Building the Future of Digital
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            SilverArch was founded with a simple mission: to help ambitious
            brands build exceptional digital experiences. We combine technical
            excellence with creative vision to deliver solutions that truly
            matter.
          </p>
        </div>

        {/* Story */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                What started as a small team of passionate developers and
                designers has grown into a full-service digital agency trusted by
                companies across industries.
              </p>
              <p>
                We believe that great digital products are born at the
                intersection of beautiful design, solid engineering, and deep
                understanding of user needs. That&apos;s why we invest heavily in
                every phase of the process — from discovery to deployment.
              </p>
              <p>
                Today, we&apos;re proud to have helped over 50 businesses
                transform their digital presence and achieve measurable results.
              </p>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/10">
              <span className="text-4xl font-bold text-white/5">
                SilverArch
              </span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <SectionHeading
            label="Our Values"
            title="What Drives Us"
            description="The principles that guide everything we do."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <GlowCard key={value.title}>
                <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <SectionHeading
            label="Our Team"
            title="The People Behind SilverArch"
            description="A talented team of designers, developers, and strategists dedicated to your success."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                  <span className="text-xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StatsCounter />
      <CTASection />
    </div>
  );
}
