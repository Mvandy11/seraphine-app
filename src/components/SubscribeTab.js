import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/SubscribeTab.tsx
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { usePaymentContext } from "@/contexts/PaymentContext";
import { createSetupIntent, startSubscription, } from "@/services/subscriptionService";
import { useSeraphine } from "@/hooks/useSeraphine";
import SeraphineMessage from "@/components/SeraphineMessage";
const SubscribeTab = ({ user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { speak, artSlots } = useSeraphine('subscribeTab');
    const { status, loading, refreshSubscription, cancelMembership, cancelAtPeriodEnd, } = usePaymentContext();
    const [error, setError] = useState(null);
    const handleSubscribe = async () => {
        if (!stripe || !elements || !user?.email)
            return;
        setError(null);
        try {
            // 1. Create SetupIntent
            const clientSecret = await createSetupIntent(user.id, user.email);
            // 2. Confirm card setup
            const cardElement = elements.getElement(CardElement);
            if (!cardElement)
                throw new Error("Card element not found");
            const result = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { email: user.email },
                },
            });
            if (result.error || !result.setupIntent?.payment_method) {
                throw new Error(result.error?.message || "Failed to confirm card");
            }
            const paymentMethodId = result.setupIntent.payment_method;
            // 3. Start subscription via Edge Function
            await startSubscription(user.id, paymentMethodId);
            // 4. Refresh UI
            await refreshSubscription();
        }
        catch (err) {
            setError(err.message || "Subscription failed");
        }
    };
    const handleCancel = async () => {
        setError(null);
        try {
            await cancelMembership();
            await refreshSubscription();
        }
        catch (err) {
            setError(err.message || "Cancel failed");
        }
    };
    if (!user) {
        return _jsx("div", { children: "Please sign in to manage your membership." });
    }
    return (_jsxs("div", { style: { maxWidth: 420 }, children: [_jsx(SeraphineMessage, { line: speak('greeting'), style: { marginBottom: '0.5rem' } }), _jsx(SeraphineMessage, { line: speak('active'), style: { marginBottom: '1.5rem' } }), _jsx("h2", { children: "Full Access Membership" }), _jsx("p", { children: "Unlocks all features. Cancel anytime." }), status === "none" && (_jsxs(_Fragment, { children: [_jsx("div", { style: { margin: "16px 0" }, children: _jsx(CardElement, {}) }), _jsx("button", { onClick: handleSubscribe, disabled: loading || !stripe, children: loading ? "Processing..." : "Subscribe" })] })), status === "active" && !cancelAtPeriodEnd && (_jsxs(_Fragment, { children: [_jsx("p", { children: "Your membership is active." }), _jsx("button", { onClick: handleCancel, disabled: loading, children: loading ? "Processing..." : "Cancel Membership" })] })), cancelAtPeriodEnd && (_jsx("p", { children: "Your membership will end at the end of the current billing period." })), error && _jsx("p", { style: { color: "red" }, children: error })] }));
};
export default SubscribeTab;
