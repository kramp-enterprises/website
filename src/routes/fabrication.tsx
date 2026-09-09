import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/fabrication")({
  component: FabPage,
});

function FabPage() {
  const items = PRODUCTS.filter((p) => p.category === "signs" || p.category === "tables");
  return (
    <main>
      <PageHero
        kicker="6th Street Fab"
        title="Steel that has a name on it."
        lede="CNC plasma, welding, and powder coat from the shop at 303 East 6th. Farm signs, portraits, fire boxes, tables, stairs — cut here, not drop-shipped."
        image="/images/plasma-cut.jpg"
        video="/videos/plasma-cut.mp4"
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="invert">
            <Link to="/store/$slug" params={{ slug: "custom-cut" }}>
              Start a custom cut
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-forest">
            <Link to="/gallery">Sign gallery</Link>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        {[
          {
            t: "You send it",
            d: "A DXF, a PNG, a napkin sketch, or a family name. We clean the art for plasma.",
          },
          {
            t: "You see a proof",
            d: "Nothing hits the table until the layout and the price are agreed.",
          },
          {
            t: "We finish it",
            d: "Cut, grind, weld if it needs it, powder coat, hardware, hang instructions.",
          },
        ].map((s) => (
          <article key={s.t} className="rounded-xl border border-line bg-card p-6">
            <h2 className="font-display text-2xl text-forest">{s.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
          </article>
        ))}
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-4xl text-forest">From the catalog</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
