import { jsx as _jsx } from "react/jsx-runtime";
// src/components/SeraphineResponse.tsx
import { TypewriterText } from "./TypewriterText";
export function SeraphineResponse({ text }) {
    return (_jsx("div", { className: "seraphine-response", children: _jsx(TypewriterText, { text: text, speed: 40 }) }));
}
export default SeraphineResponse;
