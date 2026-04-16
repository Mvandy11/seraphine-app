import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const TierSelectionScreen = () => {
  const navigate = useNavigate();
  const { user, setShowAuthModal } = useApp();

  const [loading, setLoading] = useState(false);

  const handleSubscribe = (tier: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Go directly to the real Stripe subscription flow
    navigate("/subscribe");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose Your Tier
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1 */}
        <div className="border rounded-lg p-6 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Standard</h2>
          <p className="text-gray-600 mb-4">
            Access to the core oracle experience.
          </p>
          <p className="text-3xl font-bold mb-4">$15</p>

          <button
            onClick={() => handleSubscribe("standard")}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "Processing..." : "Start Free Trial"}
          </button>
        </div>

        {/* Tier 2 */}
        <div className="border rounded-lg p-6 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Premium</h2>
          <p className="text-gray-600 mb-4">
            Full cinematic readings + advanced features.
          </p>
          <p className="text-3xl font-bold mb-4">$40</p>

          <button
            onClick={() => handleSubscribe("premium")}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg"
          >
            {loading ? "Processing..." : "Start Free Trial"}
          </button>
        </div>
      </div>

      {!user && (
        <p className="text-center text-gray-500 mt-6">
          You’ll be asked to sign in before subscribing.
        </p>
      )}
    </div>
  );
};

export default TierSelectionScreen;
