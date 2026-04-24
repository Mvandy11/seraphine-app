import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  startSubscription,
  cancelSubscription,
  checkStripeSubscription,
} from "@/services/subscriptionService";

// ─── Dev bypass ───────────────────────────────────────────────
// Vite sets import.meta.env.DEV = true in `npm run dev` and false in builds.
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
  refresh: (userId: string, email: string) => Promise<void>;
};

const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);

type Props = {
  user?: { id: string; email: string | null } | null;
  children: React.ReactNode;
};

// ─── Trial check — queries profiles.trial_end directly ────────
// If the row doesn't exist yet (user signed up before the trigger),
// we upsert it now with a fresh 7-day trial.

async function checkTrialActive(
  userId: string
): Promise<{ active: boolean; trialEnds: string | null }> {
  try {
    let { data, error } = await supabase
      .from("profiles")
      .select("trial_end")
      .eq("id", userId)
      .single();

    // No row yet — create one with a 7-day trial starting now
    if (error?.code === "PGRST116" || !data) {
      const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: upserted } = await supabase
        .from("profiles")
        .upsert({ id: userId, trial_start: new Date().toISOString(), trial_end: trialEnd })
        .select("trial_end")
        .single();
      data = upserted;
    }

    if (!data?.trial_end) return { active: false, trialEnds: null };

    const trialEnd = new Date(data.trial_end).getTime();
    if (Number.isNaN(trialEnd)) return { active: false, trialEnds: null };

    const active = Date.now() < trialEnd;
    return { active, trialEnds: data.trial_end };
  } catch {
    return { active: false, trialEnds: null };
  }
}

// ─── Provider ─────────────────────────────────────────────────

export const PaymentProvider: React.FC<Props> = ({ user = null, children }) => {
  const [status, setStatus]           = useState<SubscriptionStatus>("none");
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading]     = useState(false);

  const refresh = async (userId: string, email: string) => {
    // 1. Check trial period first (fast, no Stripe call)
    const trial = await checkTrialActive(userId);

    if (trial.active) {
      setStatus("trial");
      setSubscription({ plan: "trial", current_period_end: null, trialEnds: trial.trialEnds });
      return;
    }

    // 2. Trial expired — check Stripe for paid subscription
    const stripeActive = await checkStripeSubscription(userId, email);

    if (stripeActive) {
      setStatus("active");
      setSubscription({ plan: "full", current_period_end: null });
    } else {
      setStatus("none");
      setSubscription(null);
    }
  };

  useEffect(() => {
    if (user?.id && user?.email) {
      refresh(user.id, user.email);
    } else {
      setStatus("none");
      setSubscription(null);
    }
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
      if (res.status === "canceled") {
        setStatus("canceling");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // isSubscribed = true during trial OR active paid plan
  const isSubscribed = DEV_MODE
    ? true
    : status === "trial" || status === "active";

  const resolvedStatus: SubscriptionStatus = DEV_MODE ? "active" : status;
  const resolvedSubscription: SubscriptionInfo | null = DEV_MODE
    ? { plan: "full", current_period_end: null }
    : subscription;

  return (
    <PaymentContext.Provider
      value={{
        status: resolvedStatus,
        isSubscribed,
        subscription: resolvedSubscription,
        loading: isLoading,
        isLoading,
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
