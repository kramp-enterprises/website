import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { cartTotal, hydrateLines, useCart } from "@/lib/cart";
import { PHONE } from "@/lib/catalog";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, money } from "@/lib/utils";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const [placed, setPlaced] = useState(false);
  const hydratedLines = hydrateLines(lines);
  const total = cartTotal(lines);

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-5xl text-forest">Cart</h1>
        <p className="mt-6 text-muted">Loading cart…</p>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-5xl text-forest">Request sent</h1>
        <p className="mt-4 max-w-xl text-muted">
          We have the order request. Call {PHONE} if you need it today. When
          this site is live on krampenterprises.com, these land in the shop
          inbox.
        </p>
        <Button asChild className="mt-6">
          <Link to="/store">Back to the store</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl text-forest">Cart</h1>
      {hydratedLines.length === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-card p-8">
          <p className="text-muted">Nothing in the cart yet.</p>
          <Button asChild className="mt-4">
            <Link to="/store">Open the store</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ul className="space-y-4">
            {hydratedLines.map(({ product, qty, note, slug }) => (
              <li
                key={slug}
                className="flex gap-4 rounded-xl border border-line bg-card p-4"
              >
                <img
                  src={product.image}
                  alt=""
                  className={cn(
                    "size-24 rounded-md",
                    product.cutout
                      ? "bg-paper object-contain p-1.5"
                      : "object-cover",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl text-forest">{product.name}</p>
                  {note ? <p className="text-sm text-muted">{note}</p> : null}
                  <p className="mt-1 text-sm tabular-nums text-steel">
                    {money(product.priceCents)}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="sr-only" htmlFor={`qty-${slug}`}>
                      Quantity
                    </label>
                    <input
                      id={`qty-${slug}`}
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(slug, Number(e.target.value))}
                      className="h-10 w-16 rounded-md border border-line bg-paper px-2 tabular-nums"
                    />
                    <button
                      type="button"
                      className="text-sm text-muted underline"
                      onClick={() => remove(slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-xl border border-line bg-card p-6">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-muted">
              Request this order
            </p>
            <p className="mt-2 font-display text-3xl text-forest tabular-nums">
              {money(total)}
            </p>
            <p className="mt-2 text-sm text-muted">
              This is a dealer request — not a card charge. We confirm stock,
              freight, and install, then invoice.
            </p>
            <div className="mt-6">
              <LeadForm
                kind="order"
                context={hydratedLines
                  .map((l) => `${l.qty}× ${l.product.name}`)
                  .join(", ")}
                onDone={() => {
                  clear();
                  setPlaced(true);
                }}
              />
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
