// src/utils/drawCard.ts

import { decks } from "@/data/decks";

export function drawCard(deckName: keyof typeof decks = "major") {
  const deck = decks[deckName];
  if (!deck) throw new Error(`Deck not found: ${deckName}`);

  const card = deck.cards[Math.floor(Math.random() * deck.cards.length)];

  return {
    ...card,
    image: `${deck.path}${card.id}.png`
  };
}
