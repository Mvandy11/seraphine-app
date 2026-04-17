import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "controls", children: [state.phase === "idle" && (_jsx("button", { onClick: handleDraw, children: "Draw Card" })), state.phase === "complete" && (_jsx("button", { onClick: handleReset, children: "Ask Again" }))] }));
}
