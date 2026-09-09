import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = PRODUCTS.filter((p) =>
    ["farm-name-sign", "deer-sign", "fire-pit", "rolling-table"].includes(p.slug),
  );

  return (
    <main>
      <section className="bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-14 text-center sm:py-20">
          <img
            src="/images/logo.png"
            alt="Kramp Enterprises"
            className="h-auto w-full max-w-xl object-contain object-center sm:max-w-2xl"
          />
          <p className="mt-8 max-w-xl font-display text-sm uppercase tracking-[0.28em] text-muted">
            Brentford, South Dakota · est. 1985
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight text-forest sm:text-6xl">
            Grain. Yard. Steel.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            GSI grain systems, Yarbo robotic yard care, and custom plasma from
            the same crew on 6th Street.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/quote">Get a bin quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/store">Shop the store</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-3">
        <Door
          to="/grain-bins"
          image="/images/bins/site-crane.jpg"
          kicker="Construction"
          title="Grain bins & handling"
          copy="GSI dealer. Bins, augers, sweeps, fans, monitoring, and the concrete under it — site walk to standing steel."
          position="center"
        />
        <Door
          to="/yarbo"
          image="/images/yarbo/mower-acres.jpg"
          video="/videos/yarbo-mow.mp4"
          kicker="Dealer"
          title="Yarbo yard robots"
          copy="One Core. Mow in July, blow snow in January. Mapped and serviced locally — not a box on a porch."
        />
        <Door
          to="/fabrication"
          image="/images/plasma-cut.jpg"
          video="/videos/plasma-cut.mp4"
          kicker="6th Street Fab"
          title="Custom signs & steel"
          copy="Plasma-cut farm names, portraits, fire boxes, tables, and stairs. Proof, cut, powder, hang."
          position="center"
        />
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
                From this shop
              </p>
              <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
                Real pieces. Real yard.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/store">
                Full catalog <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img
          src="/images/shop-weld.jpg"
          alt="Fit-up on the welding table in Brentford"
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
            Why this shop
          </p>
          <h2 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
            Repeat business is the whole model.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We do our own layout, our own CAD, and most of our own iron. Grain
            crews, a plasma table, and a Yarbo dealer desk in the same building
            in Brentford — so a bin pad, a farm sign, and a robot on the lawn
            don’t become three different phone trees.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink">
            <li>GSI dealer · bins, handling, conditioning</li>
            <li>Yarbo authorized dealer · South Dakota acreage</li>
            <li>CNC plasma, powder coat, custom steel</li>
            <li>James River Valley and northeast South Dakota</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/about">About the crew</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/gallery">See the work</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Door({
  to,
  image,
  video,
  kicker,
  title,
  copy,
  position = "top",
}: {
  to: "/grain-bins" | "/yarbo" | "/fabrication";
  image: string;
  video?: string;
  kicker: string;
  title: string;
  copy: string;
  position?: "top" | "center";
}) {
  const pos = position === "center" ? "object-center" : "object-top";
  return (
    <Link
      to={to}
      className="group relative isolate overflow-hidden rounded-xl bg-forest-deep text-cream"
    >
      <img
        src={image}
        alt=""
        className={cn(
          "aspect-[4/5] w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-[1.04] sm:aspect-[3/4]",
          pos,
        )}
      />
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          src={video}
          className={cn(
            "absolute inset-0 size-full object-cover opacity-70 motion-reduce:hidden",
            pos,
          )}
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-forest-deep via-forest-deep/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-display text-[11px] uppercase tracking-[0.22em] text-cream/70">
          {kicker}
        </p>
        <h2 className="mt-1 font-display text-3xl leading-none">{title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/80">{copy}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em]">
          Open <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
