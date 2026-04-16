// supabase/functions/create-subscription/index.ts
// One-tier subscription engine — Full Access Membership

import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const FULL_PRICE_ID = Deno.env.get("FULL_PRICE_ID")!;
const CONNECT_ID = Deno.env.get("STRIPE_CONNECT_ACCOUNT_ID")!;

serve(async (req) => {
  try {
    const { userId, email, paymentMethodId, action } = await req.json();

    if (!userId || !email) {
      return new Response("Missing userId or email", { status: 400 });
    }

    // ------------------------------------------------------------
    // 1. Get or create Stripe customer
    // ------------------------------------------------------------
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer = customers.data.length ? customers.data[0] : null;

    if (!customer) {
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      });
    }

    // ------------------------------------------------------------
    // 2. Cancel subscription
    // ------------------------------------------------------------
    if (action === "cancel") {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      if (subs.data.length === 0) {
        return new Response(JSON.stringify({ status: "no_active_subscription" }), {
          status: 200,
        });
      }

      const sub = subs.data[0];

      // Cancel at period end (no refund)
      const canceled = await stripe.subscriptions.update(sub.id, {
        cancel_at_period_end: true,
      });

      return new Response(JSON.stringify({ status: "canceled", subscription: canceled }), {
        status: 200,
      });
    }

    // ------------------------------------------------------------
    // 3. Create SetupIntent (attach payment method)
    // ------------------------------------------------------------
    if (action === "create_setup_intent") {
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      return new Response(JSON.stringify({ clientSecret: setupIntent.client_secret }), {
        status: 200,
      });
    }

    // ------------------------------------------------------------
    // 4. Start subscription
    // ------------------------------------------------------------
    if (action === "start_subscription") {
      if (!paymentMethodId) {
        return new Response("Missing paymentMethodId", { status: 400 });
      }

      // Attach payment method
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });

      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: FULL_PRICE_ID }],
        expand: ["latest_invoice.payment_intent"],
        transfer_data: {
          destination: CONNECT_ID,
        },
      });

      return new Response(JSON.stringify({ status: "active", subscription }), {
        status: 200,
      });
    }

    return new Response("Invalid action", { status: 400 });
  } catch (err) {
    console.error("Subscription error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
