import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import { useAppContext } from "@/contexts/AppContext";
import { getDailyVaultPreview, type VaultPreviewResult } from "@/lib/vaultPreviewEngine";

// ─── Phantom locked card slot ─────────────────────────────────

function LockedSlot({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(124,58,237,0.2)",
        aspectRatio: "3/4",
        background: `radial-gradient(ellipse at center, rgba(88,28,135,0.${12 + index * 4}), rgba(5,3,15,0.9))`,
        cursor: "pointer",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 24px rgba(124,58,237,0.3), 0 8px 32px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Blurred background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(45deg, rgba(124,58,237,0.04) 0px, rgba(124,58,237,0.04) 1px, transparent 1px, transparent 12px)",
          pointerEvents: "none",
        }}
      />

      {/* Lock icon + hover text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "16px",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(167,139,250,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            transition: "transform 0.25s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          🔒
        </div>
        <p
          style={{
            color: hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
            fontSize: "0.78rem",
            textAlign: "center",
            lineHeight: 1.5,
            transition: "color 0.25s ease",
          }}
        >
          {hovered ? "Sign in to unlock this card." : "Locked"}
        </p>
      </div>
    </div>
  );
}

// ─── Preview card slot ────────────────────────────────────────

function PreviewCard({
  card,
  floatDelay,
}: {
  card: { id: string; name: string; image: string };
  floatDelay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid rgba(167,139,250,${hovered ? "0.6" : "0.35"})`,
        boxShadow: hovered
          ? "0 0 48px rgba(167,139,250,0.5), 0 24px 64px rgba(0,0,0,0.7)"
          : "0 0 20px rgba(167,139,250,0.2), 0 12px 40px rgba(0,0,0,0.5)",
        transform: hovered ? "scale(1.04) translateY(-6px)" : "scale(1)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        cursor: "default",
        animation: `cardFloat 6s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      {/* Card image */}
      {!imgLoaded && (
        <div
          style={{
            aspectRatio: "3/4",
            background: "radial-gradient(ellipse at center, rgba(88,28,135,0.3), rgba(5,3,15,0.8))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "rgba(167,139,250,0.4)", fontSize: "0.8rem" }}>Loading…</div>
        </div>
      )}
      <img
        src={card.image}
        alt={card.name}
        onLoad={() => setImgLoaded(true)}
        style={{
          width: "100%",
          display: imgLoaded ? "block" : "none",
          aspectRatio: "3/4",
          objectFit: "cover",
        }}
      />

      {/* Bottom gradient + name */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(5,3,15,0.95) 0%, rgba(5,3,15,0.5) 50%, transparent 100%)",
          padding: "40px 16px 16px",
        }}
      >
        <p
          style={{
            color: "#e9d5ff",
            fontWeight: 600,
            fontSize: "0.88rem",
            margin: 0,
            textAlign: "center",
            textShadow: "0 0 12px rgba(167,139,250,0.5)",
          }}
        >
          {card.name}
        </p>
      </div>

      {/* Preview badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(167,139,250,0.2)",
          border: "1px solid rgba(167,139,250,0.45)",
          borderRadius: "20px",
          padding: "3px 10px",
          fontSize: "0.66rem",
          color: "#c4b5fd",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.05em",
        }}
      >
        Preview
      </div>

      {/* Glow pulse on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(167,139,250,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function VaultPreview() {
  const { user }         = useAppContext();
  const { isSubscribed } = usePayment();

  const preview = useMemo<VaultPreviewResult>(() => getDailyVaultPreview(), []);

  // Build the locked phantom slots (fill to 6 total cards)
  const totalSlots   = preview.previewCards.length + preview.lockedCount;
  const phantomCount = Math.max(0, preview.lockedCount);

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
      <div style={{ position: "fixed", inset: 0, background: "rgba(5,3,15,0.80)", zIndex: 0, pointerEvents: "none" }} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "960px",
          margin: "0 auto",
          padding: "64px 20px 88px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p
            style={{
              color: "#a78bfa",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            ✦ Seraphine's Inner Sanctum ✦
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "18px",
              textShadow: "0 0 50px rgba(167,139,250,0.5)",
              lineHeight: 1.12,
            }}
          >
            The Seraphine Vault
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            A living oracle deck shaped by emotional physics. Each card surfaces a different truth.
            Preview rotates daily.
          </p>

          {/* Refresh indicator */}
          <p
            style={{
              color: "rgba(167,139,250,0.4)",
              fontSize: "0.72rem",
              marginTop: "12px",
              letterSpacing: "0.05em",
            }}
          >
            Preview refreshes in {preview.refreshIn} · {preview.totalDeckSize} cards in the full deck
          </p>
        </div>

        {/* ── Card Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(totalSlots, 3)}, 1fr)`,
            gap: "28px",
            marginBottom: "60px",
            maxWidth: "720px",
            margin: "0 auto 60px",
          }}
        >
          {/* Revealed preview cards */}
          {preview.previewCards.map((card, i) => (
            <PreviewCard key={card.id} card={card} floatDelay={i * 1.5} />
          ))}

          {/* Locked phantom slots */}
          {Array.from({ length: phantomCount }, (_, i) => (
            <LockedSlot key={`locked-${i}`} index={i} />
          ))}
        </div>

        {/* ── CTA Block ── */}
        {!isSubscribed && (
          <div
            style={{
              textAlign: "center",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(167,139,250,0.22)",
              borderRadius: "28px",
              padding: "44px 36px",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 80px rgba(124,58,237,0.12), 0 0 1px rgba(167,139,250,0.2)",
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            {/* Glowing orb */}
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 24px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.6) 0%, rgba(124,58,237,0.3) 40%, transparent 70%)",
                filter: "blur(6px)",
                animation: "orbPulse 3.5s ease-in-out infinite",
              }}
            />

            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                color: "white",
                marginBottom: "14px",
                textShadow: "0 0 24px rgba(167,139,250,0.4)",
              }}
            >
              Unlock the Full Seraphine Deck
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.97rem",
                lineHeight: 1.75,
                maxWidth: "420px",
                margin: "0 auto 32px",
              }}
            >
              Sign in to access all {preview.totalDeckSize} cards, daily readings, and
              emotional-physics insights.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {user ? (
                <Link
                  to="/subscribe"
                  style={{
                    padding: "15px 40px",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    borderRadius: "12px",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: "0 0 36px rgba(124,58,237,0.55)",
                    display: "inline-block",
                    letterSpacing: "0.01em",
                  }}
                >
                  Subscribe — $9.99 / mo
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      padding: "15px 36px",
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textDecoration: "none",
                      boxShadow: "0 0 36px rgba(124,58,237,0.55)",
                      display: "inline-block",
                    }}
                  >
                    Sign In to Unlock
                  </Link>
                  <Link
                    to="/subscribe"
                    style={{
                      padding: "15px 32px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(167,139,250,0.28)",
                      borderRadius: "12px",
                      color: "rgba(255,255,255,0.65)",
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

            <p
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: "0.73rem",
                marginTop: "22px",
              }}
            >
              Cancel anytime · Secure payment via Stripe
            </p>
          </div>
        )}

        {/* ── Subscribed view ── */}
        {isSubscribed && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#4ade80", fontSize: "0.88rem", marginBottom: "22px" }}>
              ✦ Full vault access active
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/oracle"
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 28px rgba(124,58,237,0.4)",
                }}
              >
                Open Oracle
              </Link>
              <Link
                to="/deck"
                style={{
                  padding: "14px 32px",
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: "12px",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                Full Deck
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes cardFloat {
          0%,  100% { transform: translateY(0px);  }
          50%        { transform: translateY(-8px); }
        }
        @keyframes orbPulse {
          0%,  100% { opacity: 0.55; transform: scale(1);    }
          50%        { opacity: 1;   transform: scale(1.18); }
        }
      `}</style>
    </div>
  );
}
