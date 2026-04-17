import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { usePaymentContext } from "@/contexts/PaymentContext";
export default function ManageSubscription() {
    const { user } = useAppContext();
    const { hasAccess, subscriptionTier, setSubscriptionTier, setHasAccess, } = usePaymentContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const handleCancel = async () => {
        setLoading(true);
        setSuccess("");
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setHasAccess(false);
            setSubscriptionTier(null);
            setSuccess("Your subscription has been canceled.");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleReactivate = async () => {
        setLoading(true);
        setSuccess("");
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setHasAccess(true);
            setSubscriptionTier("premium");
            setSuccess("Your subscription is active again.");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    if (!user) {
        return (_jsxs("div", { className: "manage-subscription", children: [_jsx("h2", { children: "Manage Subscription" }), _jsx("p", { children: "Please sign in to view your subscription." })] }));
    }
    return (_jsxs("div", { className: "manage-subscription", children: [_jsx("h2", { children: "Manage Subscription" }), _jsxs("div", { className: "subscription-status", children: [_jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", hasAccess ? "Active" : "Inactive"] }), _jsxs("p", { children: [_jsx("strong", { children: "Tier:" }), " ", subscriptionTier ? subscriptionTier : "None"] })] }), success && _jsx("p", { className: "success-message", children: success }), loading && _jsx("p", { className: "loading", children: "Processing..." }), !loading && (_jsx("div", { className: "actions", children: hasAccess ? (_jsx("button", { onClick: handleCancel, className: "cancel-btn", children: "Cancel Subscription" })) : (_jsx("button", { onClick: handleReactivate, className: "reactivate-btn", children: "Reactivate Subscription" })) }))] }));
}
