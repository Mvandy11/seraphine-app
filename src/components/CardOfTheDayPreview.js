import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDailyCard } from "@/hooks/useDailyCard";
import { useNavigate } from "react-router-dom";
import CardReveal from "@/components/CardReveal";
export default function CardOfTheDayPreview() {
    const daily = useDailyCard();
    const navigate = useNavigate();
    if (!daily)
        return null;
    return (_jsxs("div", { style: {
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            background: "rgba(0,0,0,0.35)",
            borderRadius: "16px",
            boxShadow: "0 0 25px rgba(124,58,237,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
        }, children: [_jsx("h2", { style: {
                    color: "white",
                    fontSize: "1.6rem",
                    margin: 0,
                    textShadow: "0 0 10px rgba(0,0,0,0.6)",
                }, children: "Today's Card" }), _jsx("div", { style: { transform: "scale(0.8)" }, children: _jsx(CardReveal, { card: daily.card }) }), _jsx("button", { onClick: () => navigate("/card-of-the-day"), style: {
                    padding: "10px 20px",
                    background: "#7c3aed",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 0 15px rgba(124,58,237,0.5)",
                }, children: "View Full Reading" }), _jsx("button", { onClick: () => navigate("/deck"), style: {
                    padding: "8px 16px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    marginTop: "6px",
                }, children: "Explore the Deck Vault" })] }));
}
