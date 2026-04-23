import React, { createContext, useContext, useState, useEffect } from "react";
import {
  startSubscription,
  cancelSubscription,
  getSubscription,
} from "@/services/subscriptionService";

// ─── Dev bypass ──────────────────────────────────────────────────────────────
// Vite sets import.meta.env.DEV = true during `npm run dev` and false in
// production builds, so this is automatically disabled when you deploy.
const DEV_MODE = import.meta.env.DEV;
// ─────────────────────────────────────────────────────────────────────────────

type SubscriptionStatus = "none" | "active" | "canceling";

export interface SubscriptionInfo {
  plan: string;
  current_period_end: number | null;
}

type PaymentContextValue = {
  status: SubscriptionStatus;
  isSubscribed: boolean;
  subscription: SubscriptionInfo | null;
  loading: boolean;
  isLoading: boolean;
  subscribe: (paymentMethodId: string) => Promise<void>;
  cancel: () => Promise<void>;
  refresh: (userId: string) => Promise<void>;
};

const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);

type Props = {
  user?: { id: string; email: string | null } | null;
  children: React.ReactNode;
};

export const PaymentProvider: React.FC<Props> = ({ user = null, children }) => {
  const [status, setStatus] = useState<SubscriptionStatus>("none");
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async (userId: string) => {
    try {
      const res = await getSubscription(userId);
      if (res && res.status === "active") {
        setStatus("active");
        setSubscription({ plan: res.tier ?? "full", current_period_end: null });
      } else {
        setStatus("none");
        setSubscription(null);
      }
    } catch {
      setStatus("none");
      setSubscription(null);
    }
  };

  useEffect(() => {
    if (user?.id) {
      refresh(user.id);
    } else {
      setStatus("none");
      setSubscription(null);
    }
  }, [user?.id]);

  const subscribe = async (paymentMethodId: string) => {
    if (!user || !user.email) return;
    setIsLoading(true);
    try {
      const res = await startSubscription(user.id, paymentMethodId);
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
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await cancelSubscription(user.id);
      if (res.status === "canceled") {
        setStatus("canceling");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isSubscribed = DEV_MODE ? true : status === "active";
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
