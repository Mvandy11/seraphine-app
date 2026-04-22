import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { usePayment } from "@/contexts/PaymentContext";

export default function Account() {
  const { user, loading: authLoading, signOut } = useAppContext();
  const { status, subscription, isSubscribed, loading: payLoading } = usePayment();

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleSignOut = async () => {
    await signOut();
  };

  const statusLabel =
    status === "active"
      ? "Active"
      : status === "canceling"
      ? "Canceling at period end"
      : "No active subscription";

  const statusColor =
    status === "active"
      ? "#4ade80"
      : status === "canceling"
      ? "#fbbf24"
      : "#f87171";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Your Account
        </h1>

        <div style={cardStyle}>
          <p style={labelStyle}>Email</p>
          <p style={valueStyle}>{user.email}</p>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Subscription Status</p>
          <p style={{ ...valueStyle, color: statusColor, fontWeight: 600 }}>
            {payLoading ? "Checking…" : statusLabel}
          </p>
          {subscription && (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "4px" }}>
              Plan: {subscription.plan}
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {isSubscribed ? (
            <Link to="/manage" style={primaryLinkStyle}>
              Manage Subscription
            </Link>
          ) : (
            <Link to="/subscribe" style={primaryLinkStyle}>
              Subscribe Now
            </Link>
          )}

          <Link to="/oracle" style={secondaryLinkStyle}>
            Open Oracle
          </Link>

          <button onClick={handleSignOut} style={dangerButtonStyle}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(124,58,237,0.2)",
  borderRadius: "14px",
  padding: "20px 24px",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "6px",
};

const valueStyle: React.CSSProperties = {
  color: "white",
  fontSize: "1rem",
  margin: 0,
};

const primaryLinkStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  padding: "13px",
  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  borderRadius: "10px",
  color: "white",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "0 0 20px rgba(124,58,237,0.3)",
};

const secondaryLinkStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  padding: "12px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(124,58,237,0.2)",
  borderRadius: "10px",
  color: "white",
  textDecoration: "none",
};

const dangerButtonStyle: React.CSSProperties = {
  padding: "12px",
  background: "rgba(239,68,68,0.1)",
  border: "1px solid rgba(239,68,68,0.3)",
  borderRadius: "10px",
  color: "#f87171",
  fontSize: "0.95rem",
  fontWeight: 500,
  cursor: "pointer",
};
