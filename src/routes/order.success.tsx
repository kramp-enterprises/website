import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { checkoutReceipt } from "@/lib/checkout";
import { useCart } from "@/lib/cart";
import { EMAIL, PHONE, PHONE_TEL } from "@/lib/catalog";
import { money } from "@/lib/utils";

type Search = { session_id?: string };

export const Route = createFileRoute("/order/success")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    session_id:
      typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { session_id: sessionId } = Route.useSearch();
  const clear = useCart((s) => s.clear);
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    clear();
    if (!sessionId) return;
    void checkoutReceipt({ data: { sessionId } })
      .then((r) => {
        if (r?.amountCents) setAmount(r.amountCents);
      })
      .catch(() => {});
  }, [clear, sessionId]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
        Paid
      </p>
      <h1 className="mt-2 font-display text-5xl text-forest">
        We have the order.
      </h1>
      {amount ? (
        <p className="mt-4 font-display text-2xl tabular-nums text-forest">
          {money(amount)}
        </p>
      ) : null}
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Stripe took the card. The shop in Brentford will confirm stock, freight,
        and install and email the receipt. Custom steel is a deposit — we proof
        the piece before it hits the table.
      </p>
      <p className="mt-4 text-sm text-muted">
        Questions:{" "}
        <a href={`tel:${PHONE_TEL}`} className="text-forest">
          {PHONE}
        </a>{" "}
        or{" "}
        <a href={`mailto:${EMAIL}`} className="text-forest">
          {EMAIL}
        </a>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/store">Back to the store</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </main>
  );
}
