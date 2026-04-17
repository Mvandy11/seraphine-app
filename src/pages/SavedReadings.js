import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ------------------------------------------------------------
// ⭐ NEW FILE — /src/pages/SavedReadings.tsx
// ------------------------------------------------------------
import { getSavedReadings } from "@/utils/savedReadings";
export default function SavedReadings() {
    const readings = getSavedReadings();
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            padding: "40px 20px",
            background: "radial-gradient(circle at top, #1e1b4b, #020617)",
            color: "white",
        }, children: [_jsx("h1", { style: {
                    fontSize: "2rem",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "0 0 10px rgba(0,0,0,0.6)",
                }, children: "Saved Readings" }), readings.length === 0 && (_jsx("p", { style: { textAlign: "center", opacity: 0.8 }, children: "No readings saved yet." })), _jsx("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    maxWidth: "800px",
                    margin: "0 auto",
                }, children: readings.map((r) => (_jsxs("div", { style: {
                        padding: "16px",
                        borderRadius: "12px",
                        background: "rgba(15,23,42,0.9)",
                        boxShadow: "0 0 20px rgba(15,23,42,0.8)",
                    }, children: [_jsxs("div", { style: {
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                                fontSize: "0.9rem",
                                opacity: 0.8,
                            }, children: [_jsx("span", { children: r.type === "daily" ? "Card of the Day" : "Oracle Reading" }), _jsx("span", { children: r.date })] }), r.question && (_jsxs("div", { style: {
                                marginBottom: "8px",
                                fontStyle: "italic",
                                opacity: 0.9,
                            }, children: ["\"", r.question, "\""] })), _jsx("div", { style: { marginBottom: "8px" }, children: r.message }), r.card && r.card.name && (_jsxs("div", { style: { fontSize: "0.95rem", opacity: 0.9 }, children: ["Card: ", _jsx("strong", { children: r.card.name })] })), r.spread && r.spread.length > 0 && (_jsxs("div", { style: {
                                marginTop: "6px",
                                fontSize: "0.9rem",
                                opacity: 0.9,
                            }, children: ["Spread:", " ", r.spread.map((c, i) => c.name || c.id || `Card ${i + 1}`).join(", ")] }))] }, r.id))) })] }));
}
