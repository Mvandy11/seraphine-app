import { useEffect, useState } from "react";

export default function CardReveal({ card }: { card: any }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 300);
    return () => clearTimeout(t);
  }, [card]);

  return (
    <div
      style={{
        perspective: "1200px",
        width: "260px",
        height: "420px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 1s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Back of card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1a1a, #3b0764)",
            borderRadius: "12px",
            border: "2px solid rgba(255,255,255,0.2)",
            boxShadow: "0 0 30px rgba(124,58,237,0.4)",
          }}
        />

        {/* Front of card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(124,58,237,0.6)",
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
