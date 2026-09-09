import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/yarbo")({ component: YarboPage });

const LINEUP = [
  {
    src: "/images/yarbo/mower-acres.jpg",
    label: "Mow",
    alt: "Yarbo Lawn Mower Pro cutting a large lawn",
    contain: false,
  },
  {
    src: "/images/yarbo/snow-throw.jpg",
    label: "Snow",
    alt: "Yarbo snow blower throwing snow off a driveway",
    contain: false,
  },
  {
    src: "/images/yarbo/blower-leaves.jpg",
    label: "Leaves",
    alt: "Yarbo blower clearing leaves",
    contain: false,
  },
  {
    src: "/images/yarbo/kit-4in1.jpg",
    label: "The system",
    alt: "Yarbo Core with mower, snow, blower, and trimmer modules",
    contain: true,
  },
];

function YarboPage() {
  const items = PRODUCTS.filter((p) => p.category === "yarbo");
  return (
    <main>
      <PageHero
        kicker="Authorized dealer"
        title="Yarbo for South Dakota yards — not a gadget in a box."
        lede="One tracked Core. Swap mower, snow, and blower modules. We sell it, map your place, and stay on the machine after the first winter."
        image="/images/yarbo/mower-acres.jpg"
        video="/videos/yarbo-mow.mp4"
        position="center"
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="invert">
            <Link to="/store" search={{ cat: "yarbo" }}>
              Shop Yarbo
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-forest">
            <Link to="/contact">Book a demo</Link>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl text-forest">Why buy it here</h2>
          <p className="mt-4 leading-relaxed text-muted">
            A robot on a prairie acreage is a different job than a suburban
            postage stamp. Wind, gravel, long driveways, and January. We map
            RTK, set the dock, and come back when a module or a firmware night
            needs a human in Brentford — not a ticket queue.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          {[
            "Local delivery, mapping, and walkthrough",
            "Core + Mower Pro + Snow is the acreage kit we actually sell",
            "Winter service on snow modules and tracks",
            "Fits the same farms we already stand bins on",
          ].map((t) => (
            <li key={t} className="border-l-2 border-leaf pl-4 text-ink">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-4xl text-forest">On the shelf</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            List prices match current Y Series modules. Dealer setup in our
            service area is included on the acreage kit — call on freight past
            that.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
          Y Series
        </p>
        <h2 className="mt-2 font-display text-4xl text-forest">One Core. Every season.</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Official Yarbo product photography. The machines are sold, mapped, and
          serviced from Brentford — not a porch drop-ship.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LINEUP.map((p) => (
            <figure key={p.label} className="overflow-hidden rounded-xl border border-line bg-card">
              <img
                src={p.src}
                alt={p.alt}
                className={
                  p.contain
                    ? "aspect-[4/5] w-full bg-paper object-contain p-4"
                    : "aspect-[4/5] w-full object-cover"
                }
              />
              <figcaption className="px-3 py-3 font-display text-sm text-forest">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
