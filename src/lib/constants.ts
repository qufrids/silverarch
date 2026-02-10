export const siteConfig = {
  name: "SilverArch",
  description:
    "Full-service digital agency specializing in web development, design, and digital strategy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-default.png",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "E-Commerce", href: "/services/e-commerce" },
    { label: "Digital Strategy", href: "/services/digital-strategy" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "SEO & Marketing", href: "/services/seo-marketing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
};

export const socialLinks = [
  { label: "Twitter", href: "https://twitter.com/silverarch", icon: "Twitter" },
  { label: "GitHub", href: "https://github.com/silverarch", icon: "Github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/silverarch",
    icon: "Linkedin",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and target audience through in-depth consultation.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Strategy",
    description:
      "We craft a tailored digital strategy aligned with your objectives and market positioning.",
    icon: "Lightbulb",
  },
  {
    step: 3,
    title: "Design & Build",
    description:
      "Our team brings the vision to life with pixel-perfect design and clean, scalable code.",
    icon: "Code",
  },
  {
    step: 4,
    title: "Launch & Grow",
    description:
      "We deploy, optimize, and provide ongoing support to ensure continued success.",
    icon: "Rocket",
  },
] as const;

export const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
] as const;
