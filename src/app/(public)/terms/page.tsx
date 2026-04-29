import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "SilverArch Terms of Service — the terms and conditions governing use of our website and services.",
  path: "/terms",
});

export default function TermsOfServicePage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="mb-12 text-sm text-muted-foreground">
          Last updated: April 2025
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using the website at{" "}
              <a
                href="https://silverarch.vercel.app"
                className="text-purple-400 underline"
              >
                silverarch.vercel.app
              </a>{" "}
              or engaging Silver Arch Ltd for services, you agree to be bound
              by these Terms of Service. If you do not agree, please do not use
              our site or services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Services
            </h2>
            <p>
              SilverArch provides digital agency services including, but not
              limited to, web development, UI/UX design, e-commerce solutions,
              and digital strategy. The scope, deliverables, timeline, and
              pricing for each project are agreed in writing (via a proposal or
              statement of work) before work begins.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. Payments & Fees
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                A deposit (typically 50% of the project fee) is required before
                project commencement unless otherwise agreed in writing.
              </li>
              <li>
                Remaining balances are due upon project delivery or as outlined
                in the agreed payment schedule.
              </li>
              <li>
                Invoices unpaid after 14 days may incur a late payment fee of
                2% per month on the outstanding balance.
              </li>
              <li>
                All prices are quoted exclusive of VAT unless stated otherwise.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. Intellectual Property
            </h2>
            <p>
              Upon full payment of all fees, the client receives full ownership
              of the final deliverables produced specifically for their project.
              SilverArch retains the right to display completed work in its
              portfolio unless explicitly agreed otherwise. Any third-party
              assets (fonts, stock images, plugins) remain subject to their
              respective licences.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. Client Responsibilities
            </h2>
            <p>The client agrees to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Provide timely feedback, content, and access to necessary
                assets.
              </li>
              <li>
                Ensure all content supplied is legally owned or licensed and
                does not infringe third-party rights.
              </li>
              <li>
                Designate a single point of contact for clear communication.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              6. Revisions & Scope Changes
            </h2>
            <p>
              Each project includes a reasonable number of revision rounds as
              specified in the proposal. Additional revisions or changes outside
              the agreed scope will be quoted and charged separately. SilverArch
              will notify the client in writing before carrying out any work
              that incurs additional fees.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              7. Cancellation
            </h2>
            <p>
              Either party may terminate a project by giving written notice.
              Work completed up to the point of cancellation is billable.
              Deposits are non-refundable unless SilverArch is unable to begin
              the project for reasons solely within our control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              8. Limitation of Liability
            </h2>
            <p>
              SilverArch&apos;s total liability in connection with any project
              shall not exceed the total fees paid by the client for that
              project. We are not liable for indirect, consequential, or
              incidental damages, loss of profit, or loss of data arising from
              the use of our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              9. Website Use
            </h2>
            <p>
              You may use this website for lawful purposes only. You must not
              attempt to gain unauthorised access to any part of the site,
              transmit malicious code, or use our contact forms for spam.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of England and Wales. Any disputes shall be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              11. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Continued
              use of the website after changes constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              12. Contact
            </h2>
            <p>
              Questions about these Terms should be directed to:
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
