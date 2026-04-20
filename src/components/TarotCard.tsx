type TarotCardProps = {
  data: {
    id?: string;
    name?: string;
    image?: string;
    reversed?: boolean;
  };
  size?: "sm" | "md" | "lg";
};

const SIZES = { sm: 120, md: 180, lg: 260 } as const;

export function TarotCard({ data, size = "md" }: TarotCardProps) {
  const w = SIZES[size];
  const h = Math.round(w * 1.618);

  const imgSrc =
    data.image ??
    (data.id ? `/cards/major/${data.id}.png` : null);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          width: `${w}px`,
          height: `${h}px`,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 24px rgba(124,58,237,0.5)",
          background: "linear-gradient(135deg, #1a1a1a, #3b0764)",
        }}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={data.name ?? "Tarot Card"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: data.reversed ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        )}
      </div>

      <span
        style={{
          color: "white",
          fontSize: size === "sm" ? "0.75rem" : "0.9rem",
          textAlign: "center",
          opacity: 0.9,
          textShadow: "0 0 8px rgba(124,58,237,0.6)",
        }}
      >
        {data.name ?? "Tarot Card"}
        {data.reversed && (
          <em style={{ opacity: 0.6, marginLeft: "4px", fontSize: "0.8em" }}>
            (Reversed)
          </em>
        )}
      </span>
    </div>
  );
}
