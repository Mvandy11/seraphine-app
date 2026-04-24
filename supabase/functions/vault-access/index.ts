// supabase/functions/vault-access/index.ts
// Vault Access Orchestrator — returns { allowed, reason, trialEnds? }
// Checks Supabase profile trial_start / trial_end only.
// No Stripe checks. No text output. Always returns JSON.

import { createClient } from "npm:@supabase/supabase-js@2";

// Auto-injected by Supabase Edge Runtime
const SUPABASE_URL             = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

type VaultResult =
  | { allowed: true;  reason: "trial-active"; trialEnds: string }
  | { allowed: false; reason: "no-user" | "no-profile" | "trial-expired" | "no-trial" | string };

function respond(body: VaultResult, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  // ── CORS preflight ───────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    // ── 1. Extract user JWT from Authorization header ──────────
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return respond({ allowed: false, reason: "no-user" });
    }

    // ── 2. Verify JWT and get user via service-role client ─────
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: { user }, error: authError } = await adminClient.auth.getUser(token);

    if (authError || !user) {
      return respond({ allowed: false, reason: "no-user" });
    }

    // ── 3. Fetch profile row ───────────────────────────────────
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("trial_start, trial_end")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return respond({ allowed: false, reason: "no-profile" });
    }

    // ── 4. Check trial window ──────────────────────────────────
    const { trial_end } = profile;

    // Missing trial_end → treat as expired
    if (!trial_end) {
      return respond({ allowed: false, reason: "no-trial" });
    }

    const now      = Date.now();
    const trialEnd = new Date(trial_end).getTime();

    if (Number.isNaN(trialEnd)) {
      return respond({ allowed: false, reason: "no-trial" });
    }

    if (now < trialEnd) {
      return respond({
        allowed: true,
        reason: "trial-active",
        trialEnds: new Date(trialEnd).toISOString(),
      });
    }

    return respond({ allowed: false, reason: "trial-expired" });

  } catch (err) {
    // Never throw — always return JSON
    const reason = err instanceof Error ? err.message : "unknown-error";
    return respond({ allowed: false, reason }, 500);
  }
});
