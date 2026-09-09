import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { ProductCategory } from "@/lib/catalog";

type Cat = "all" | ProductCategory;

const CATS: Cat[] = ["all", "yarbo", "signs", "tables", "bins"];

export type StoreSearch = { cat?: Cat };

export const Route = createFileRoute("/store")({
  validateSearch: (search: Record<string, unknown>): StoreSearch => ({
    cat: CATS.includes(search.cat as Cat) ? (search.cat as Cat) : "all",
  }),
  component: StoreLayout,
});

function StoreLayout() {
  return <Outlet />;
}
