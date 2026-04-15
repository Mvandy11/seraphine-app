import { decks } from "@/data/deckIndex";

export default function DeckSelector({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      {decks.map((deck) => (
        <button
          key={deck.id}
          onClick={() => onChange(deck.id)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background:
              active === deck.id
                ? "rgba(124,58,237,0.4)"
                : "rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow:
              active === deck.id
                ? "0 0 20px rgba(124,58,237,0.6)"
                : "none",
            transition: "0.2s ease",
          }}
        >
          {deck.name}
        </button>
      ))}
    </div>
  );
}
