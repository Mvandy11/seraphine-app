import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const OracleContext = createContext(undefined);
export function OracleProvider({ children }) {
    const [state, setState] = useState({
        question: "",
        answer: null,
        phase: "idle",
        emotion: null,
        revealedCard: null,
        spread: null,
    });
    const setQuestion = (question) => setState((s) => ({ ...s, question }));
    const setAnswer = (answer) => setState((s) => ({ ...s, answer }));
    const setPhase = (phase) => setState((s) => ({ ...s, phase }));
    const setEmotion = (emotion) => setState((s) => ({ ...s, emotion }));
    const setRevealedCard = (revealedCard) => setState((s) => ({ ...s, revealedCard }));
    const setSpread = (spread) => setState((s) => ({ ...s, spread }));
    return (_jsx(OracleContext.Provider, { value: {
            state,
            setQuestion,
            setAnswer,
            setPhase,
            setEmotion,
            setRevealedCard,
            setSpread,
        }, children: children }));
}
export function useOracleContext() {
    const ctx = useContext(OracleContext);
    if (!ctx)
        throw new Error("useOracleContext must be used inside provider");
    return ctx;
}
