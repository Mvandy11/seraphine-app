// src/services/subscriptionService.ts

const EDGE_FUNCTION_URL =
  "https://bxxvgumwlfhfzhmqvxsh.supabase.co/functions/v1/create-subscription";

// -----------------------------
// Types
// -----------------------------
type CreateSetupIntentResponse = {
  clientSecret: string;
};

type StartSubscriptionResponse = {
  status: string;
  subscription: any;
};

type CancelSubscriptionResponse = {
  status: string;
  subscription?: any;
};

type GetSubscriptionResponse = {
  status: string;
  tier: string | null;
  cancel_at_period_end: boolean;
  trial_ends_at: string | null;
};

// -----------------------------
// Create SetupIntent
// -----------------------------
export async function createSetupIntent(userId: string, email: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      email,
      action: "create_setup_intent",
    }),
  });

  if (!res.ok) throw new Error("Failed to create SetupIntent");
  const data = (await res.json()) as CreateSetupIntentResponse;
  return data.clientSecret;
}

// -----------------------------
// Start Subscription
// -----------------------------
export async function startSubscription(
  userId: string,
  paymentMethodId: string
) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      paymentMethodId,
      action: "start_subscription",
    }),
  });

  if (!res.ok) throw new Error("Failed to start subscription");
  const data = (await res.json()) as StartSubscriptionResponse;
  return data;
}

// -----------------------------
// Cancel Subscription
// -----------------------------
export async function cancelSubscription(userId: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      action: "cancel",
    }),
  });

  if (!res.ok) throw new Error("Failed to cancel subscription");
  const data = (await res.json()) as CancelSubscriptionResponse;
  return data;
}

// -----------------------------
// Get Subscription Status
// -----------------------------
export async function getSubscription(userId: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      action: "check_status",
    }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as GetSubscriptionResponse;
  return data;
}
