import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "SilverArch Privacy Policy — how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-muted-foreground">
          Last updated: April 2025
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              1. Introduction
            </h2>
            <p>
              Silver Arch Ltd (&ldquo;SilverArch&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
              protecting your personal information. This Privacy Policy explains
              what data we collect when you use our website (
              <a
                href="https://silverarch.vercel.app"
                className="text-purple-400 underline"
              >
                silverarch.vercel.app
              </a>
              ), why we collect it, and how we handle it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <p>We may collect the following categories of information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Contact information</strong>{" "}
                — name, email address, phone number, company name — submitted
                through our contact or enquiry forms.
              </li>
              <li>
                <strong className="text-foreground">Project details</strong> —
                any information you voluntarily share when describing your
                project or requirements.
              </li>
              <li>
                <strong className="text-foreground">Usage data</strong> — pages
                visited, time on site, and browser/device information, collected
                automatically via standard web server logs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to your enquiries and provide quotes or proposals.</li>
              <li>Deliver services you have engaged us for.</li>
              <li>
                Send occasional updates about our services (you may unsubscribe
                at any time).
              </li>
              <li>Improve our website and user experience.</li>
              <li>
                Comply with our legal obligations under applicable data
                protection law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. Legal Basis for Processing
            </h2>
            <p>
              Where applicable under UK GDPR / EU GDPR, we process your
              personal data on the following legal bases:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Legitimate interests</strong>{" "}
                — responding to business enquiries and improving our services.
              </li>
              <li>
                <strong className="text-foreground">Contract performance</strong>{" "}
                — processing data necessary to deliver a project you have
                commissioned.
              </li>
              <li>
                <strong className="text-foreground">Consent</strong> — where
                you have explicitly opted in to marketing communications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. Data Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. We may
              share data with trusted third-party service providers who assist
              us in operating our website and business (e.g. cloud hosting,
              email delivery), subject to strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              6. Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfil the purposes outlined above or as required by law.
              Enquiries and project data are typically retained for up to 5
              years after the end of a business relationship.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              7. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Data portability.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:hello@silverarch.dev"
                className="text-purple-400 underline"
              >
                hello@silverarch.dev
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              8. Cookies
            </h2>
            <p>
              Our website uses essential cookies to maintain session state and
              ensure correct functionality. We do not use tracking or
              advertising cookies. By using our site you consent to the use of
              these essential cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              9. Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your data against unauthorised access, alteration,
              disclosure, or destruction. However, no transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by updating the &ldquo;Last
              updated&rdquo; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="mt-3 rounded-xl border border-border bg-card p-4 text-sm">
              <p className="font-semibold text-foreground">Silver Arch Ltd</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:hello@silverarch.dev"
                  className="text-purple-400 underline"
                >
                  hello@silverarch.dev
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
