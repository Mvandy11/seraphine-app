// src/context/PaymentContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  startSubscription,
  cancelSubscription,
} from "../services/subscriptionService";

type SubscriptionStatus = "none" | "active" | "canceling";

type PaymentContextValue = {
  status: SubscriptionStatus;
  isLoading: boolean;
  subscribe: (paymentMethodId: string) => Promise<void>;
  cancel: () => Promise<void>;
};

const PaymentContext = createContext<PaymentContextValue | undefined>(undefined);

type Props = {
  user: { id: string; email: string | null } | null;
  children: React.ReactNode;
};

export const PaymentProvider: React.FC<Props> = ({ user, children }) => {
  const [status, setStatus] = useState<SubscriptionStatus>("none");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Optionally fetch subscription status from Supabase on mount
  useEffect(() => {
    // Example placeholder:
    // fetchSubscriptionStatus(user?.id).then(setStatus);
  }, [user?.id]);

  const subscribe = async (paymentMethodId: string) => {
    if (!user || !user.email) return;
    setIsLoading(true);
    try {
      const res = await startSubscription(user.id, user.email, paymentMethodId);
      if (res.status === "active") {
        setStatus("active");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = async () => {
    if (!user || !user.email) return;
    setIsLoading(true);
    try {
      const res = await cancelSubscription(user.id, user.email);
      if (res.status === "canceled") {
        setStatus("canceling"); // active until period end
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ status, isLoading, subscribe, cancel }}>
      {children}
    </PaymentContext.Provider>
  );
};

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}
