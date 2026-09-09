import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ADDRESS, CITY, HOURS, PHONE } from "@/lib/catalog";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
            Kramp Enterprises Inc.
          </p>
          <h1 className="mt-2 font-display text-5xl text-forest sm:text-6xl">
            A Brentford shop that still answers the phone.
          </h1>
          <p className="mt-5 leading-relaxed text-muted">
            Grain bins built the long way — site, drawing, concrete, iron —
            plus a plasma table for the names people hang on barns, and a Yarbo
            dealer desk for yards that are too big to mow for sport. Same
            address as the construction company you already know.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Most of the work is our own crew. Most of the business is repeat.
            If you looked us up as Kramp Construction, you are in the right
            place: this is the full company site.
          </p>
        </div>
        <img
          src="/images/shop-weld.jpg"
          alt="Welding table in the Brentford shop"
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
      </section>
      <section className="border-y border-line bg-paper">
        <div className="mx-auto flex max-w-3xl justify-center px-4 py-10">
          <img
            src="/images/logo-full.png"
            alt="Kramp Enterprises — 605-887-3456 · krampenterprises.com"
            className="h-auto w-full max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl text-forest">Shop</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {ADDRESS}
              <br />
              {CITY}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-forest">Hours</h2>
            <p className="mt-2 text-sm text-muted">{HOURS}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-forest">Call</h2>
            <p className="mt-2 text-sm text-muted">{PHONE}</p>
            <Button asChild className="mt-4" variant="outline">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
