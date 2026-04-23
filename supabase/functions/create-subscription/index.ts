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
  // ------------------------------------------------------------
  // CORS — MUST BE FIRST
  // ------------------------------------------------------------
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    });
  }

  try {
    const { userId, email, paymentMethodId, action } = await req.json();

    if (!userId || !email) {
      return new Response("Missing userId or email", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      });
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
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
          }
        });
      }

      const sub = subs.data[0];

      const canceled = await stripe.subscriptions.update(sub.id, {
        cancel_at_period_end: true,
      });

      return new Response(JSON.stringify({ status: "canceled", subscription: canceled }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      });
    }

    // ------------------------------------------------------------
    // 3. Create SetupIntent
    // ------------------------------------------------------------
    if (action === "create_setup_intent") {
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
      });

      return new Response(JSON.stringify({ clientSecret: setupIntent.client_secret }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*