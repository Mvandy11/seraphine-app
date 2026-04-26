import { DeckCard } from "@/data/deckIndex";
import { speak } from "@/utils/speak";
import CardReveal from "@/components/CardReveal";

export default function CardModal({
  card,
  onClose,
}: {
  card: DeckCard | null;
  onClose: () => void;
}) {
  if (!card) return null;

  const meaning = {
    serene:   `A gentle current moves beneath your day. ${card.name} brings clarity, renewal, and quiet guidance.`,
    fierce:   `${card.name} rises with force. This is a moment of courage, action, and decisive motion.`,
    sorrow:   `${card.name} reveals a shadow asking to be acknowledged. Healing begins when you turn toward it.`,
    ascended: `${card.name} opens a threshold. Destiny aligns, and the veil thins around your awakening.`,
  }[card.emotion];

  const aura =
    card.emotion === "serene"   ? "rgba(124,58,237,0.3)"  :
    card.emotion === "fierce"   ? "rgba(255,0,80,0.3)"    :
    card.emotion === "sorrow"   ? "rgba(0,0,0,0.5)"       :
                                  "rgba(255,255,255,0.4)";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,23,42,0.95)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: `0 0 40px ${aura}`,
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <CardReveal card={card} />

        <h2 style={{ color: "white", marginTop: "20px", fontSize: "1.8rem" }}>
          {card.name}
        </h2>

        <p style={{ color: "white", opacity: 0.9, marginTop: "10px", fontSize: "1.2rem" }}>
          {meaning}
        </p>

        {/* Upright / Reversed keyword rows — shown when the card has keyword data */}
        {(card.upright || card.reversed) && (
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              textAlign: "left",
            }}
          >
            {card.upright && (
              <div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "rgba(124,58,237,0.8)",
                    textTransform: "uppercase",
                  }}
                >
                  Upright
                </span>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", margin: "4px 0 0" }}>
                  {card.upright}
                </p>
              </div>
            )}
            {card.reversed && (
              <div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "rgba(180,100,100,0.8)",
                    textTransform: "uppercase",
                  }}
                >
                  Reversed
                </span>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", margin: "4px 0 0" }}>
                  {card.reversed}
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => speak(meaning, card.emotion)}
          style={{
            marginTop: "22px",
            padding: "10px 20px",
            background: "#7c3aed",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Hear Seraphine Speak
        </button>
      </div>
    </div>
  );
}
