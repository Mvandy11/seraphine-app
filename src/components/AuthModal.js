import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useApp } from "../contexts/AppContext";
const AuthModal = () => {
    const { showAuthModal, setShowAuthModal, signIn, signUp } = useApp();
    const [mode, setMode] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    if (!showAuthModal)
        return null;
    const handleSubmit = async () => {
        if (mode === "signin") {
            await signIn(email, password);
        }
        else {
            await signUp(email, password);
        }
        setShowAuthModal(false);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg w-80 shadow-xl", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: mode === "signin" ? "Sign In" : "Create Account" }), _jsx("input", { type: "email", placeholder: "Email", className: "w-full p-2 border rounded mb-3", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", placeholder: "Password", className: "w-full p-2 border rounded mb-4", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { className: "w-full bg-black text-white py-2 rounded mb-3", onClick: handleSubmit, children: mode === "signin" ? "Sign In" : "Sign Up" }), _jsx("button", { className: "text-sm underline w-full", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), children: mode === "signin"
                        ? "Need an account? Sign up"
                        : "Already have an account? Sign in" }), _jsx("button", { className: "text-sm text-red-500 mt-4 w-full", onClick: () => setShowAuthModal(false), children: "Close" })] }) }));
};
export default AuthModal;
