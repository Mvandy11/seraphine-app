import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, signIn, signUp } = useApp();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!showAuthModal) return null;

  const handleSubmit = async () => {
    if (mode === "signin") {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    setShowAuthModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white py-2 rounded mb-3"
          onClick={handleSubmit}
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <button
          className="text-sm underline w-full"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : "signin")
          }
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>

        <button
          className="text-sm text-red-500 mt-4 w-full"
          onClick={() => setShowAuthModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
