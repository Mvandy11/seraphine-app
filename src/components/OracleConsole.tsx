import { useOracleContext } from "@/contexts/OracleContext";

export default function OracleConsole() {
  const { state, setQuestion, setAnswer, setPhase } = useOracleContext();

  const handleAsk = async () => {
    if (!state.question.trim()) return;

    setPhase("drawing");

    // Simulate async oracle response
    setTimeout(() => {
      setAnswer("The threads of fate are shifting...");
      setPhase("complete");
    }, 1500);
  };

  return (
    <div className="oracle-console">
      <textarea
        placeholder="Ask your question..."
        value={state.question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk} disabled={!state.question}>
        Ask the Oracle
      </button>
    </div>
  );
}


