import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useOracleContext } from "@/contexts/OracleContext";
import OracleConsole from "@/components/OracleConsole";
import CardOfTheDayPreview from "@/components/CardOfTheDayPreview";
import CardReveal from "@/components/CardReveal";
import SaveReadingButton from "@/components/SaveReadingButton";
import BirthdayInput from "@/components/BirthdayInput";
import { getBirthdayArchetype } from "@/utils/birthdayEngine";
export default function Oracle() {
    const { state } = useOracleContext();
    const emotion = state.emotion;
    const [birthday, setBirthday] = useState(null);
    const portrait = emotion
        ? `/art/seraphine/emotion/${emotion}.png`
        : `/art/seraphine/portrait.png`;
    const bg = emotion === "sorrow"
        ? "/art/backgrounds/oracle.jpg"
        : "/art/backgrounds/hero.jpg";
    const aura = emotion === "serene"
        ? "radial-gradient(circle, rgba(124,58,237,0.2), transparent)"
        : emotion === "fierce"
            ? "radial-gradient(circle, rgba(255,0,80,0.25), transparent)"
            : emotion === "sorrow"
                ? "radial-gradient(circle, rgba(0,0,0,0.4), transparent)"
                : emotion === "ascended"
                    ? "radial-gradient(circle, rgba(255,255,255,0.3), transparent)"
                    : "transparent";
    return (_jsxs("div", { style: {
            position: "relative",
            minHeight: "100vh",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px 20px",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    inset: 0,
                    background: aura,
                    pointerEvents: "none",
                } }), _jsxs("div", { style: {
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                }, children: [_jsx(CardOfTheDayPreview, {}), _jsx("img", { src: portrait, alt: "Seraphine", style: {
                            width: "100%",
                            maxWidth: "420px",
                            filter: "drop-shadow(0 0 25px rgba(124,58,237,0.6))",
                        } }), !birthday ? (_jsx(BirthdayInput, { onSubmit: (month, day) => {
                            const archetype = getBirthdayArchetype(month, day);
                            setBirthday(archetype);
                        } })) : (_jsxs("div", { style: {
                            padding: "16px 24px",
                            background: "rgba(124,58,237,0.15)",
                            border: "1px solid rgba(124,58,237,0.4)",
                            borderRadius: "12px",
                            textAlign: "center",
                            color: "white",
                            maxWidth: "480px",
                        }, children: [_jsxs("p", { style: { margin: 0, fontSize: "0.95rem", opacity: 0.85 }, children: ["\u2726 Life Path ", _jsx("strong", { children: birthday.lifePath }), " \u00A0\u00B7\u00A0", _jsx("strong", { children: birthday.elementalAura }), " \u00A0\u00B7\u00A0", _jsx("strong", { children: birthday.birthArcana })] }), _jsx("button", { onClick: () => setBirthday(null), style: {
                                    marginTop: "8px",
                                    background: "none",
                                    border: "none",
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: "0.8rem",
                                    cursor: "pointer",
                                }, children: "change birthday" })] })), state.spread && (_jsx("div", { style: { display: "flex", gap: "20px" }, children: state.spread.map((card, i) => (_jsx(CardReveal, { card: card }, i))) })), _jsx(OracleConsole, { birthday: birthday }), state.answer && (_jsxs("div", { style: {
                            marginTop: "20px",
                            color: "white",
                            fontSize: "1.4rem",
                            textAlign: "center",
                            maxWidth: "650px",
                            textShadow: "0 0 10px rgba(0,0,0,0.6)",
                        }, children: [_jsx("div", { dangerouslySetInnerHTML: { __html: state.answer } }), state.explanation && (_jsxs("div", { style: {
                                    marginTop: "30px",
                                    padding: "20px",
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: "12px",
                                    boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                                }, children: [_jsx("h3", { style: {
                                            marginBottom: "10px",
                                            fontSize: "1.6rem",
                                            color: "white",
                                            textShadow: "0 0 10px rgba(124,58,237,0.6)",
                                        }, children: "Seraphine's Explanation" }), _jsxs("p", { style: { opacity: 0.9, marginBottom: "10px" }, children: [_jsx("strong", { children: "Why this card appeared:" }), _jsx("br", {}), state.explanation?.why] }), _jsxs("p", { style: { opacity: 0.9, marginBottom: "10px" }, children: [_jsx("strong", { children: "Symbolic meaning:" }), _jsx("br", {}), state.explanation?.symbolism] }), _jsxs("p", { style: { opacity: 0.9, marginBottom: "10px" }, children: [_jsx("strong", { children: "How it relates to your question:" }), _jsx("br", {}), state.explanation?.relation] }), _jsxs("p", { style: { opacity: 0.9, marginBottom: "10px" }, children: [_jsx("strong", { children: "Seraphine's guidance:" }), _jsx("br", {}), state.explanation?.guidance] })] })), _jsx(SaveReadingButton, { type: "oracle", payload: {
                                    question: state.question,
                                    spread: state.spread,
                                    emotion,
                                    message: state.answer,
                                    birthday,
                                } })] }))] })] }));
}
