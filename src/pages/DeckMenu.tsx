import { useState } from "react";
import { decks, DeckCard } from "@/data/deckIndex";
import DeckSelector from "@/components/DeckSelector";
import CardGrid from "@/components/CardGrid";
import CardModal from "@/components/CardModal";

export default function DeckMenu() {
  const [activeDeck, setActiveDeck]       = useState("major1");
  const [selectedCard, setSelectedCard]   = useState<DeckCard | null>(null);

  const deck = decks.find((d) => d.id === activeDeck) ?? decks[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/art/backgrounds/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.15), transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "2.4rem",
            marginBottom: "20px",
            textShadow: "0 0 20px rgba(124,58,237,0.6)",
          }}
        >
          The Mythic Vault
        </h1>

        <DeckSelector active={activeDeck} onChange={setActiveDeck} />

        <CardGrid cards={deck.cards} onSelect={setSelectedCard} />

        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      </div>
    </div>
  );
}
