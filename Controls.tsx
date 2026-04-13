import { useOracleContext } from "@/contexts/OracleContext";

export default function Controls() {
  const { state, setPhase, reset } = useOracleContext();

  const handleDraw = () => {
    setPhase("drawing");
    setTimeout(() => setPhase("revealing"), 1200);
  };

  const handleReset = () => {
    reset();
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


