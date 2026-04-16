import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useApp } from "@/contexts/AppContext";
import { getSubscription, cancelSubscription } from "@/services/subscriptionService";

export type SubscriptionStatus =
  | "none"
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired";

interface PaymentContextValue {
  status: SubscriptionStatus;
  tier: string | null;
  hasAccess: boolean;
  loading: boolean;
  cancelAtPeriodEnd: boolean;
  trialEndsAt: string | null;

  refreshSubscription: () => Promise<void>;
  cancelMembership: () => Promise<void>;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { user } = useApp();

  const [status, setStatus] = useState<SubscriptionStatus>("none");
  const [tier, setTier] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);

  // -----------------------------
  // Load subscription on login
  // -----------------------------
  const refreshSubscription = async () => {
    if (!user) {
      setStatus("none");
      setTier(null);
      setHasAccess(false);
      setCancelAtPeriodEnd(false);
      setTrialEndsAt(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const sub = await getSubscription(user.id);

      if (!sub) {
        setStatus("none");
        setTier(null);
        setHasAccess(false);
        setCancelAtPeriodEnd(false);
        setTrialEndsAt(null);
        return;
      }

      setStatus(sub.status);
      setTier(sub.tier);
      setHasAccess(sub.status === "active" || sub.status === "trialing");
      setCancelAtPeriodEnd(sub.cancel_at_period_end ?? false);
      setTrialEndsAt(sub.trial_ends_at ?? null);
    } catch (err) {
      console.error("Failed to load subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Cancel subscription
  // -----------------------------
  const cancelMembership = async () => {
    if (!user) return;

    try {
      await cancelSubscription(user.id);
      await refreshSubscription();
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
    }
  };

  // -----------------------------
  // Auto-load subscription on login
  // -----------------------------
  useEffect(() => {
    refreshSubscription();
  }, [user]);

  return (
    <PaymentContext.Provider
      value={{
        status,
        tier,
        hasAccess,
        loading,
        cancelAtPeriodEnd,
        trialEndsAt,
        refreshSubscription,
        cancelMembership,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const ctx = useContext(PaymentContext);
  if (!ctx) {
    throw new Error("usePaymentContext must be used inside PaymentProvider");
  }
  return ctx;
}
