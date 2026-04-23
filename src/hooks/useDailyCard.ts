// useDailyCard.ts
// Enhanced: 14-day no-repeat rotation for Major Arcana,
// birthday weighting, and daily-locked selection per user.

import { useEffect, useState } from "react";
import { drawCard } from "@/utils/drawCard";
import { cardEmotions } from "@/data/emotions";
import { decks } from "@/data/decks";
import { getBirthdayArchetype, type BirthdayArchetype } from "@/utils/birthdayEngine";

interface DailyCardRecord {
  date: string;
  cardId: string;
}

const DAILY_KEY      = "dailyCard";
const HISTORY_KEY    = "dailyCard_history";
const HISTORY_MAX    = 14;

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
  majorCards: { id: string; name: string }[],
  recentIds: string[],
  birthday: BirthdayArchetype | null
): { id: string; name: string } {
  const weights = majorCards.map((card) => {
    let w = 10;

    // Penalty for any card used in the last 14 days
    if (recentIds.includes(card.id)) w -= 8;

    // Birthday resonance boost via birth arcana
    if (birthday?.birthArcana === card.name) w += 5;

    return Math.max(1, w);
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < majorCards.length; i++) {
    r -= weights[i];
    if (r <= 0) return majorCards[i];
  }
  return majorCards[majorCards.length - 1];
}

export function useDailyCard() {
  const [daily, setDaily] = useState<any>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Return existing daily card if already set today
    const stored = localStorage.getItem(DAILY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setDaily(parsed);
        return;
      }
    }

    // Build history of last 14 card IDs
    const history = getDailyHistory();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - HISTORY_MAX);
    const recentIds = history
      .filter((r) => new Date(r.date) > cutoff)
      .map((r) => r.cardId);

    // Weighted draw from Major Arcana
    const birthday = loadBirthday();
    const majorCards = decks.major.cards;
    const picked = selectWeightedCard(majorCards, recentIds, birthday);

    // Construct full card object (match drawCard's output shape)
    const card = {
      id:       picked.id,
      name:     picked.name,
      image:    `/cards/major/${picked.id}.png`,
      reversed: Math.random() < 0.25,
    };

    const emotion  = cardEmotions[card.id];
    const message  = `Seraphine reveals ${card.name} as your guiding force today.`;

    const payload = { date: today, card, emotion, message };

    // Persist daily card
    localStorage.setItem(DAILY_KEY, JSON.stringify(payload));

    // Update 14-day history
    const updated = [
      { date: today, cardId: card.id },
      ...history.filter((r) => new Date(r.date) > cutoff),
    ].slice(0, HISTORY_MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

    setDaily(payload);
  }, []);

  return daily;
}
