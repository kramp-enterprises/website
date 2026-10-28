import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { ProductCategory } from "@/lib/catalog";

type Cat = "all" | ProductCategory;

const CATS: Cat[] = ["all", "yarbo", "signs", "tables", "bins"];

export type StoreSearch = { cat?: Cat };

export const Route = createFileRoute("/store")({
  validateSearch: (search: Record<string, unknown>): StoreSearch => {
    const cat = search.cat;
    if (typeof cat === "string" && (CATS as readonly string[]).includes(cat)) {
      return { cat: cat as Cat };
    }
    return {};
  },
  component: StoreLayout,
});

function StoreLayout() {
  return <Outlet />;
}
