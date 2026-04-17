import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const PaymentContext = createContext(null);
export function PaymentProvider({ children }) {
    const [hasAccess, setHasAccess] = useState(false);
    const [subscriptionTier, setSubscriptionTier] = useState(null);
    return (_jsx(PaymentContext.Provider, { value: {
            hasAccess,
            setHasAccess,
            subscriptionTier,
            setSubscriptionTier,
        }, children: children }));
}
export function usePaymentContext() {
    const ctx = useContext(PaymentContext);
    if (!ctx)
        throw new Error("usePaymentContext must be used inside PaymentProvider");
    return ctx;
}
