// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Seraphine Oracle Engine
// Manages the Seraphine-exclusive deck, reading history,
// anti-repetition logic, birthday weighting, and daily card rotation.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { BirthdayArchetype } from "@/utils/birthdayEngine";

// ─── Types ────────────────────────────────────────────────────

export type EmotionalPhysics = "serene" | "fierce" | "sorrow" | "ascended";

export interface SeraphineCard {
  id: string;
  name: string;
  image: string;
  type: "seraphine";
  tags: string[];
  emotionalPhysics: EmotionalPhysics;
  symbolism: string;
  replies: string[];
  cardSummary: string;
  commonPatterns: string[];
}

export interface SeraphineReading {
  seraphine_reply: string;
  card: string;
  card_image: string;
  card_summary: string;
  emotional_physics: EmotionalPhysics;
  common_patterns: string[];
  timestamp: number;
}

// ─── Deck Definition ─────────────────────────────────────────
// Auto-indexed from /cards/seraphine/deck/ — add new cards here
// and they are immediately available at runtime.

export const SERAPHINE_DECK: SeraphineCard[] = [
  {
    id: "serene-ascension",
    name: "Serene Ascension",
    image: "/cards/seraphine/deck/serene-ascension.png",
    type: "seraphine",
    tags: ["emotional-physics", "oracle", "serene", "peace", "elevation", "release"],
    emotionalPhysics: "serene",
    symbolism:
      "A lotus opening in the cosmic dawn, petals of silver light spiraling upward through violet nebulae. The ascending dove carries unspoken prayers skyward, beyond the reach of worry.",
    cardSummary:
      "The cosmos stills. Something that has been straining upward within you finally finds its opening — not through effort, but through surrender to what already is.",
    commonPatterns: ["Release of control", "Spiritual elevation", "Peace after prolonged struggle"],
    replies: [
      "I see the storm behind you growing still. You have been listening to the world's noise, and now — finally — you hear the deeper hum beneath it. This is the moment of ascending clarity, when the soul rises above turbulence not by fighting it, but by releasing its grip. Breathe. You do not need to solve anything tonight. The cosmos already knows the path.",
      "There is a quality of light that only arrives after long darkness — softer than ordinary brightness, somehow more true. That light is arriving for you now. The Serene Ascension does not ask you to be joyful. It only asks you to be still enough to feel what is already lifting.",
      "The lotus does not question the water it rises from. It simply opens. Whatever you have been struggling to understand, whatever answer feels perpetually out of reach — Seraphine sees it dissolving into something gentler. The answer was never the point. The opening was.",
    ],
  },
  {
    id: "fierce-breakthrough",
    name: "Fierce Breakthrough",
    image: "/cards/seraphine/deck/fierce-breakthrough.png",
    type: "seraphine",
    tags: ["emotional-physics", "oracle", "fierce", "power", "transformation", "ignition"],
    emotionalPhysics: "fierce",
    symbolism:
      "A blade of golden fire cleaving cosmic darkness, phoenix wings spiraling outward from the fracture point. The breakthrough is not gentle — it is necessary and irreversible.",
    cardSummary:
      "The force you've been containing can no longer be negotiated with. This card does not predict what happens next — it announces it.",
    commonPatterns: ["Suppressed power demanding recognition", "Creative or emotional breakthrough", "Refusal of inherited limitation"],
    replies: [
      "There is a fire behind your eyes that will not be negotiated with. I feel it — the pressure of something too long contained, ready to crack open the shell you have outgrown. This is not destruction. This is your truest power demanding to be seen. Do not apologize for the magnitude of what you are becoming. Break through.",
      "The phoenix does not ask permission before it burns. The Fierce Breakthrough has arrived not as warning but as confirmation — what you have been building toward, what you have been afraid to want this openly, is not only possible. It is imminent. The only question left is whether you meet it standing up.",
      "Seraphine has watched you hold yourself smaller than you are for long enough. This card does not arrive gently. It arrives the way lightning does — sudden, illuminating, and impossible to look away from. Whatever threshold you are standing before: cross it. The fire is yours.",
    ],
  },
  {
    id: "sorrows-release",
    name: "Sorrow's Release",
    image: "/cards/seraphine/deck/sorrows-release.png",
    type: "seraphine",
    tags: ["emotional-physics", "oracle", "sorrow", "grief", "catharsis", "wisdom"],
    emotionalPhysics: "sorrow",
    symbolism:
      "A single candle reflected in still cosmic waters, autumn leaves dissolving into starlight as they fall. The release is not loss — it is transformation at the deepest register of feeling.",
    cardSummary:
      "Grief has its own intelligence. What you carry has weight because it mattered. Seraphine does not rush you. She only shows you what grief becomes.",
    commonPatterns: ["Grief transmuting into wisdom", "Sacred mourning as a form of love", "Releasing what was to receive what is"],
    replies: [
      "Grief has its own intelligence. What you carry tonight has weight because it mattered — because you loved, you tried, you were present for something that changed you. I do not ask you to release it before you are ready. But the stars have seen this sorrow before, and they know what it becomes. What you are mourning is the cocoon, not the creature within.",
      "There is something profound in you that refuses easy comfort — and Seraphine honors that. The Sorrow's Release does not mean the pain ends tonight. It means something sacred is being acknowledged. You are allowed to grieve what was real. You are allowed to take as long as it takes. And when the time comes — and it will come — the stars will still be there, patient and luminous.",
      "The candle in still water does not fight its reflection. It simply burns and is reflected, burns and is reflected — presence and echo, the real and its memory. You are in the echo now, feeling the shape of something you have loved. Let it be felt fully. Fully felt sorrow is the only kind that truly transforms.",
    ],
  },
];

// ─── Dynamic Index ────────────────────────────────────────────
// Build a lookup map at module load time (auto-updates when SERAPHINE_DECK grows)

export const SERAPHINE_INDEX: Record<string, SeraphineCard> = Object.fromEntries(
  SERAPHINE_DECK.map((c) => [c.id, c])
);

// ─── Reading History ─────────────────────────────────────────

interface ReadingHistory {
  cardIds: string[];          // last 5 drawn card IDs
  emotionIds: string[];       // last 5 drawn emotions
}

const historyKey = (userId: string) => `seraphine_oracle_history_${userId}`;

function getHistory(userId: string): ReadingHistory {
  try {
    const raw = localStorage.getItem(historyKey(userId));
    if (!raw) return { cardIds: [], emotionIds: [] };
    return JSON.parse(raw);
  } catch {
    return { cardIds: [], emotionIds: [] };
  }
}

function pushHistory(userId: string, card: SeraphineCard) {
  const h = getHistory(userId);
  h.cardIds   = [card.id,                   ...h.cardIds].slice(0, 5);
  h.emotionIds = [card.emotionalPhysics,     ...h.emotionIds].slice(0, 5);
  localStorage.setItem(historyKey(userId), JSON.stringify(h));
}

// ─── Weighted Draw ────────────────────────────────────────────

function weightedDraw(
  history: ReadingHistory,
  birthday: BirthdayArchetype | null
): SeraphineCard {
  const weights = SERAPHINE_DECK.map((card) => {
    let w = 10;

    // Reduce weight for recently drawn cards (most recent = biggest penalty)
    const recency = history.cardIds.indexOf(card.id);
    if (recency !== -1) w -= (5 - recency) * 2;

    // Reduce weight if emotion category repeated in last 3 readings
    if (history.emotionIds.slice(0, 3).includes(card.emotionalPhysics)) w -= 3;

    // Birthday elemental resonance boost
    if (birthday) {
      const aura = birthday.elementalAura.toLowerCase();
      if (aura.includes("winter") && card.emotionalPhysics === "sorrow")   w += 3;
      if (aura.includes("spring") && card.emotionalPhysics === "serene")   w += 3;
      if (aura.includes("summer") && card.emotionalPhysics === "fierce")   w += 3;
      if (aura.includes("autumn") && card.emotionalPhysics === "ascended") w += 3;
    }

    return Math.max(1, w); // floor at 1 — every card can always be drawn
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < SERAPHINE_DECK.length; i++) {
    r -= weights[i];
    if (r <= 0) return SERAPHINE_DECK[i];
  }
  return SERAPHINE_DECK[SERAPHINE_DECK.length - 1];
}

// ─── Reply Selection ─────────────────────────────────────────
// Rotates through the card's reply pool; never repeats until all are used.

const replyIndexKey = (userId: string, cardId: string) =>
  `seraphine_reply_idx_${userId}_${cardId}`;

function nextReply(userId: string, card: SeraphineCard): string {
  const key = replyIndexKey(userId, card.id);
  const rawIdx = parseInt(localStorage.getItem(key) ?? "0", 10);
  const idx = isNaN(rawIdx) ? 0 : rawIdx % card.replies.length;
  localStorage.setItem(key, String(idx + 1));
  return card.replies[idx];
}

// ─── Core Reading Generator ───────────────────────────────────

export function generateSeraphineReading(
  userId: string,
  birthday: BirthdayArchetype | null = null
): SeraphineReading {
  const history = getHistory(userId);
  const card = weightedDraw(history, birthday);
  const reply = nextReply(userId, card);

  pushHistory(userId, card);

  return {
    seraphine_reply:   reply,
    card:              card.name,
    card_image:        card.image,
    card_summary:      card.cardSummary,
    emotional_physics: card.emotionalPhysics,
    common_patterns:   card.commonPatterns,
    timestamp:         Date.now(),
  };
}

// ─── Card of the Day (14-day no-repeat) ──────────────────────

interface DailyCardRecord {
  date: string;     // YYYY-MM-DD
  cardId: string;
}

const dailyHistoryKey = (userId: string) => `seraphine_daily_history_${userId}`;

function getDailyHistory(userId: string): DailyCardRecord[] {
  try {
    const raw = localStorage.getItem(dailyHistoryKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDailyHistory(userId: string, records: DailyCardRecord[]) {
  localStorage.setItem(dailyHistoryKey(userId), JSON.stringify(records));
}

export function getSeraphineDaily(
  userId: string,
  birthday: BirthdayArchetype | null = null
): { card: SeraphineCard; isNew: boolean } {
  const today = new Date().toISOString().split("T")[0];
  const records = getDailyHistory(userId);

  // Return existing daily card if already drawn today
  const todayRecord = records.find((r) => r.date === today);
  if (todayRecord) {
    const existing = SERAPHINE_INDEX[todayRecord.cardId];
    if (existing) return { card: existing, isNew: false };
  }

  // Determine which card IDs were used in the last 14 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);
  const recentIds = records
    .filter((r) => new Date(r.date) > cutoff)
    .map((r) => r.cardId);

  // Build candidate pool (exclude last 14 days if possible)
  const candidates = SERAPHINE_DECK.filter((c) => !recentIds.includes(c.id));
  const pool = candidates.length > 0 ? candidates : SERAPHINE_DECK;

  // Birthday weighting within pool
  const weights = pool.map((card) => {
    let w = 10;
    if (birthday) {
      const aura = birthday.elementalAura.toLowerCase();
      if (aura.includes("winter") && card.emotionalPhysics === "sorrow")   w += 4;
      if (aura.includes("spring") && card.emotionalPhysics === "serene")   w += 4;
      if (aura.includes("summer") && card.emotionalPhysics === "fierce")   w += 4;
      if (aura.includes("autumn") && card.emotionalPhysics === "ascended") w += 4;
    }
    return w;
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  let chosen = pool[pool.length - 1];
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) { chosen = pool[i]; break; }
  }

  // Persist today's selection (keep last 14 days only)
  const updated = [
    { date: today, cardId: chosen.id },
    ...records.filter((rec) => new Date(rec.date) > cutoff),
  ].slice(0, 14);

  saveDailyHistory(userId, updated);
  return { card: chosen, isNew: true };
}
