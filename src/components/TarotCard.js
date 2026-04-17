import { jsx as _jsx } from "react/jsx-runtime";
export function TarotCard({ data }) {
    return (_jsx("div", { className: "tarot-card", children: data?.name ?? "Tarot Card" }));
}
