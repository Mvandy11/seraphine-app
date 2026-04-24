// src/services/subscriptionService.ts

const EDGE_FUNCTION_URL =
  "https://bxxvgumwlfhfzhmqvxsh.supabase.co/functions/v1/create-subscription";

// ─── Types ────────────────────────────────────────────────────

type CreateSetupIntentResponse = {
  clientSecret: string;
};

type StartSubscriptionResponse = {
  status: string;
  subscriptionId?: string;
  clientSecret?: string | null;
  subscription?: any;
};

type CancelSubscriptionResponse = {
  status: string;
  subscription?: any;
};

type CheckStatusResponse = {
  isSubscribed: boolean;
  subscription: any | null;
};

// ─── Create SetupIntent ───────────────────────────────────────

export async function createSetupIntent(userId: string, email: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email, action: "create_setup_intent" }),
  });
  if (!res.ok) throw new Error("Failed to create SetupIntent");
  const data = (await res.json()) as CreateSetupIntentResponse;
  return data.clientSecret;
}

// ─── Start Subscription ───────────────────────────────────────

export async function startSubscription(
  userId: string,
  email: string,
  paymentMethodId: string
) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email, paymentMethodId, action: "start_subscription" }),
  });
  if (!res.ok) throw new Error("Failed to start subscription");
  return (await res.json()) as StartSubscriptionResponse;
}

// ─── Cancel Subscription ──────────────────────────────────────

export async function cancelSubscription(userId: string, email: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email, action: "cancel" }),
  });
  if (!res.ok) throw new Error("Failed to cancel subscription");
  return (await res.json()) as CancelSubscriptionResponse;
}

// ─── Check Stripe Subscription Status ────────────────────────

export async function checkStripeSubscription(
  userId: string,
  email: string
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email, action: "check_status" }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as CheckStatusResponse;
    return data.isSubscribed === true;
  } catch {
    return false;
  }
}
