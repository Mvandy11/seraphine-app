import { createContext, useContext, useState } from "react";

interface OracleExplanation {
  why: string;
  symbolism: string;
  relation: string;
  guidance: string;
}

interface OracleState {
  question: string;
  answer: string | null;
  phase: "idle" | "drawing" | "complete";
  emotion: "serene" | "fierce" | "sorrow" | "ascended" | null;
  revealedCard: { id: string; name: string; image: string } | null;
  spread: any[] | null;
  explanation: OracleExplanation | null;
}

interface OracleContextValue {
  state: OracleState;
  setQuestion: (q: string) => void;
  setAnswer: (a: string | null) => void;
  setPhase: (p: OracleState["phase"]) => void;
  setEmotion: (e: OracleState["emotion"]) => void;
  setRevealedCard: (c: OracleState["revealedCard"]) => void;
  setSpread: (s: any[] | null) => void;
  setExplanation: (e: OracleExplanation | null) => void;
}

const OracleContext = createContext<OracleContextValue | undefined>(undefined);

export function OracleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OracleState>({
    question: "",
    answer: null,
    phase: "idle",
    emotion: null,
    revealedCard: null,
    spread: null,
    explanation: null,
  });

  const setQuestion = (question: string) =>
    setState((s) => ({ ...s, question }));

  const setAnswer = (answer: string | null) =>
    setState((s) => ({ ...s, answer }));

  const setPhase = (phase: OracleState["phase"]) =>
    setState((s) => ({ ...s, phase }));

  const setEmotion = (emotion: OracleState["emotion"]) =>
    setState((s) => ({ ...s, emotion }));

  const setRevealedCard = (revealedCard: OracleState["revealedCard"]) =>
    setState((s) => ({ ...s, revealedCard }));

  const setSpread = (spread: any[] | null) =>
    setState((s) => ({ ...s, spread }));

  const setExplanation = (explanation: OracleExplanation | null) =>
    setState((s) => ({ ...s, explanation }));

  return (
    <OracleContext.Provider
      value={{
        state,
        setQuestion,
        setAnswer,
        setPhase,
        setEmotion,
        setRevealedCard,
        setSpread,
        setExplanation,
      }}
    >
      {children}
    </OracleContext.Provider>
  );
}

export function useOracleContext() {
  const ctx = useContext(OracleContext);
  if (!ctx) throw new Error("useOracleContext must be used inside provider");
  return ctx;
}
