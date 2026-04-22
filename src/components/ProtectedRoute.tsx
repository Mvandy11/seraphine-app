import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { usePayment } from "@/contexts/PaymentContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading: authLoading } = useAppContext();
  const { isSubscribed, loading: payLoading } = usePayment();

  if (authLoading || payLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: "1rem",
          letterSpacing: "0.05em",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isSubscribed) return <Navigate to="/subscribe" replace />;

  return <>{children}</>;
}
