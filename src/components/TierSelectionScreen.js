import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
const TierSelectionScreen = () => {
    const navigate = useNavigate();
    const { user, setShowAuthModal } = useApp();
    const [loading, setLoading] = useState(false);
    const handleSubscribe = (tier) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        // Go directly to the real Stripe subscription flow
        navigate("/subscribe");
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "Choose Your Tier" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "border rounded-lg p-6 shadow bg-white", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Standard" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Access to the core oracle experience." }), _jsx("p", { className: "text-3xl font-bold mb-4", children: "$15" }), _jsx("button", { onClick: () => handleSubscribe("standard"), disabled: loading, className: "w-full bg-black text-white py-2 rounded-lg", children: loading ? "Processing..." : "Start Free Trial" })] }), _jsxs("div", { className: "border rounded-lg p-6 shadow bg-white", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Premium" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Full cinematic readings + advanced features." }), _jsx("p", { className: "text-3xl font-bold mb-4", children: "$40" }), _jsx("button", { onClick: () => handleSubscribe("premium"), disabled: loading, className: "w-full bg-purple-600 text-white py-2 rounded-lg", children: loading ? "Processing..." : "Start Free Trial" })] })] }), !user && (_jsx("p", { className: "text-center text-gray-500 mt-6", children: "You\u2019ll be asked to sign in before subscribing." }))] }));
};
export default TierSelectionScreen;
