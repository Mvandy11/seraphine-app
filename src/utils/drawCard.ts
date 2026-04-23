// src/utils/drawCard.ts

import { decks } from "@/data/decks";

export function drawCard(deckName: keyof typeof decks = "major") {
  const deck = decks[deckName];
  if (!deck) throw new Error(`Deck not found: ${deckName}`);

  const card = deck.cards[Math.floor(Math.random() * deck.cards.length)];
  const reversed = Math.random() < 0.3;

  // Minor arcana cards carry their own full image path; major arcana uses deck.path + id
  const image = (card as { image?: string }).image ?? `${deck.path}${card.id}.png`;

  return {
    ...card,
    image,
    reversed,
  };
}
