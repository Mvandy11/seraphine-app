import { useOracleContext } from "@/contexts/OracleContext";

export default function Controls() {
  const { state, setPhase } = useOracleContext();

  const handleDraw = () => {
    setPhase("drawing");
    setTimeout(() => setPhase("complete"), 1200);
  };

  const handleReset = () => {
    setPhase("idle");
  };

  return (
    <div className="controls">
      {state.phase === "idle" && (
        <button onClick={handleDraw}>Draw Card</button>
      )}

      {state.phase === "complete" && (
        <button onClick={handleReset}>Ask Again</button>
      )}
    </div>
  );
}
