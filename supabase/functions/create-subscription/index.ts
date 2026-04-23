// supabase/functions/create-subscription/index.ts
// One-tier subscription engine — Full Access Membership

import Stripe from "npm:stripe@14";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const FULL_PRICE_ID = Deno.env.get("FULL_PRICE_ID")!;

// ─── CORS headers reused on every response ────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  // ── CORS preflight — must be first ──────────────────────────
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const body = await req.json();
    const { userId, email, paymentMethodId, action } = body;

    if (!userId || !email) {
      return json({ error: "Missing userId or email" }, 400);
    }

    // ── 1. Get or create Stripe customer ──────────────────────
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer = customers.data.length ? customers.data[0] : null;

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      });
    }

    // ── 2. Cancel subscription ────────────────────────────────
    if (action === "cancel") {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      if (subs.data.length === 0) {
        return json({ status: "no_active_subscription" });
      }

      const canceled = await stripe.subscriptions.update(subs.data[0].id, {
        cancel_at_period_end: true,
      });

      return json({ status: "canceled", subscription: canceled });
    }

    // ── 3. Create SetupIntent ─────────────────────────────────
    if (action === "create_setup_intent") {
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      return json({ clientSecret: setupIntent.client_secret });
    }

    // ── 4. Start subscription ─────────────────────────────────
    if (action === "start_subscription") {
      if (!paymentMethodId) {
        return json({ error: "Missing paymentMethodId" }, 400);
      }

      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });

      // Set as default
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: FULL_PRICE_ID }],
        default_payment_method: paymentMethodId,
        expand: ["latest_invoice.payment_intent"],
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent | null;

      return json({
        status: subscription.status,
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret ?? null,
      });
    }

    // ── 5. Check subscription status ──────────────────────────
    if (action === "check_status") {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      return json({
        isSubscribed: subs.data.length > 0,
        subscription: subs.data[0] ?? null,
      });
    }

    return json({ error: "Unknown action" }, 400);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return json({ error: message }, 500);
  }
});
