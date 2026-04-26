import { useDailyCard } from "@/hooks/useDailyCard";
import { useDeckContext } from "@/contexts/DeckContext";
import { speak } from "@/utils/speak";
import CardReveal from "@/components/CardReveal";
import SaveReadingButton from "@/components/SaveReadingButton";
import DeckSelector from "@/components/DeckSelector";
import { POOL_OPTIONS } from "@/data/deckIndex";

export default function CardOfTheDay() {
  const { selectedDeck, setSelectedDeck } = useDeckContext();
  const daily = useDailyCard(selectedDeck);

  if (!daily) return null;

  const { card, emotion, message } = daily;

  const aura =
    emotion === "serene"   ? "radial-gradient(circle, rgba(124,58,237,0.2), transparent)"  :
    emotion === "fierce"   ? "radial-gradient(circle, rgba(255,0,80,0.25), transparent)"   :
    emotion === "sorrow"   ? "radial-gradient(circle, rgba(0,0,0,0.4), transparent)"       :
                             "radial-gradient(circle, rgba(255,255,255,0.3), transparent)";

  const bg = emotion === "sorrow" ? "/art/backgrounds/oracle.jpg" : "/art/backgrounds/hero.jpg";

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: aura,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <img
          src={`/art/seraphine/emotion/${emotion}.png`}
          alt="Seraphine"
          style={{
            width: "100%",
            maxWidth: "420px",
            filter: "drop-shadow(0 0 25px rgba(124,58,237,0.6))",
          }}
        />

        {/* ── Deck selector ─────────────────────────────────── */}
        <div style={{ width: "100%", maxWidth: "720px" }}>
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Choose your deck
          </p>
          <DeckSelector
            active={selectedDeck}
            onChange={(id) => setSelectedDeck(id as typeof selectedDeck)}
            options={POOL_OPTIONS}
          />
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.75rem",
              marginTop: "6px",
            }}
          >
            Today's card is locked. Deck selection takes effect tomorrow.
          </p>
        </div>

        <CardReveal card={card} />

        <div
          style={{
            color: "white",
            fontSize: "1.4rem",
            textAlign: "center",
            maxWidth: "600px",
            textShadow: "0 0 10px rgba(0,0,0,0.6)",
          }}
        >
          {message}
        </div>

        <button
          onClick={() => speak(message, emotion)}
          style={{
            padding: "12px 28px",
            background: "#7c3aed",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
          }}
        >
          Hear Seraphine Speak
        </button>

        <SaveReadingButton
          type="daily"
          payload={{ card, emotion, message }}
        />
      </div>
    </div>
  );
}
