// src/services/subscriptionService.ts

const EDGE_FUNCTION_URL =
  "https://bxxvgumwlfhfzhmqvxsh.supabase.co/functions/v1/create-subscription";

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

export async function startSubscription(
  userId: string,
  email: string,
  paymentMethodId: string
) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      email,
      paymentMethodId,
      action: "start_subscription",
    }),
  });

  if (!res.ok) throw new Error("Failed to start subscription");
  const data = (await res.json()) as StartSubscriptionResponse;
  return data;
}

export async function cancelSubscription(userId: string, email: string) {
  const res = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      email,
      action: "cancel",
    }),
  });

  if (!res.ok) throw new Error("Failed to cancel subscription");
  const data = (await res.json()) as CancelSubscriptionResponse;
  return data;
}
