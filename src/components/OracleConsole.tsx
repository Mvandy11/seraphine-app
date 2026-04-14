import { useOracleContext } from "@/contexts/OracleContext";
import { drawCard } from "@/utils/drawCard";
import { cardEmotions } from "@/data/emotions";

export default function OracleConsole() {
  const { state, setQuestion, setAnswer, setPhase, setEmotion } =
    useOracleContext();

  const handleAsk = async () => {
    if (!state.question.trim()) return;

    setPhase("drawing");

    setTimeout(() => {
      const card = drawCard("major");
      const emotion = cardEmotions[card.id];

      setEmotion(emotion);

      const message = `Seraphine reveals **${card.name}**.`;
      setAnswer(message);
      setPhase("complete");
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
