import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { productBySlug, isCutoutSrc } from "@/lib/catalog";
import { cn, money } from "@/lib/utils";

export const Route = createFileRoute("/store/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug);
  const add = useCart((s) => s.add);
  const [note, setNote] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [slug]);

  if (!product) throw notFound();

  const item = product;
  const shots = [item.image, ...(item.shots ?? []).filter((s) => s !== item.image)];
  const current = shots[Math.min(active, shots.length - 1)] ?? item.image;
  const cutout = isCutoutSrc(current);

  function addToCart() {
    add(item.slug, 1, note || undefined);
    toast.success(`Added ${item.name}`);
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <div
          className={cn(
            "overflow-hidden rounded-xl",
            cutout ? "bg-paper p-8" : "bg-forest-deep",
          )}
        >
          <img
            src={current}
            alt={item.name}
            className={cn(
              "w-full",
              cutout
                ? "mx-auto max-h-[520px] object-contain cutout-shadow"
                : "aspect-[4/3] object-cover",
            )}
          />
        </div>
        {shots.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {shots.map((src, i) => {
              const thumbCut = isCutoutSrc(src);
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View photo ${i + 1}`}
                  aria-pressed={i === active}
                  className={cn(
                    "size-20 shrink-0 overflow-hidden rounded-md border",
                    i === active ? "border-forest ring-1 ring-forest" : "border-line",
                    thumbCut ? "bg-paper p-1.5" : "bg-forest-deep",
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className={cn(
                      "size-full",
                      thumbCut ? "object-contain" : "object-cover",
                    )}
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div>
        <Link
          to="/store"
          className="font-display text-xs uppercase tracking-[0.18em] text-muted"
        >
          ← Store
        </Link>
        <h1 className="mt-3 font-display text-5xl text-forest">{item.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{item.blurb}</p>
        <p className="mt-6 font-display text-3xl text-forest tabular-nums">
          {item.kind === "quote" ? "Quoted per site" : money(item.priceCents)}
        </p>
        {item.priceNote ? (
          <p className="mt-1 text-sm text-steel">{item.priceNote}</p>
        ) : null}
        <ul className="mt-6 space-y-2 text-sm text-ink">
          {item.details.map((d) => (
            <li key={d} className="border-l-2 border-leaf pl-3">
              {d}
            </li>
          ))}
        </ul>

        {item.kind === "quote" ? (
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/quote">Request a grain quote</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {item.kind === "custom" ? (
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Wording, size, file name, color, install notes…"
              />
            ) : null}
            <Button size="lg" onClick={addToCart}>
              Add to cart
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
