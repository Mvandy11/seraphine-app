import { useOracleContext } from "@/contexts/OracleContext";

export default function ReadingViewport() {
  const { state } = useOracleContext();

  if (state.phase === "idle") {
    return <div className="reading-viewport empty">Ask your question above.</div>;
  }

  if (state.phase === "drawing") {
    return <div className="reading-viewport loading">Drawing your card...</div>;
  }

  if (state.phase === "complete") {
    return (
      <div className="reading-viewport result">
        <h2>Your Reading</h2>
        <p>{state.answer}</p>
      </div>
    );
  }

  return null;
}
