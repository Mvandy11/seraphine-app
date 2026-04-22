import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import SeraphinePortrait from "@/components/SeraphinePortrait";

export default function HeroSection() {
  const { user } = useAppContext();

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "url('/art/backgrounds/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        color: "white",
        overflowX: "hidden",
        paddingTop: "40px",
        position: "relative",
      }}
    >
      {/* Dark overlay so text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,3,15,0.55) 0%, rgba(5,3,15,0.3) 50%, rgba(5,3,15,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SeraphinePortrait />

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              marginBottom: "20px",
              letterSpacing: "2px",
              textShadow: "0 0 30px rgba(124,58,237,0.6), 0 0 60px rgba(255,255,255,0.15)",
            }}
          >
            Seraphine Awaits
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              opacity: 0.85,
              marginBottom: "40px",
              lineHeight: "1.7",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            When you are ready, step forward and ask your question.
          </p>

          {user ? (
            <Link
              to="/oracle"
              style={{
                padding: "14px 36px",
                fontSize: "1.15rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                boxShadow: "0 0 30px rgba(124,58,237,0.55)",
              }}
            >
              Enter the Oracle
            </Link>
          ) : (
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                to="/subscribe"
                style={{
                  padding: "14px 32px",
                  fontSize: "1.1rem",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  boxShadow: "0 0 30px rgba(124,58,237,0.55)",
                }}
              >
                Begin Your Journey
              </Link>
              <Link
                to="/login"
                style={{
                  padding: "14px 28px",
                  fontSize: "1.1rem",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
