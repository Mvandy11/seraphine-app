import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/contexts/AppContext";
import {
  startSubscription,
  cancelSubscription,
  checkStripeSubscription,
} from "@/services/subscriptionService";

// ─── Dev bypass ───────────────────────────────────────────────
// Vite sets import.meta.env.DEV = true in `npm run dev`, false in builds.
const DEV_MODE = import.meta.env.DEV;

// ─── Types ────────────────────────────────────────────────────

type SubscriptionStatus = "none" | "trial" | "active" | "canceling";

export interface SubscriptionInfo {
  plan: string;
  current_period_end: number | null;
  trialEnds?: string | null;
}

type PaymentContextValue = {
  status: SubscriptionStatus;
  isSubscribed: boolean;
  subscription: SubscriptionInfo | null;
  loading: boolean;
  isLoading: boolean;
  subscribe: (paymentMethodId: string) => Promise<void>;
  cancel: () => Promise<void>;
  refresh: () => Promise<void>;
};

const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);

// ─── Trial check — queries profiles.trial_end directly ────────
// If the row doesn't exist yet (signed up before trigger was created),
// we upsert one now with a fresh 7-day trial.

async function checkTrialActive(
  userId: string
): Promise<{ active: boolean; trialEnds: string | null }> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("trial_end")
      .eq("id", userId)
      .single();

    // PGRST116 = no rows found — create the profile row now
    if (error?.code === "PGRST116" || (!error && !data)) {
      const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: upserted, error: upsertErr } = await supabase
        .from("profiles")
        .upsert(
          { id: userId, trial_start: new Date().toISOString(), trial_end: trialEnd },
          { onConflict: "id" }
        )
        .select("trial_end")
        .single();

      if (upsertErr || !upserted?.trial_end) return { active: false, trialEnds: null };
      return { active: true, trialEnds: upserted.trial_end };
    }

    if (error || !data?.trial_end) return { active: false, trialEnds: null };

    const trialEndMs = new Date(data.trial_end).getTime();
    if (Number.isNaN(trialEndMs)) return { active: false, trialEnds: null };

    return { active: Date.now() < trialEndMs, trialEnds: data.trial_end };
  } catch {
    return { active: false, trialEnds: null };
  }
}

// ─── Provider ─────────────────────────────────────────────────

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read user directly from AppContext — no prop threading needed
  const { user } = useAppContext();

  const [status, setStatus]             = useState<SubscriptionStatus>("none");
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading]       = useState(false);
  // True while the initial trial/stripe check is in-flight.
  // ProtectedRoute must wait for this before deciding to redirect.
  const [isChecking, setIsChecking]     = useState(true);

  const refresh = async () => {
    if (!user?.id || !user?.email) {
      setStatus("none");
      setSubscription(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    try {
      // 1. Check trial first (fast — no Stripe call)
      const trial = await checkTrialActive(user.id);
      if (trial.active) {
        setStatus("trial");
        setSubscription({ plan: "trial", current_period_end: null, trialEnds: trial.trialEnds });
        return;
      }

      // 2. Trial expired — check Stripe for paid subscription
      const stripeActive = await checkStripeSubscription(user.id, user.email);
      if (stripeActive) {
        setStatus("active");
        setSubscription({ plan: "full", current_period_end: null });
      } else {
        setStatus("none");
        setSubscription(null);
      }
    } finally {
      setIsChecking(false);
    }
  };

  // Re-check whenever the logged-in user changes
  useEffect(() => {
    refresh();
  }, [user?.id]);

  const subscribe = async (paymentMethodId: string) => {
    if (!user?.id || !user?.email) return;
    setIsLoading(true);
    try {
      const res = await startSubscription(user.id, user.email, paymentMethodId);
      if (res.status === "active") {
        setStatus("active");
        setSubscription({
          plan: "full",
          current_period_end: res.subscription?.current_period_end ?? null,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = async () => {
    if (!user?.id || !user?.email) return;
    setIsLoading(true);
    try {
      const res = await cancelSubscription(user.id, user.email);
      if (res.status === "canceled") setStatus("canceling");
    } finally {
      setIsLoading(false);
    }
  };

  // isSubscribed = true for trial OR active paid plan
  const isSubscribed        = DEV_MODE ? true : status === "trial" || status === "active";
  const resolvedStatus      = DEV_MODE ? "active" as SubscriptionStatus : status;
  const resolvedSubscription = DEV_MODE ? { plan: "full", current_period_end: null } : subscription;
  // Expose isChecking as `loading` so ProtectedRoute waits before redirecting
  const resolvedLoading     = DEV_MODE ? false : isLoading || isChecking;

  return (
    <PaymentContext.Provider
      value={{
        status: resolvedStatus,
        isSubscribed,
        subscription: resolvedSubscription,
        loading: resolvedLoading,
        isLoading: resolvedLoading,
        subscribe,
        cancel,
        refresh,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}

export const usePaymentContext = usePayment;
