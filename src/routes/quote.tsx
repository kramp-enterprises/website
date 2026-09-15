import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () =>
    pageHead({
      title: "Grain Bin Quote | GSI Systems in South Dakota",
      description:
        "Request a custom GSI grain bin and handling quote from Kramp Enterprises in Brentford. Site walk, in-house CAD, our crew. Call (605) 887-3456.",
      path: "/quote",
      image: "/images/bins/harvest.jpg",
    }),
});

function QuotePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Grain quote", path: "/quote" },
        ])}
      />
      <div>
        <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">Grain systems</p>
        <h1 className="mt-2 font-display text-5xl text-forest">Tell us the farm. We’ll walk it.</h1>
        <p className="mt-4 leading-relaxed text-muted">
          New site or adding to what you have — diameter, bushels, handling,
          wet holding, power, and when you need it standing. No online price on
          a bin. That’s on purpose.
        </p>
        <img
          src="/images/bins/harvest.jpg"
          alt="Grain bins with a swing-away auger loading a hopper trailer in South Dakota"
          className="mt-8 aspect-video w-full rounded-xl object-cover"
        />
      </div>
      <div className="rounded-xl border border-line bg-card p-6">
        <LeadForm kind="quote" />
      </div>
    </main>
  );
}
