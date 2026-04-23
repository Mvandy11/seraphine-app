import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

export default function Login() {
  const { signIn, signUp, user } = useAppContext();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    navigate("/account", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate("/account", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/art/backgrounds/oracle.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5,3,15,0.72)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: "20px",
          padding: "44px 36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(124,58,237,0.15), 0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontSize: "1.9rem",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: "8px",
            textShadow: "0 0 20px rgba(124,58,237,0.5)",
          }}
        >
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            fontSize: "0.9rem",
            marginBottom: "32px",
          }}
        >
          {mode === "signin"
            ? "Sign in to access your readings"
            : "Join Seraphine and begin your journey"}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.85rem", margin: 0 }}>{error}</p>
          )}

          <button type="submit" disabled={busy} style={buttonStyle}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
          }}
          style={{
            marginTop: "18px",
            width: "100%",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.85rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link
            to="/"
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.78rem",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "10px",
  color: "white",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "4px",
  boxShadow: "0 0 24px rgba(124,58,237,0.4)",
};
