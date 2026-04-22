import React, { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "@/contexts/AppContext";
import { usePayment } from "@/contexts/PaymentContext";
import SubscribeTab from "@/components/SubscribeTab";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const elementsOptions = {
  appearance: {
    theme: "night" as const,
    variables: {
      colorPrimary: "#7c3aed",
      colorBackground: "#0f0a1f",
      colorText: "#ffffff",
      colorDanger: "#f87171",
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: "10px",
    },
  },
};

export default function Subscribe() {
  const { user, loading: authLoading } = useAppContext();
  const { isSubscribed, loading: payLoading } = usePayment();

  if (authLoading || payLoading) return null;

  if (isSubscribed) {
    return <Navigate to="/account" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "white",
              marginBottom: "12px",
              textShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            Unlock Full Access
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.6 }}>
            Unlimited oracle readings, tarot spreads, daily cards, and saved readings — all guided by Seraphine.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <p style={{ color: "white", fontWeight: 600, fontSize: "1.1rem", margin: 0 }}>
                Full Access
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: "4px 0 0" }}>
                Cancel anytime
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "1.6rem" }}>$9.99</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}> / mo</span>
            </div>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "Unlimited oracle & tarot readings",
              "Daily card with Seraphine's guidance",
              "Full Deck Vault access",
              "Saved reading history",
              "Birthday archetype readings",
            ].map((f) => (
              <li key={f} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.92rem", display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ color: "#a78bfa" }}>✦</span> {f}
              </li>
            ))}
          </ul>

          {user ? (
            <Elements stripe={stripePromise} options={elementsOptions}>
              <SubscribeTab user={{ id: user.id, email: user.email ?? null }} />
            </Elements>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "16px", fontSize: "0.9rem" }}>
                Sign in or create an account to subscribe.
              </p>
              <Link
                to="/login"
                style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                }}
              >
                Sign In to Subscribe
              </Link>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          Secure payment via Stripe · Cancel anytime from your account
        </p>
      </div>
    </div>
  );
}
