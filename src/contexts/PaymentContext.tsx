import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/contexts/AppContext";
import {
  startSubscription,
  cancelSubscription,
  checkStripeSubscription,
} from "@/services/subscriptionService";

// ─── Dev bypass ───────────────────────────────────────────────
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

// ─── Trial check — reads real trial_end from DB only ──────────
// No overwriting, no upserts, no mismatched durations.

async function checkTrialActive(
  userId: string
): Promise<{ active: boolean; trialEnds: string | null }> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("trial_end")
      .eq("id", userId)
      .single();

    if (error || !data?.trial_end) {
      return { active: false, trialEnds: null };
    }

    const trialEndMs = new Date(data.trial_end).getTime();
    if (Number.isNaN(trialEndMs)) return { active: false, trialEnds: null };

    return {
      active: Date.now() < trialEndMs,
      trialEnds: data.trial_end,
    };
  } catch {
    return { active: false, trialEnds: null };
  }
}

// ─── Provider ─────────────────────────────────────────────────

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();

  const [status, setStatus] = useState<SubscriptionStatus>("none");
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const refresh = async () => {
    if (!user?.id || !user?.email) {
      setStatus("none");
      setSubscription(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    try {
      // 1. Check trial first (fast)
      const trial = await checkTrialActive(user.id);

      if (trial.active) {
        setStatus("trial");
        setSubscription({
          plan: "trial",
          current_period_end: null,
          trialEnds: trial.trialEnds,
        });
        return;
      }

      // 2. Trial expired — check Stripe
      const stripeActive = await checkStripeSubscription(user.id, user.email);

      if (stripeActive) {
        setStatus("active");
        setSubscription({
          plan: "full",
          current_period_end: null,
        });
      } else {
        setStatus("none");
        setSubscription(null);
      }
    } finally {
      setIsChecking(false);
    }
  };

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
      if (res.status === "canceled") {
        setStatus("canceling");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Trial OR paid = subscribed
  const isSubscribed = DEV_MODE ? true : status === "trial" || status === "active";

  const resolvedStatus = DEV_MODE ? ("active" as SubscriptionStatus) : status;
  const resolvedSubscription = DEV_MODE
    ? { plan: "full", current_period_end: null }
    : subscription;

  const resolvedLoading = DEV_MODE ? false : isLoading || isChecking;

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
