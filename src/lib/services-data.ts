export interface StaticServiceData {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  icon: string;
  features: string[];
  benefits: string[];
}

export const staticServices: StaticServiceData[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    short_description:
      "Custom web applications and websites built with modern frameworks, clean code, and an obsessive focus on performance and scalability.",
    long_description: `## What We Build

From marketing sites to complex SaaS platforms, we engineer web experiences that load fast, scale effortlessly, and convert visitors into customers.

We work with the frameworks your business actually needs — Next.js for content-rich sites, React for interactive apps, and Node.js or serverless functions for the back end. Every project is TypeScript-first, thoroughly tested, and deployed with CI/CD pipelines so you can ship with confidence.

## Our Process

1. **Discovery** — We audit your requirements, users, and existing tech stack.
2. **Architecture** — We design a solution that can grow with your business.
3. **Build** — Iterative sprints with regular demos so you stay in control.
4. **Launch & Handover** — Full deployment, documentation, and training.`,
    icon: "Globe",
    features: [
      "Next.js, React & TypeScript",
      "Responsive & mobile-first",
      "Performance-optimised (Core Web Vitals)",
      "CMS integration (Sanity, Contentful, Supabase)",
      "REST & GraphQL API development",
      "CI/CD pipeline & automated deployment",
      "Accessibility (WCAG 2.1 AA)",
      "Post-launch maintenance & support",
    ],
    benefits: [
      "Faster load times that reduce bounce rate and improve SEO rankings.",
      "Clean, documented codebase your team can maintain and extend.",
      "Scalable architecture that grows without expensive rewrites.",
      "Fixed-price proposals with no hidden costs.",
    ],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short_description:
      "Intuitive, beautiful interfaces designed to reduce friction, drive conversions, and create lasting impressions on every device.",
    long_description: `## Design That Converts

Good design is invisible. Users don't notice it — they just feel comfortable, find what they need, and take action. Bad design, on the other hand, is painfully obvious.

We combine user research, interaction design, and pixel-perfect visual craftsmanship to build interfaces that work beautifully for your users and deliver measurable business results.

## What We Deliver

Every design engagement begins with understanding your users — their goals, frustrations, and mental models. We then translate those insights into wireframes, prototypes, and final high-fidelity designs that your engineering team can build from with confidence.`,
    icon: "Palette",
    features: [
      "User research & persona development",
      "Information architecture & user flows",
      "Wireframing & low-fidelity prototypes",
      "High-fidelity Figma designs",
      "Interactive prototypes for user testing",
      "Design system & component library",
      "Responsive designs for all breakpoints",
      "Developer handoff with specs & assets",
    ],
    benefits: [
      "Higher conversion rates through clear calls-to-action and intuitive flows.",
      "Reduced development cost — building from detailed specs prevents rework.",
      "Consistent brand identity across every touchpoint.",
      "A design system your team can extend independently.",
    ],
  },
  {
    id: "e-commerce",
    slug: "e-commerce",
    title: "E-Commerce",
    short_description:
      "Scalable online stores engineered to convert — from product discovery through to seamless checkout and repeat purchase.",
    long_description: `## Stores That Sell

Your online store is your most important salesperson. It works 24/7 and needs to handle everything from a first-time visitor to a returning loyal customer without friction.

We build e-commerce solutions on Shopify, WooCommerce, or fully custom stacks — whichever best fits your catalogue size, margin structure, and growth goals. Our focus is always on conversion rate, performance, and the customer experience.

## Beyond the Cart

A great store is more than a product grid and a checkout. We integrate inventory management, ERP and fulfilment systems, loyalty programmes, and analytics to give you a complete commercial platform.`,
    icon: "ShoppingCart",
    features: [
      "Shopify, WooCommerce or custom builds",
      "Payment gateway integration (Stripe, PayPal, etc.)",
      "Inventory & order management",
      "Product search & filtering",
      "Abandoned cart & email automation",
      "Loyalty & referral programmes",
      "Multi-currency & multi-language support",
      "Analytics & conversion tracking",
    ],
    benefits: [
      "Higher average order value through smart upsell and cross-sell flows.",
      "Reduced cart abandonment with streamlined, trust-building checkout.",
      "Lower operational overhead with automated order and inventory management.",
      "Full ownership — no per-transaction SaaS fees on custom builds.",
    ],
  },
  {
    id: "digital-strategy",
    slug: "digital-strategy",
    title: "Digital Strategy",
    short_description:
      "Data-driven strategies that align your digital presence with your business objectives and give you a clear roadmap to growth.",
    long_description: `## Strategy Before Execution

Too many businesses invest in websites, apps, or campaigns without a coherent strategy behind them. The result is wasted budget and missed opportunities.

We start every engagement by understanding your business model, competitive landscape, and customer journey. From there we build a prioritised digital roadmap — actionable, measurable, and grounded in real data.

## What Good Strategy Looks Like

Strategy isn't a 100-page deck that collects dust. It's a clear set of priorities, success metrics, and a sequenced plan your team can execute against week by week.`,
    icon: "TrendingUp",
    features: [
      "Digital audit & competitive analysis",
      "Customer journey mapping",
      "Channel strategy (SEO, PPC, social, email)",
      "KPI framework & measurement plan",
      "Content strategy & editorial calendar",
      "Technology stack recommendations",
      "Quarterly roadmap planning",
      "Growth experiment design",
    ],
    benefits: [
      "Clear priorities so your budget goes to the highest-ROI activities first.",
      "A measurable framework so you know what's working and what isn't.",
      "Reduced wasted spend on tactics that don't align with your goals.",
      "Organisational alignment — everyone knows the plan and their role in it.",
    ],
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    title: "Mobile Apps",
    short_description:
      "Native and cross-platform mobile applications for iOS and Android that users actually want to open, built for performance and retention.",
    long_description: `## Mobile-First Products

With the majority of internet usage now on mobile, a great app is no longer a nice-to-have. We build mobile applications that are fast, reliable, and genuinely useful — the kind users return to daily.

We work primarily with React Native for cross-platform projects (one codebase, both platforms) and Swift/Kotlin when native performance is critical. Every app we deliver has been tested on real devices across the full range of screen sizes and OS versions.

## From Concept to App Store

We handle the full journey — from product definition and UX through development, QA, App Store submission, and post-launch monitoring.`,
    icon: "Smartphone",
    features: [
      "React Native cross-platform development",
      "iOS (Swift) & Android (Kotlin) native builds",
      "App Store & Google Play submission",
      "Push notifications & background sync",
      "Offline-first architecture",
      "Biometric authentication",
      "Analytics & crash reporting integration",
      "Ongoing maintenance & OS update support",
    ],
    benefits: [
      "Single codebase for iOS and Android reduces cost and time-to-market.",
      "Native performance where it matters — animations, gestures, camera.",
      "Retained users through thoughtful onboarding and notification strategy.",
      "Full source code ownership — no lock-in to proprietary platforms.",
    ],
  },
  {
    id: "seo-marketing",
    slug: "seo-marketing",
    title: "SEO & Marketing",
    short_description:
      "Grow your organic reach and drive qualified traffic with technical SEO, content strategy, and performance-focused digital marketing.",
    long_description: `## Visibility That Compounds

Paid traffic stops the moment you stop paying. SEO and content marketing compound — every piece of content and every technical fix you make today keeps paying dividends for months and years.

We combine technical SEO with content strategy and conversion rate optimisation to build sustainable, cost-effective growth engines for your business.

## Technical + Content

Good SEO in 2025 requires both a technically sound website and content that genuinely answers what your customers are searching for. We audit, fix, and build — then measure everything.`,
    icon: "TrendingUp",
    features: [
      "Technical SEO audit & remediation",
      "Core Web Vitals & page speed optimisation",
      "Keyword research & content strategy",
      "On-page SEO & schema markup",
      "Link building & digital PR",
      "Local SEO (Google Business Profile)",
      "Google Analytics 4 & Search Console setup",
      "Monthly performance reporting",
    ],
    benefits: [
      "Compounding organic traffic that reduces your cost-per-acquisition over time.",
      "Higher-quality leads — people who found you by searching for exactly what you do.",
      "Technical fixes that improve user experience and conversion rate, not just rankings.",
      "Transparent monthly reporting tied to revenue metrics, not vanity stats.",
    ],
  },
];

export function getStaticServiceBySlug(slug: string): StaticServiceData | null {
  return staticServices.find((s) => s.slug === slug) ?? null;
}
