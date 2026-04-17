import { jsx as _jsx } from "react/jsx-runtime";
// ------------------------------------------------------------
// ⭐ NEW FILE — /src/components/SaveReadingButton.tsx
// ------------------------------------------------------------
import { useState } from "react";
import { addSavedReading } from "@/utils/savedReadings";
export default function SaveReadingButton({ type, payload }) {
    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        addSavedReading({
            type,
            timestamp: now.getTime(),
            date,
            question: payload.question,
            spread: payload.spread ?? null,
            card: payload.card ?? null,
            emotion: payload.emotion ?? null,
            message: payload.message,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };
    return (_jsx("button", { onClick: handleSave, style: {
            padding: "10px 22px",
            background: saved ? "rgba(34,197,94,0.9)" : "#7c3aed",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 0 15px rgba(124,58,237,0.5)",
            marginTop: "10px",
        }, children: saved ? "Saved" : "Save Reading" }));
}
