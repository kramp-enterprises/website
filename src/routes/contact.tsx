import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { ADDRESS, CITY, EMAIL, HOURS, PHONE, PHONE_TEL } from "@/lib/catalog";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    pageHead({
      title: "Contact Kramp Enterprises | Brentford, SD",
      description:
        "Call (605) 887-3456 or stop by 303 East 6th Street, Brentford, SD 57429. Grain systems, Yarbo demos, and custom steel — same shop.",
      path: "/contact",
    }),
});

function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div>
        <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
          Contact
        </p>
        <h1 className="mt-2 font-display text-5xl text-forest">
          Call the shop. Or send it here.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Grain quotes, Yarbo demos, and custom steel all land in the same
          office at 303 East 6th Street, Brentford, South Dakota.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">Phone</dt>
            <dd>
              <a href={`tel:${PHONE_TEL}`} className="text-lg text-forest">{PHONE}</a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">Address</dt>
            <dd>
              {ADDRESS}
              <br />
              {CITY}
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">Hours</dt>
            <dd>{HOURS}</dd>
          </div>
        </dl>
        <iframe
          title="Kramp Enterprises on the map"
          className="mt-8 h-56 w-full rounded-xl border border-line"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=303%20East%206th%20Street%20Brentford%20SD%2057429&z=15&output=embed"
        />
      </div>
      <div className="rounded-xl border border-line bg-card p-6">
        <LeadForm kind="contact" />
      </div>
    </main>
  );
}
