// src/utils/drawCard.ts

import { DeckCard } from "@/data/deckIndex";

export interface DrawnCard extends DeckCard {
  /** true when the card was drawn upside-down (30% chance) */
  isReversed: boolean;
}

/**
 * Draw a single random card from any pool (array of DeckCard).
 * 30% chance of reversal — applies identically to Major, Minor, Oracle, and Seraphine cards.
 */
export function drawCard(pool: DeckCard[]): DrawnCard {
  if (!pool || pool.length === 0) {
    throw new Error("drawCard: pool is empty");
  }
  const card = pool[Math.floor(Math.random() * pool.length)];
  return { ...card, isReversed: Math.random() < 0.3 };
}
