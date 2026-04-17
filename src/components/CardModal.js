import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { speak } from "@/utils/speak";
import CardReveal from "@/components/CardReveal";
export default function CardModal({ card, onClose, }) {
    if (!card)
        return null;
    const meaning = {
        serene: `A gentle current moves beneath your day. ${card.name} brings clarity, renewal, and quiet guidance.`,
        fierce: `${card.name} rises with force. This is a moment of courage, action, and decisive motion.`,
        sorrow: `${card.name} reveals a shadow asking to be acknowledged. Healing begins when you turn toward it.`,
        ascended: `${card.name} opens a threshold. Destiny aligns, and the veil thins around your awakening.`,
    }[card.emotion];
    const aura = card.emotion === "serene"
        ? "rgba(124,58,237,0.3)"
        : card.emotion === "fierce"
            ? "rgba(255,0,80,0.3)"
            : card.emotion === "sorrow"
                ? "rgba(0,0,0,0.5)"
                : "rgba(255,255,255,0.4)";
    return (_jsx("div", { onClick: onClose, style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
        }, children: _jsxs("div", { onClick: (e) => e.stopPropagation(), style: {
                background: "rgba(15,23,42,0.9)",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: `0 0 40px ${aura}`,
                maxWidth: "500px",
                textAlign: "center",
            }, children: [_jsx(CardReveal, { card: card }), _jsx("h2", { style: {
                        color: "white",
                        marginTop: "20px",
                        fontSize: "1.8rem",
                    }, children: card.name }), _jsx("p", { style: {
                        color: "white",
                        opacity: 0.9,
                        marginTop: "10px",
                        fontSize: "1.2rem",
                    }, children: meaning }), _jsx("button", { onClick: () => speak(meaning, card.emotion), style: {
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#7c3aed",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                    }, children: "Hear Seraphine Speak" })] }) }));
}
