import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { ADDRESS, CITY, EMAIL, HOURS, PHONE, PHONE_TEL } from "@/lib/catalog";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
          Contact
        </p>
        <h1 className="mt-2 font-display text-5xl text-forest">
          Call the shop. Or send it here.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Grain quotes, Yarbo demos, and custom steel all land in the same
          office in Brentford.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">
              Phone
            </dt>
            <dd>
              <a href={`tel:${PHONE_TEL}`} className="text-lg text-forest">
                {PHONE}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">
              Email
            </dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">
              Address
            </dt>
            <dd>
              {ADDRESS}
              <br />
              {CITY}
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs uppercase tracking-[0.18em] text-muted">
              Hours
            </dt>
            <dd>{HOURS}</dd>
          </div>
        </dl>
      </div>
      <div className="rounded-xl border border-line bg-card p-6">
        <LeadForm kind="contact" />
      </div>
    </main>
  );
}
