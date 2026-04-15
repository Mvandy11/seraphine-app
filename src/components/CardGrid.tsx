import { DeckCard } from "@/data/deckIndex";

export default function CardGrid({
  cards,
  onSelect,
}: {
  cards: DeckCard[];
  onSelect: (card: DeckCard) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "30px",
        padding: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelect(card)}
          style={{
            cursor: "pointer",
            transform: "translateY(0px)",
            transition: "0.3s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(-8px) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(0px) scale(1)";
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 0 25px rgba(124,58,237,0.5)",
            }}
          />
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "1.1rem",
            }}
          >
            {card.name}
          </div>
        </div>
      ))}
    </div>
  );
}
