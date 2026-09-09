import { Link } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { cartCount, useCart } from "@/lib/cart";
import { PHONE, PHONE_TEL } from "@/lib/catalog";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/grain-bins", label: "Grain bins" },
  { to: "/yarbo", label: "Yarbo" },
  { to: "/fabrication", label: "Fab & signs" },
  { to: "/store", label: "Store" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const count = useCart((s) => cartCount(s.lines));
  const shown = hydrated ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <BrandMark compact />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-display text-[13px] uppercase tracking-[0.16em] text-forest/80 hover:text-leaf"
              activeProps={{ className: "text-leaf" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden items-center gap-2 font-display text-[13px] uppercase tracking-[0.12em] text-forest md:flex"
          >
            <Phone className="size-4" />
            {PHONE}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/quote">Bin quote</Link>
          </Button>
          <Link
            to="/cart"
            className="relative grid size-11 place-items-center rounded-md text-forest hover:bg-forest/10"
            aria-label="Cart"
          >
            <ShoppingBag className="size-5" />
            {shown > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-leaf px-1 font-display text-[10px] leading-4 text-cream tabular-nums">
                {shown}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-forest lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "border-t border-line bg-paper lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center font-display text-sm uppercase tracking-[0.16em] text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center font-display text-sm uppercase tracking-[0.16em] text-forest"
          >
            Contact
          </Link>
          <Link
            to="/quote"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center font-display text-sm uppercase tracking-[0.16em] text-leaf"
          >
            Grain bin quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
