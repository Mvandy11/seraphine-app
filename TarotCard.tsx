type TarotCardProps = {
  data: any;
  isReversed?: boolean;
};

export function TarotCard({ data, isReversed = false }: TarotCardProps) {
  if (!data) return null;

  // Convert name → slug (e.g., "The Fool" → "fool")
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Pad number → 2 digits (e.g., 0 → "00")
  const padded = data.number.toString().padStart(2, "0");

  // Build final image path
  const imgSrc = `/cards/${data.suit}/${padded}-${slug}.png`;

  return (
    <div className={`tarot-card ${isReversed ? "reversed" : ""}`}>
      <img
        src={imgSrc}
        alt={data.name}
        className="tarot-card-image"
        draggable={false}
      />
    </div>
  );
}
