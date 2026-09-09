import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, type ProductCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Route as StoreRoute } from "./store";

type Cat = "all" | ProductCategory;

const FILTERS: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "yarbo", label: "Yarbo" },
  { id: "signs", label: "Signs" },
  { id: "tables", label: "Steel & tables" },
  { id: "bins", label: "Grain systems" },
];

export const Route = createFileRoute("/store/")({
  component: StorePage,
});

function StorePage() {
  const { cat = "all" } = StoreRoute.useSearch();
  const items = PRODUCTS.filter((p) => cat === "all" || p.category === cat);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
        Store
      </p>
      <h1 className="mt-2 font-display text-5xl text-forest sm:text-6xl">
        Order steel. Quote bins. Buy a robot.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Yarbo and catalog metal can go in the cart. Grain systems stay a quote —
        we will not invent a price for a 48-foot bin.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.id}
            to="/store"
            search={{ cat: f.id }}
            className={cn(
              "inline-flex h-10 items-center rounded-md px-4 font-display text-xs uppercase tracking-[0.16em]",
              cat === f.id
                ? "bg-forest text-cream"
                : "border border-line bg-card text-forest hover:border-forest",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
