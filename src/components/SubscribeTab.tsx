// src/components/SubscribeTab.tsx

import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { usePayment } from "../context/PaymentContext";
import { createSetupIntent } from "../services/subscriptionService";

type Props = {
  user: { id: string; email: string | null } | null;
};

const SubscribeTab: React.FC<Props> = ({ user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { status, isLoading, subscribe, cancel } = usePayment();
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    if (!stripe || !elements || !user || !user.email) return;
    setError(null);

    try {
      // 1. Create SetupIntent
      const clientSecret = await createSetupIntent(user.id, user.email);

      // 2. Confirm card setup
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
          },
        },
      });

      if (result.error || !result.setupIntent?.payment_method) {
        throw new Error(result.error?.message || "Failed to confirm card");
      }

      const paymentMethodId = result.setupIntent.payment_method as string;

      // 3. Start subscription
      await subscribe(paymentMethodId);
    } catch (err: any) {
      setError(err.message || "Subscription failed");
    }
  };

  const handleCancel = async () => {
    setError(null);
    try {
      await cancel();
    } catch (err: any) {
      setError(err.message || "Cancel failed");
    }
  };

  if (!user) {
    return <div>Please sign in to manage your membership.</div>;
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Full Access Membership</h2>
      <p>Unlocks all features. Cancel anytime. No refunds for current period.</p>

      {status === "none" && (
        <>
          <div style={{ margin: "16px 0" }}>
            <CardElement />
          </div>
          <button onClick={handleSubscribe} disabled={isLoading || !stripe}>
            {isLoading ? "Processing..." : "Subscribe"}
          </button>
        </>
      )}

      {status === "active" && (
        <>
          <p>Your membership is active.</p>
          <button onClick={handleCancel} disabled={isLoading}>
            {isLoading ? "Processing..." : "Cancel Membership"}
          </button>
        </>
      )}

      {status === "canceling" && (
        <p>
          Your membership will end at the end of the current billing period.
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SubscribeTab;
