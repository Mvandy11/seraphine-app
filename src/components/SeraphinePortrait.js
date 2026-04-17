import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import "./SeraphinePortrait.css";
const seraphineImg = "/placeholder.svg";
export default function SeraphinePortrait() {
    const containerRef = useRef(null);
    useEffect(() => {
        const handleParallax = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            if (containerRef.current) {
                containerRef.current.style.transform = `
          translate(${x * 8}px, ${y * 8}px)
          scale(1.02)
        `;
            }
        };
        window.addEventListener("mousemove", handleParallax);
        return () => window.removeEventListener("mousemove", handleParallax);
    }, []);
    return (_jsx("div", { className: "seraphine-portrait-wrapper", children: _jsxs("div", { ref: containerRef, className: "seraphine-portrait-container", children: [_jsx("img", { src: seraphineImg, alt: "Seraphine", className: "seraphine-portrait" }), _jsx("div", { className: "seraphine-aura" })] }) }));
}
