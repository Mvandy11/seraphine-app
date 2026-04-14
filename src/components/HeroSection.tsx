import React from "react";
import { useOracleContext } from "@/contexts/OracleContext";
import SeraphinePortrait from "@/components/SeraphinePortrait";

export default function HeroSection() {
  const { setPhase } = useOracleContext();

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0f0a1f, #05030d)",
        color: "white",
        overflowX: "hidden",
        paddingTop: "40px",
      }}
    >
      {/* Cinematic Seraphine Portrait */}
      <SeraphinePortrait />

      {/* Intro Text */}
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
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          Seraphine Awaits
        </h1>

        <p
          style={{
            fontSize: "1.4rem",
            opacity: 0.85,
            marginBottom: "40px",
            lineHeight: "1.6",
          }}
        >
          When you are ready, step forward and ask your question.
        </p>

        <button
          onClick={() => setPhase("drawing")}
          style={{
            padding: "14px 32px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            background: "#7c3aed",
            border: "none",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
            transition: "0.2s ease",
          }}
        >
          Begin Reading
        </button>
      </div>
    </section>
  );
}
