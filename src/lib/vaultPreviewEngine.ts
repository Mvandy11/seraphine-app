// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Vault Preview Engine
// Manages daily preview card selection for the public Vault page.
// Auto-indexes SERAPHINE_DECK, rotates every 24h, never repeats
// the same set two days in a row, and adapts when new cards are added.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { SERAPHINE_DECK, type SeraphineCard, type EmotionalPhysics } from "@/lib/seraphineOracle";

// ─── Config ───────────────────────────────────────────────────

const CACHE_KEY      = "vault_preview_cache";
const PREVIEW_COUNT  = 3;   // Cards to show fully revealed
const LOCKED_COUNT   = 3;   // Phantom locked slots to show

// ─── Cache shape ──────────────────────────────────────────────

interface PreviewCache {
  date: string;
  cardIds: string[];
  previousCardIds: string[];
}

// ─── Helpers ──────────────────────────────────────────────────

function getPreviewPool(): SeraphineCard[] {
  // Auto-exclude the deck back card (id contains "back" or image ends with "back.png")
  return SERAPHINE_DECK.filter(
    (c) => !c.id.includes("back") && !c.image.endsWith("back.png")
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a balanced preview set — one card per emotional physics category when possible.
 * Never repeats yesterday's card IDs.
 */
function buildPreviewSet(previousIds: string[]): SeraphineCard[] {
  const pool = getPreviewPool();

  // Prefer cards not shown yesterday
  const fresh   = pool.filter((c) => !previousIds.includes(c.id));
  const fallback = pool; // use all cards if we can't avoid repeat

  // Group candidates by emotional physics for balance
  const byEmotion = new Map<EmotionalPhysics, SeraphineCard[]>();
  const candidates = fresh.length >= PREVIEW_COUNT ? fresh : fallback;

  for (const card of candidates) {
    const bucket = byEmotion.get(card.emotionalPhysics) ?? [];
    bucket.push(card);
    byEmotion.set(card.emotionalPhysics, bucket);
  }

  const picked: SeraphineCard[] = [];

  // One from each emotion category first (shuffled order so it's not deterministic)
  for (const [, cards] of shuffle([...byEmotion.entries()])) {
    const shuffledCards = shuffle(cards);
    for (const card of shuffledCards) {
      if (!picked.find((p) => p.id === card.id)) {
        picked.push(card);
        break;
      }
    }
    if (picked.length >= PREVIEW_COUNT) break;
  }

  // If still under count, fill from remaining fresh candidates
  if (picked.length < PREVIEW_COUNT) {
    const remaining = shuffle(candidates.filter((c) => !picked.find((p) => p.id === c.id)));
    for (const card of remaining) {
      picked.push(card);
      if (picked.length >= PREVIEW_COUNT) break;
    }
  }

  return picked.slice(0, PREVIEW_COUNT);
}

// ─── Public API ───────────────────────────────────────────────

export interface VaultPreviewResult {
  previewCards: SeraphineCard[];
  lockedCount: number;
  refreshIn: string;
  totalDeckSize: number;
}

export function getDailyVaultPreview(): VaultPreviewResult {
  const today = new Date().toISOString().split("T")[0];
  const pool  = getPreviewPool();

  // Try to return cached selection for today
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const cache: PreviewCache = JSON.parse(raw);
      if (cache.date === today) {
        // Validate IDs still exist in deck (handles card removal)
        const valid = cache.cardIds
          .map((id) => pool.find((c) => c.id === id))
          .filter(Boolean) as SeraphineCard[];

        // If pool gained new cards since cache was built, rebuild immediately
        const newCardsAvailable = pool.some(
          (c) => !cache.cardIds.includes(c.id) && !cache.previousCardIds.includes(c.id)
        );

        if (valid.length >= PREVIEW_COUNT && !newCardsAvailable) {
          return buildResult(valid);
        }
      }
    }
  } catch {
    // Ignore corrupt cache
  }

  // Build fresh set for today
  let previousIds: string[] = [];
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const old: PreviewCache = JSON.parse(raw);
      previousIds = old.cardIds;
    }
  } catch {}

  const selected = buildPreviewSet(previousIds);

  const cache: PreviewCache = {
    date: today,
    cardIds: selected.map((c) => c.id),
    previousCardIds: previousIds,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

  return buildResult(selected);
}

function buildResult(previewCards: SeraphineCard[]): VaultPreviewResult {
  const pool = getPreviewPool();
  const nextRefresh = new Date();
  nextRefresh.setHours(24, 0, 0, 0);
  const hoursLeft = Math.ceil((nextRefresh.getTime() - Date.now()) / 3_600_000);

  return {
    previewCards,
    lockedCount: LOCKED_COUNT,
    refreshIn: `${hoursLeft}h`,
    totalDeckSize: 78,  // full tarot deck
  };
}
