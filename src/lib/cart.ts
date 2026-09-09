import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, type Product } from "@/lib/catalog";

export type CartLine = {
  slug: string;
  qty: number;
  note?: string;
};

type CartState = {
  lines: CartLine[];
  add: (slug: string, qty?: number, note?: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (slug, qty = 1, note) => {
        const existing = get().lines.find((l) => l.slug === slug);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.slug === slug
                ? { ...l, qty: l.qty + qty, note: note ?? l.note }
                : l,
            ),
          });
          return;
        }
        set({ lines: [...get().lines, { slug, qty, note }] });
      },
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.slug !== slug) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        });
      },
      remove: (slug) => set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "kramp-cart" },
  ),
);

export function hydrateLines(lines: CartLine[]) {
  return lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.slug === line.slug);
      if (!product) return null;
      return { ...line, product };
    })
    .filter((x): x is CartLine & { product: Product } => Boolean(x));
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return hydrateLines(lines).reduce((n, l) => n + l.product.priceCents * l.qty, 0);
}
