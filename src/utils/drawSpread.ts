// src/utils/drawSpread.ts

import { DeckCard, getPool, PoolId } from "@/data/deckIndex";
import { drawCard, DrawnCard } from "./drawCard";

export type SpreadType = "one" | "three" | "celtic";

export interface PositionedCard extends DrawnCard {
  position?: string;
}

/**
 * Draw a spread of cards from the given pool.
 * Pool defaults to "major1" (original Major Arcana) for backward compatibility.
 * Reversal (isReversed) applies equally to all card types.
 */
export function drawSpread(
  type: SpreadType,
  pool?: DeckCard[]
): PositionedCard[] {
  const activePool = pool ?? getPool("major1");

  if (type === "one") {
    return [drawCard(activePool)];
  }

  if (type === "three") {
    return [
      { ...drawCard(activePool), position: "past"    },
      { ...drawCard(activePool), position: "present" },
      { ...drawCard(activePool), position: "future"  },
    ];
  }

  if (type === "celtic") {
    const positions = [
      "present", "challenge", "past", "future",
      "above", "below", "self", "environment", "hopes", "outcome",
    ];
    return positions.map((position) => ({ ...drawCard(activePool), position }));
  }

  return [];
}
