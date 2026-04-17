import { jsx as _jsx } from "react/jsx-runtime";
// src/context/PaymentContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { startSubscription, cancelSubscription, } from "../services/subscriptionService";
const PaymentContext = createContext(undefined);
export const PaymentProvider = ({ user, children }) => {
    const [status, setStatus] = useState("none");
    const [subscription, setSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // TODO: Fetch real subscription status from Supabase on mount
    useEffect(() => {
        // Example:
        // fetchSubscriptionStatus(user?.id).then(({ status, subscription }) => {
        //   setStatus(status);
        //   setSubscription(subscription);
        // });
    }, [user?.id]);
    const subscribe = async (paymentMethodId) => {
        if (!user || !user.email)
            return;
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
        }
        finally {
            setIsLoading(false);
        }
    };
    const cancel = async () => {
        if (!user || !user.email)
            return;
        setIsLoading(true);
        try {
            const res = await cancelSubscription(user.id, user.email);
            if (res.status === "canceled") {
                setStatus("canceling");
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    const isSubscribed = status === "active";
    return (_jsx(PaymentContext.Provider, { value: {
            status,
            isSubscribed,
            subscription,
            loading: isLoading,
            isLoading,
            subscribe,
            cancel,
        }, children: children }));
};
export function usePayment() {
    const ctx = useContext(PaymentContext);
    if (!ctx)
        throw new Error("usePayment must be used within PaymentProvider");
    return ctx;
}
