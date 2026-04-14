import { createContext, useContext, useState } from "react";

type OraclePhase = "idle" | "drawing" | "revealing" | "complete";

interface OracleState {
  phase: OraclePhase;
  question: string;
  answer: string;
}

interface OracleContextValue {
  state: OracleState;
  setPhase: (phase: OraclePhase) => void;
  setQuestion: (q: string) => void;
  setAnswer: (a: string) => void;
  reset: () => void;
}

const OracleContext = createContext<OracleContextValue | null>(null);

export function OracleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OracleState>({
    phase: "idle",
    question: "",
    answer: "",
  });

  const setPhase = (phase: OraclePhase) =>
    setState((prev) => ({ ...prev, phase }));

  const setQuestion = (question: string) =>
    setState((prev) => ({ ...prev, question }));

  const setAnswer = (answer: string) =>
    setState((prev) => ({ ...prev, answer }));

  const reset = () =>
    setState({
      phase: "idle",
      question: "",
      answer: "",
    });

  return (
    <OracleContext.Provider
      value={{ state, setPhase, setQuestion, setAnswer, reset }}
    >
      {children}
    </OracleContext.Provider>
  );
}

export function useOracleContext() {
  const ctx = useContext(OracleContext);
  if (!ctx) throw new Error("useOracleContext must be used inside OracleProvider");
  return ctx;
}

