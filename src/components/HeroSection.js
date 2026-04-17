import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOracleContext } from "@/contexts/OracleContext";
import SeraphinePortrait from "@/components/SeraphinePortrait";
export default function HeroSection() {
    const { setPhase } = useOracleContext();
    return (_jsxs("section", { style: {
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "radial-gradient(circle at top, #0f0a1f, #05030d)",
            color: "white",
            overflowX: "hidden",
            paddingTop: "40px",
        }, children: [_jsx(SeraphinePortrait, {}), _jsxs("div", { style: {
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "20px",
                    maxWidth: "700px",
                }, children: [_jsx("h1", { style: {
                            fontSize: "3rem",
                            fontWeight: 700,
                            marginBottom: "20px",
                            letterSpacing: "2px",
                            textShadow: "0 0 20px rgba(255,255,255,0.3)",
                        }, children: "Seraphine Awaits" }), _jsx("p", { style: {
                            fontSize: "1.4rem",
                            opacity: 0.85,
                            marginBottom: "40px",
                            lineHeight: "1.6",
                        }, children: "When you are ready, step forward and ask your question." }), _jsx("button", { onClick: () => setPhase("drawing"), style: {
                            padding: "14px 32px",
                            fontSize: "1.2rem",
                            borderRadius: "8px",
                            background: "#7c3aed",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                            transition: "0.2s ease",
                        }, children: "Begin Reading" })] })] }));
}
