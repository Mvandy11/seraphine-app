import { useOracleContext } from "@/contexts/OracleContext";
import { drawSpread } from "@/utils/drawSpread";
import { getPool, PoolId } from "@/data/deckIndex";
import { speak } from "@/utils/speak";
import { BirthdayArchetype, buildBirthdayPromptContext } from "@/utils/birthdayEngine";

interface OracleConsoleProps {
  birthday?: BirthdayArchetype | null;
  deckId?: PoolId;
}

export default function OracleConsole({ birthday, deckId = "major1" }: OracleConsoleProps) {
  const {
    state,
    setQuestion,
    setAnswer,
    setPhase,
    setEmotion,
    setRevealedCard,
    setSpread,
  } = useOracleContext();

  const handleAsk = async () => {
    if (!state.question.trim()) return;

    setPhase("drawing");
    setRevealedCard(null);
    setSpread(null);

    setTimeout(() => {
      const pool     = getPool(deckId);
      const spread   = drawSpread("three", pool);
      const mainCard = spread[1];

      // Use the card's own emotion — works for Major, Minor, Oracle, and Seraphine cards
      const emotion = mainCard.emotion ?? "serene";

      setEmotion(emotion);
      setSpread(spread);

      const birthdayContext = buildBirthdayPromptContext(birthday ?? null);

      let message = `Seraphine reveals a three‑card spread. The central force is **${mainCard.name}**`;

      // Include suit name for Minor Arcana cards
      if (mainCard.suit) {
        message += ` of ${mainCard.suit.charAt(0).toUpperCase() + mainCard.suit.slice(1)}`;
      }

      message += ".";

      if (mainCard.isReversed) {
        message += " The card appears reversed — its energy turns inward.";
      }

      if (birthdayContext) {
        message += ` Seen through the lens of your Life Path ${birthday!.lifePath} and the aura of ${birthday!.elementalAura}, this card speaks directly to your soul's current chapter.`;
      }

      setAnswer(message);
      setPhase("complete");

      speak(message, emotion);
    }, 1500);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <textarea
        placeholder="Ask your question..."
        value={state.question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          minHeight: "140px",
          padding: "16px",
          borderRadius: "12px",
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          fontSize: "1.2rem",
          lineHeight: "1.6",
          resize: "none",
          outline: "none",
          boxShadow: "0 0 20px rgba(124,58,237,0.3)",
        }}
      />

      <button
        onClick={handleAsk}
        disabled={!state.question.trim()}
        style={{
          padding: "14px 32px",
          fontSize: "1.2rem",
          borderRadius: "8px",
          background: state.question.trim()
            ? "#7c3aed"
            : "rgba(124,58,237,0.3)",
          border: "none",
          color: "white",
          cursor: state.question.trim() ? "pointer" : "not-allowed",
          boxShadow: state.question.trim()
            ? "0 0 20px rgba(124,58,237,0.5)"
            : "none",
          transition: "0.2s ease",
        }}
      >
        Ask the Oracle
      </button>
    </div>
  );
}
