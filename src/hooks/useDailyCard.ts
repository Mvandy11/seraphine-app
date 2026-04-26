// useDailyCard.ts
// 14-day no-repeat rotation, birthday weighting, and daily-locked selection per user.
// Accepts a deckId so the draw pool can be chosen by the user.

import { useEffect, useState } from "react";
import { getPool, PoolId, DeckCard } from "@/data/deckIndex";
import { drawCard } from "@/utils/drawCard";
import { getBirthdayArchetype, type BirthdayArchetype } from "@/utils/birthdayEngine";

interface DailyCardRecord {
  date: string;
  cardId: string;
  deckId: PoolId;
}

interface DailyPayload {
  date: string;
  card: DeckCard & { isReversed: boolean };
  emotion: DeckCard["emotion"];
  message: string;
  deckId: PoolId;
}

const DAILY_KEY   = "dailyCard";
const HISTORY_KEY = "dailyCard_history";
const HISTORY_MAX = 14;

function loadBirthday(): BirthdayArchetype | null {
  try {
    const raw = localStorage.getItem("seraphine_birthday");
    if (!raw) return null;
    const { month, day } = JSON.parse(raw);
    return getBirthdayArchetype(Number(month), Number(day));
  } catch {
    return null;
  }
}

function getDailyHistory(): DailyCardRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function selectWeightedCard(
  pool: DeckCard[],
  recentIds: string[],
  birthday: BirthdayArchetype | null
): DeckCard {
  const weights = pool.map((card) => {
    let w = 10;
    if (recentIds.includes(card.id)) w -= 8;
    if (birthday?.birthArcana === card.name) w += 5;
    return Math.max(1, w);
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/**
 * Returns the daily card, locked for the current calendar day.
 * If the deck changes, the locked card stays until tomorrow — deck
 * selection only affects the next new draw.
 *
 * @param deckId — which pool to draw from (defaults to "major1")
 */
export function useDailyCard(deckId: PoolId = "major1") {
  const [daily, setDaily] = useState<DailyPayload | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Return today's cached card if one already exists
    const stored = localStorage.getItem(DAILY_KEY);
    if (stored) {
      const parsed: DailyPayload = JSON.parse(stored);
      if (parsed.date === today) {
        setDaily(parsed);
        return;
      }
    }

    // Build 14-day history to avoid repeats
    const history = getDailyHistory();
    const cutoff  = new Date();
    cutoff.setDate(cutoff.getDate() - HISTORY_MAX);
    const recentIds = history
      .filter((r) => new Date(r.date) > cutoff)
      .map((r) => r.cardId);

    // Draw from the selected pool
    const pool    = getPool(deckId);
    const birthday = loadBirthday();
    const picked  = selectWeightedCard(pool, recentIds, birthday);
    const drawn   = drawCard(pool); // full random draw (picked is weighted, use it directly)
    const card    = { ...picked, isReversed: drawn.isReversed };

    const emotion  = card.emotion;
    const message  = `Seraphine reveals ${card.name} as your guiding force today.${card.isReversed ? " The card appears reversed — its energy turns inward." : ""}`;

    const payload: DailyPayload = { date: today, card, emotion, message, deckId };

    localStorage.setItem(DAILY_KEY, JSON.stringify(payload));

    // Update 14-day history
    const updated = [
      { date: today, cardId: card.id, deckId },
      ...history.filter((r) => new Date(r.date) > cutoff),
    ].slice(0, HISTORY_MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

    setDaily(payload);
  }, [deckId]);

  return daily;
}
