import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/catalog";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const cutout = Boolean(product.cutout);
  return (
    <Link
      to="/store/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-[0_1px_0_rgba(20,24,20,0.04)]"
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          cutout ? "bg-paper p-5" : "bg-forest-deep",
        )}
      >
        <img
          src={product.image}
          alt=""
          className={cn(
            "size-full transition-transform duration-500 group-hover:scale-[1.03]",
            cutout ? "object-contain cutout-shadow" : "object-cover",
          )}
        />
        {product.badge ? (
          <span className="absolute top-3 left-3">
            <Badge className="bg-cream text-forest">{product.badge}</Badge>
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">
          {product.category === "yarbo"
            ? "Yarbo"
            : product.category === "bins"
              ? "Grain systems"
              : product.category === "tables"
                ? "Shop steel"
                : "Signs"}
        </p>
        <h3 className="font-display text-2xl leading-tight text-forest">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{product.blurb}</p>
        <p className="mt-auto pt-3 font-display text-lg text-forest tabular-nums">
          {product.kind === "quote" ? "Request a quote" : `From ${money(product.priceCents)}`}
        </p>
      </div>
    </Link>
  );
}
