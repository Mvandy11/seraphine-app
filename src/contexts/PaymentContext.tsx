import { createContext, useContext, useState } from "react";

interface PaymentContextValue {
  hasAccess: boolean;
  setHasAccess: (v: boolean) => void;
  subscriptionTier: string | null;
  setSubscriptionTier: (tier: string | null) => void;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  return (
    <PaymentContext.Provider
      value={{
        hasAccess,
        setHasAccess,
        subscriptionTier,
        setSubscriptionTier,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePaymentContext must be used inside PaymentProvider");
  return ctx;
}


