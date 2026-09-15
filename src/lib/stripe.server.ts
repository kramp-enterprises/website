import Stripe from "stripe";
import { getRequest } from "@tanstack/react-start/server";
import { productBySlug } from "@/lib/catalog";
import { env } from "@/lib/env.server";

export type CheckoutLine = {
  slug: string;
  qty: number;
  note?: string;
};

function stripeClient() {
  const key = env("STRIPE_SECRET_KEY");
  if (!key) return null;
  return new Stripe(key);
}

export function stripeConfigured() {
  return Boolean(env("STRIPE_SECRET_KEY"));
}

function siteOrigin() {
  const fromEnv = env("SITE_URL")?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const req = getRequest();
  const host =
    req?.headers.get("x-forwarded-host") ?? req?.headers.get("host") ?? "";
  if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
    const proto = req?.headers.get("x-forwarded-proto") ?? "https";
    return `${proto}://${host.split(",")[0]!.trim()}`;
  }
  return "https://www.krampenterprises.com";
}

export async function createStripeCheckout(lines: CheckoutLine[]) {
  const stripe = stripeClient();
  if (!stripe) {
    throw new Error("Card checkout is not live yet. Call the shop to order.");
  }

  const origin = siteOrigin();
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const line of lines) {
    const product = productBySlug(line.slug);
    if (!product) throw new Error("One of those items is no longer in the catalog.");
    if (product.kind === "quote" || product.priceCents <= 0) {
      throw new Error("Grain systems are quoted — they cannot be paid in the cart.");
    }
    const qty = Math.min(20, Math.max(1, Math.floor(line.qty) || 1));
    const note = line.note?.trim().slice(0, 500);
    const descriptionParts = [
      product.kind === "custom" ? "Deposit toward the job" : product.priceNote,
      note ? `Notes: ${note}` : null,
    ].filter(Boolean);

    items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name:
            product.kind === "custom"
              ? `${product.name} (deposit)`
              : product.name,
          description: descriptionParts.join(" · ") || undefined,
          images: [`${origin}${product.image}`],
          metadata: { slug: product.slug },
        },
      },
    });
  }

  if (items.length === 0) throw new Error("Cart is empty.");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items,
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US"] },
    customer_creation: "always",
    allow_promotion_codes: true,
    custom_text: {
      submit: {
        message:
          "Kramp Enterprises will confirm stock, freight, and install after this payment. Grain bins stay quote-only.",
      },
    },
    payment_intent_data: {
      description: "Kramp Enterprises store order",
      metadata: { source: "krampenterprises.com" },
    },
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL.");
  return { url: session.url };
}

export async function readCheckoutReceipt(sessionId: string) {
  const stripe = stripeClient();
  if (!stripe || !sessionId.startsWith("cs_")) return null;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid" && session.status !== "complete") {
    return null;
  }
  return {
    email: session.customer_details?.email ?? null,
    amountCents: session.amount_total ?? 0,
  };
}
