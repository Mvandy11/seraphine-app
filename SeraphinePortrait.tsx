import { useEffect, useRef } from "react";
import seraphineImg from "@/assets/seraphine.jpeg";
import "./SeraphinePortrait.css";

export default function SeraphinePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
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

  return (
    <div className="seraphine-portrait-wrapper">
      <div ref={containerRef} className="seraphine-portrait-container">
        <img src={seraphineImg} alt="Seraphine" className="seraphine-portrait" />
        <div className="seraphine-aura"></div>
      </div>
    </div>
  );
}
