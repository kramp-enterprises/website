import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LineSchema = z.object({
  slug: z.string().min(1).max(80),
  qty: z.number().int().min(1).max(20),
  note: z.string().max(500).optional(),
});

export const checkoutReady = createServerFn({ method: "GET" }).handler(
  async () => {
    const { stripeConfigured } = await import("./stripe.server.ts");
    return { ready: stripeConfigured() };
  },
);

export const startCheckout = createServerFn({ method: "POST" })
  .validator(
    z.object({
      lines: z.array(LineSchema).min(1).max(20),
    }),
  )
  .handler(async ({ data }) => {
    const { createStripeCheckout } = await import("./stripe.server.ts");
    return createStripeCheckout(data.lines);
  });

export const checkoutReceipt = createServerFn({ method: "GET" })
  .validator(z.object({ sessionId: z.string().max(200) }))
  .handler(async ({ data }) => {
    const { readCheckoutReceipt } = await import("./stripe.server.ts");
    return readCheckoutReceipt(data.sessionId);
  });
