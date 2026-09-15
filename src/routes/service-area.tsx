import { createFileRoute, Link } from "@tanstack/react-router";
import { FaqBlock } from "@/components/faq-block";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { ADDRESS, CITY, PHONE, PHONE_TEL } from "@/lib/catalog";
import {
  AREA_FAQS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageHead,
  serviceJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/service-area")({
  component: ServiceAreaPage,
  head: () =>
    pageHead({
      title: "Service Area | Grain Bins, Yarbo & Signs — Northeast South Dakota",
      description:
        "Kramp Enterprises serves Brentford, Redfield, Aberdeen, Spink County, and the James River Valley. GSI grain bins, Yarbo robots, and custom steel from 303 East 6th Street.",
      path: "/service-area",
      image: "/images/bins/site-crane.jpg",
    }),
});

const TOWNS = [
  "Brentford",
  "Redfield",
  "Mellette",
  "Conde",
  "Tulare",
  "Ashton",
  "Northville",
  "Frankfort",
  "Doland",
  "Turton",
  "Aberdeen",
  "Warner",
  "Mansfield",
  "Stratford",
  "Groton",
  "Bath",
];

function ServiceAreaPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Northeast South Dakota farm construction and yard care",
            description:
              "GSI grain systems, Yarbo dealer service, and custom plasma from Brentford for the James River Valley.",
            path: "/service-area",
            image: "/images/bins/site-crane.jpg",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service area", path: "/service-area" },
          ]),
          faqJsonLd(AREA_FAQS),
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
          James River Valley · northeast South Dakota
        </p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl text-forest sm:text-6xl">
          Built from Brentford. Stood on farms around it.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          The shop is at {ADDRESS}, {CITY}. Grain crews, a plasma table, and a
          Yarbo dealer desk work out of the same building. If you looked us up
          as Kramp Construction, this is the same company and the same phone:{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-forest">
            {PHONE}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/quote">Grain bin quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Call or write</Link>
          </Button>
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-4xl text-forest">Towns we work</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Spink County first. Then the rest of the James River Valley and
            northeast South Dakota when the job is ours. Site walks for bins.
            Mapping for Yarbo. Pickup or delivery on signs.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TOWNS.map((town) => (
              <li
                key={town}
                className="rounded-md border border-line bg-card px-4 py-3 text-sm text-ink"
              >
                {town}, SD
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FaqBlock items={AREA_FAQS} />
    </main>
  );
}
