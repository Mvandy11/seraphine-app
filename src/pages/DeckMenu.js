import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { decks } from "@/data/deckIndex";
import DeckSelector from "@/components/DeckSelector";
import CardGrid from "@/components/CardGrid";
import CardModal from "@/components/CardModal";
export default function DeckMenu() {
    const [activeDeck, setActiveDeck] = useState("major");
    const [selectedCard, setSelectedCard] = useState(null);
    const deck = decks.find((d) => d.id === activeDeck);
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            backgroundImage: "url(/art/backgrounds/vault.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px 20px",
            position: "relative",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at center, rgba(124,58,237,0.15), transparent)",
                    pointerEvents: "none",
                } }), _jsxs("div", { style: { position: "relative", zIndex: 2 }, children: [_jsx("h1", { style: {
                            textAlign: "center",
                            color: "white",
                            fontSize: "2.4rem",
                            marginBottom: "20px",
                            textShadow: "0 0 20px rgba(124,58,237,0.6)",
                        }, children: "The Mythic Vault" }), _jsx(DeckSelector, { active: activeDeck, onChange: setActiveDeck }), _jsx(CardGrid, { cards: deck.cards, onSelect: setSelectedCard }), _jsx(CardModal, { card: selectedCard, onClose: () => setSelectedCard(null) })] })] }));
}
