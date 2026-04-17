import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOracleContext } from "@/contexts/OracleContext";
export default function ReadingViewport() {
    const { state } = useOracleContext();
    if (state.phase === "idle") {
        return _jsx("div", { className: "reading-viewport empty", children: "Ask your question above." });
    }
    if (state.phase === "drawing") {
        return _jsx("div", { className: "reading-viewport loading", children: "Drawing your card..." });
    }
    if (state.phase === "revealing") {
        return _jsx("div", { className: "reading-viewport revealing", children: "Revealing your fate..." });
    }
    if (state.phase === "complete") {
        return (_jsxs("div", { className: "reading-viewport result", children: [_jsx("h2", { children: "Your Reading" }), _jsx("p", { children: state.answer })] }));
    }
    return null;
}
