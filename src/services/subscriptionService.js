// src/services/subscriptionService.ts
const EDGE_FUNCTION_URL = "https://bxxvgumwlfhfzhmqvxsh.supabase.co/functions/v1/create-subscription";
// -----------------------------
// Create SetupIntent
// -----------------------------
export async function createSetupIntent(userId, email) {
    const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            email,
            action: "create_setup_intent",
        }),
    });
    if (!res.ok)
        throw new Error("Failed to create SetupIntent");
    const data = (await res.json());
    return data.clientSecret;
}
// -----------------------------
// Start Subscription
// -----------------------------
export async function startSubscription(userId, paymentMethodId) {
    const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            paymentMethodId,
            action: "start_subscription",
        }),
    });
    if (!res.ok)
        throw new Error("Failed to start subscription");
    const data = (await res.json());
    return data;
}
// -----------------------------
// Cancel Subscription
// -----------------------------
export async function cancelSubscription(userId) {
    const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            action: "cancel",
        }),
    });
    if (!res.ok)
        throw new Error("Failed to cancel subscription");
    const data = (await res.json());
    return data;
}
// -----------------------------
// Get Subscription Status
// -----------------------------
export async function getSubscription(userId) {
    const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            action: "check_status",
        }),
    });
    if (!res.ok)
        return null;
    const data = (await res.json());
    return data;
}
