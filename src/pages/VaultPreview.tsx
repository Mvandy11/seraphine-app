import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import { useAppContext } from "@/contexts/AppContext";
import { SERAPHINE_DECK } from "@/lib/seraphineOracle";

export default function VaultPreview() {
  const { user } = useAppContext();
  const { isSubscribed } = usePayment();
  const [vaultOpen, setVaultOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const revealed  = SERAPHINE_DECK.slice(0, 1);
  const blurred   = SERAPHINE_DECK.slice(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/art/backgrounds/oracle.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5,3,15,0.78)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "60px 20px 80px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
            ✦ Seraphine's Inner Sanctum ✦
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "16px",
              textShadow: "0 0 40px rgba(167,139,250,0.5)",
              lineHeight: 1.15,
            }}
          >
            The Seraphine Vault
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
            A deck born from emotional physics — each card a mirror of the soul's living forces.
            Serene, fierce, sorrowful, ascended. These cards do not predict the future. They illuminate it.
          </p>
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "28px",
            marginBottom: "56px",
          }}
        >
          {/* Revealed card(s) */}
          {revealed.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(167,139,250,0.4)",
                boxShadow: hoveredId === card.id
                  ? "0 0 40px rgba(167,139,250,0.5), 0 20px 60px rgba(0,0,0,0.6)"
                  : "0 0 20px rgba(167,139,250,0.2), 0 12px 40px rgba(0,0,0,0.5)",
                transform: hoveredId === card.id ? "scale(1.03) translateY(-4px)" : "scale(1)",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                style={{ width: "100%", display: "block", aspectRatio: "3/4", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(5,3,15,0.95), transparent)",
                  padding: "32px 16px 16px",
                }}
              >
                <p style={{ color: "#e9d5ff", fontWeight: 600, fontSize: "0.9rem", margin: 0, textAlign: "center" }}>
                  {card.name}
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", textAlign: "center", marginTop: "4px" }}>
                  {card.emotionalPhysics.charAt(0).toUpperCase() + card.emotionalPhysics.slice(1)} · Oracle
                </p>
              </div>

              {/* "Unlocked" badge */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(167,139,250,0.25)",
                  border: "1px solid rgba(167,139,250,0.5)",
                  borderRadius: "20px",
                  padding: "3px 10px",
                  fontSize: "0.68rem",
                  color: "#c4b5fd",
                  backdropFilter: "blur(8px)",
                }}
              >
                Preview
              </div>
            </div>
          ))}

          {/* Blurred / locked card(s) */}
          {blurred.map((card) => (
            <div
              key={card.id}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  filter: "blur(16px) brightness(0.4)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.background = "rgba(124,58,237,0.15)";
                  (e.target as HTMLImageElement).style.minHeight = "280px";
                }}
              />
              {/* Lock overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(5,3,15,0.45)",
                  gap: "8px",
                }}
              >
                <div style={{ fontSize: "2rem" }}>🔒</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textAlign: "center", padding: "0 16px" }}>
                  Unlock with full access
                </p>
              </div>
            </div>
          ))}

          {/* Phantom blurred "future cards" placeholders */}
          {[1, 2].map((n) => (
            <div
              key={`phantom-${n}`}
              style={{
                position: "relative",
                borderRadius: "16px",
                border: "1px dashed rgba(124,58,237,0.2)",
                aspectRatio: "3/4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(124,58,237,0.04)",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "1.5rem", opacity: 0.3 }}>✦</div>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>Coming Soon</p>
            </div>
          ))}
        </div>

        {/* Vault CTA */}
        {!isSubscribed && (
          <div
            style={{
              textAlign: "center",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(167,139,250,0.25)",
              borderRadius: "24px",
              padding: "40px 32px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(124,58,237,0.15)",
            }}
          >
            {/* Animated glow */}
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 20px",
                background: "radial-gradient(circle, rgba(167,139,250,0.5), rgba(124,58,237,0.2), transparent 70%)",
                borderRadius: "50%",
                filter: "blur(8px)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "white",
                marginBottom: "12px",
                textShadow: "0 0 20px rgba(167,139,250,0.4)",
              }}
            >
              Unlock the Full Seraphine Deck
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "28px", maxWidth: "420px", margin: "0 auto 28px" }}>
              Every card. Every reading. Seraphine's complete oracle — powered by emotional physics
              and shaped by your birthday archetype.
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              {user ? (
                <Link
                  to="/subscribe"
                  style={{
                    padding: "14px 36px",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    borderRadius: "12px",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: "0 0 32px rgba(124,58,237,0.5)",
                    display: "inline-block",
                  }}
                >
                  Subscribe — $9.99 / mo
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      padding: "14px 32px",
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textDecoration: "none",
                      boxShadow: "0 0 32px rgba(124,58,237,0.5)",
                      display: "inline-block",
                    }}
                  >
                    Sign In to Unlock
                  </Link>
                  <Link
                    to="/subscribe"
                    style={{
                      padding: "14px 32px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(167,139,250,0.3)",
                      borderRadius: "12px",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    View Plans
                  </Link>
                </>
              )}
            </div>

            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", marginTop: "20px" }}>
              Cancel anytime · Secure via Stripe
            </p>
          </div>
        )}

        {/* Subscribed state */}
        {isSubscribed && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#4ade80", fontSize: "0.9rem", marginBottom: "20px" }}>
              ✦ Full vault access active
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/oracle"
                style={{
                  padding: "13px 32px",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                }}
              >
                Open Oracle
              </Link>
              <Link
                to="/deck"
                style={{
                  padding: "13px 32px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: "12px",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Full Deck
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
