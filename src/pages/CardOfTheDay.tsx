import { useDailyCard } from "@/hooks/useDailyCard";
import { speak } from "@/utils/speak";
import CardReveal from "@/components/CardReveal";

export default function CardOfTheDay() {
  const daily = useDailyCard();

  if (!daily) return null;

  const { card, emotion, message } = daily;

  const aura =
    emotion === "serene"
      ? "radial-gradient(circle, rgba(124,58,237,0.2), transparent)"
      : emotion === "fierce"
      ? "radial-gradient(circle, rgba(255,0,80,0.25), transparent)"
      : emotion === "sorrow"
      ? "radial-gradient(circle, rgba(0,0,0,0.4), transparent)"
      : "radial-gradient(circle, rgba(255,255,255,0.3), transparent)";

  const bg =
    emotion === "sorrow"
      ? "/art/backgrounds/oracle.jpg"
      : "/art/backgrounds/hero.jpg";

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
      </div>
    </div>
  );
}
