import { jsx as _jsx } from "react/jsx-runtime";
// src/components/TypewriterText.tsx
import { useEffect, useState } from "react";
export function TypewriterText({ text, speed = 40 }) {
    const [display, setDisplay] = useState("");
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setDisplay(text.slice(0, i));
            if (i >= text.length)
                clearInterval(id);
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);
    return _jsx("span", { children: display });
}
export default TypewriterText;
