import { useState } from "react";
import { decks, DeckCard, PoolId } from "@/data/deckIndex";
import { useDeckContext } from "@/contexts/DeckContext";
import DeckSelector from "@/components/DeckSelector";
import CardGrid from "@/components/CardGrid";
import CardModal from "@/components/CardModal";

export default function DeckMenu() {
  const { selectedDeck, setSelectedDeck } = useDeckContext();
  const [selectedCard, setSelectedCard]   = useState<DeckCard | null>(null);

  // Vault shows the 5 concrete deck definitions; fall back to major1 if a
  // pool-only id (full-major, full-tarot) was selected in Oracle.
  const deck =
    decks.find((d) => d.id === selectedDeck) ?? decks[0];

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

        <DeckSelector
          active={selectedDeck}
          onChange={(id) => setSelectedDeck(id as PoolId)}
        />

        <CardGrid cards={deck.cards} onSelect={setSelectedCard} />

        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      </div>
    </div>
  );
}
