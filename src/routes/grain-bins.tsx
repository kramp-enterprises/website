import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/grain-bins")({ component: GrainBinsPage });

const STEPS = [
  {
    n: "01",
    t: "Walk the site",
    d: "We kick the dirt with you — power, traffic, wet holding, dryer, and where the next bin goes in five years.",
  },
  {
    n: "02",
    t: "Draw it in-house",
    d: "CAD layouts from our shop, not a faxed sketch. You see the pad, the legs, and the handling before steel ships.",
  },
  {
    n: "03",
    t: "Pour and stand",
    d: "Concrete, millwright, and bin raise with our crew. We keep subs thin on purpose.",
  },
  {
    n: "04",
    t: "Stay on it",
    d: "Fans, sweeps, plugged sumps, and harvest-night calls. Repeat business is how this shop stays busy.",
  },
];

const JOBS = [
  {
    src: "/images/bins/harvest.jpg",
    title: "Harvest loadout",
    alt: "Grain bins with a swing-away auger loading a hopper trailer at dusk",
    span: "lg:col-span-2",
    tall: false,
  },
  {
    src: "/images/bins/leg.jpg",
    title: "GSI legs and catwalks",
    alt: "GSI bucket elevator and catwalks against a clear sky",
    span: "",
    tall: true,
  },
  {
    src: "/images/bins/catwalk.jpg",
    title: "Setting a catwalk",
    alt: "Crane lifting a catwalk between grain bins with a worker on the roof",
    span: "",
    tall: true,
  },
  {
    src: "/images/bins/complex.jpg",
    title: "Commercial storage",
    alt: "Commercial GSI grain bin complex with catwalks and a dryer",
    span: "lg:col-span-2",
    tall: false,
  },
  {
    src: "/images/bins/dryer.jpg",
    title: "Dryer, elevator, control",
    alt: "Grain dryer, bucket elevator, bins, and green control building",
    span: "",
    tall: false,
  },
  {
    src: "/images/bins/site-crane.jpg",
    title: "Crane on the site",
    alt: "Two grain bins with a dryer and a crane truck on a South Dakota farm",
    span: "",
    tall: true,
  },
];

function GrainBinsPage() {
  return (
    <main>
      <PageHero
        kicker="GSI dealer"
        title="Grain bins & handling that get stood right."
        lede="Farm and commercial storage, material handling, and conditioning — designed, poured, and installed from Brentford for the James River Valley and northeast South Dakota."
        image="/images/bins/harvest.jpg"
        position="center"
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="invert">
            <Link to="/quote">Request a bin quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-forest">
            <Link to="/gallery">Project gallery</Link>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl text-forest">What we sell and stand</h2>
          <p className="mt-4 text-muted leading-relaxed">
            GSI grain bins and the iron around them. We price the system — not a
            mystery line item — and we do the majority of the work ourselves.
            These are sites this crew stood.
          </p>
        </div>
        <ul className="grid gap-3 text-sm">
          {[
            "Farm and commercial GSI bins",
            "Handling: augers, legs, conveyors",
            "Unloads, U-troughs, and paddle sweeps",
            "Aeration fans, heaters, and conditioning",
            "Bin monitoring and spreaders",
            "Concrete pads, rings, and millwright",
            "Service, belts, motors, and harvest repairs",
          ].map((item) => (
            <li
              key={item}
              className="rounded-md border border-line bg-card px-4 py-3 text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
            Job sites
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
            Stood by this crew.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Farm loadout, commercial complexes, dryers, legs, and the day a
            catwalk goes in the air. Send more photos anytime — they go up here.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JOBS.map((job) => (
              <figure
                key={job.src}
                className={cn(
                  "overflow-hidden rounded-xl border border-line bg-card",
                  job.span,
                )}
              >
                <img
                  src={job.src}
                  alt={job.alt}
                  className={cn(
                    "w-full object-cover",
                    job.tall ? "aspect-[3/4] object-top" : "aspect-[4/3] object-center",
                  )}
                />
                <figcaption className="px-4 py-3 font-display text-sm text-forest">
                  {job.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <article key={s.n}>
              <p className="font-display text-sm tracking-[0.2em] text-leaf">{s.n}</p>
              <h3 className="mt-2 font-display text-2xl text-forest">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-4xl">No cart price on a bin site.</h2>
            <p className="mt-2 max-w-xl text-sm text-cream/75">
              Diameter, bushels, handling, and concrete decide the number. Send
              the farm and we will walk it.
            </p>
          </div>
          <Button asChild size="lg" variant="invert">
            <Link to="/quote">Start a quote</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
