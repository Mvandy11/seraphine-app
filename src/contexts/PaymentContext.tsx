// src/contexts/PaymentContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  startSubscription,
  cancelSubscription,
} from "@/services/subscriptionService";

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

  useEffect(() => {
    // fetchSubscriptionStatus(user?.id) goes here when ready
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
    if (!user || !user.email) return;
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

  const isSubscribed = status === "active";

  return (
    <PaymentContext.Provider
      value={{
        status,
        isSubscribed,
        subscription,
        loading: isLoading,
        isLoading,
        subscribe,
        cancel,
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
