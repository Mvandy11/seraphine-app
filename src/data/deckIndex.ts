// src/data/deckIndex.ts
// Full deck registry: major1, major2, minor (56), seraphine, oracle

import { getCardsBySuit } from "@/lib/tarotCards";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DeckCard {
  id: string;
  name: string;
  image: string;
  emotion: "serene" | "fierce" | "sorrow" | "ascended";
  suit?: "cups" | "pentacles" | "swords" | "wands";
  type?: "major" | "minor" | "oracle" | "seraphine" | "back";
  upright?: string;
  reversed?: string;
}

export interface DeckDefinition {
  id: string;
  name: string;
  cards: DeckCard[];
}

export type PoolId =
  | "major1"
  | "major2"
  | "full-major"
  | "minor"
  | "full-tarot"
  | "oracle"
  | "seraphine";

// ─── Minor Arcana build helpers ───────────────────────────────────────────────

const NUM_TO_SLUG: Record<number, string> = {
  1: "ace", 2: "2", 3: "3", 4: "4", 5: "5",
  6: "6",   7: "7", 8: "8", 9: "9", 10: "10",
  11: "page", 12: "knight", 13: "queen", 14: "king",
};

const SUIT_EMOTION: Record<string, DeckCard["emotion"]> = {
  cups:      "serene",
  wands:     "fierce",
  swords:    "sorrow",
  pentacles: "ascended",
};

function buildMinorCards(
  suit: "cups" | "wands" | "swords" | "pentacles"
): DeckCard[] {
  return getCardsBySuit(suit).map((c) => {
    const slug = NUM_TO_SLUG[c.number];
    return {
      id:       `${suit}-${slug}`,
      name:     c.name,
      image:    `/cards/minor/${suit}/${slug}.png`,
      emotion:  SUIT_EMOTION[suit],
      suit,
      type:     "minor" as const,
      upright:  c.upright,
      reversed: c.reversed,
    };
  });
}

// ─── Major Arcana I ───────────────────────────────────────────────────────────

const MAJOR1_CARDS: DeckCard[] = [
  { id: "m1-00-fool",             name: "The Fool",           image: "/cards/major/00-fool.png",             emotion: "serene",   type: "major" },
  { id: "m1-01-magician",         name: "The Magician",       image: "/cards/major/01-magician.png",         emotion: "ascended", type: "major" },
  { id: "m1-02-high-priestess",   name: "The High Priestess", image: "/cards/major/02-high-priestess.png",   emotion: "sorrow",   type: "major" },
  { id: "m1-03-empress",          name: "The Empress",        image: "/cards/major/03-empress.png",          emotion: "serene",   type: "major" },
  { id: "m1-04-emperor",          name: "The Emperor",        image: "/cards/major/04-emperor.png",          emotion: "fierce",   type: "major" },
  { id: "m1-05-hierophant",       name: "The Hierophant",     image: "/cards/major/05-hierophant.png",       emotion: "serene",   type: "major" },
  { id: "m1-06-lovers",           name: "The Lovers",         image: "/cards/major/06-lovers.png",           emotion: "serene",   type: "major" },
  { id: "m1-07-chariot",          name: "The Chariot",        image: "/cards/major/07-chariot.png",          emotion: "fierce",   type: "major" },
  { id: "m1-08-strength",         name: "Strength",           image: "/cards/major/08-strength.png",         emotion: "fierce",   type: "major" },
  { id: "m1-09-hermit",           name: "The Hermit",         image: "/cards/major/09-hermit.png",           emotion: "sorrow",   type: "major" },
  { id: "m1-10-wheel-of-fortune", name: "Wheel of Fortune",   image: "/cards/major/10-wheel-of-fortune.png", emotion: "ascended", type: "major" },
  { id: "m1-11-justice",          name: "Justice",            image: "/cards/major/11-justice.png",          emotion: "serene",   type: "major" },
  { id: "m1-12-hanged-man",       name: "The Hanged Man",     image: "/cards/major/12-hanged-man.png",       emotion: "sorrow",   type: "major" },
  { id: "m1-13-death",            name: "Death",              image: "/cards/major/13-death.png",            emotion: "sorrow",   type: "major" },
  { id: "m1-14-temperance",       name: "Temperance",         image: "/cards/major/14-temperance.png",       emotion: "serene",   type: "major" },
  { id: "m1-15-devil",            name: "The Devil",          image: "/cards/major/15-devil.png",            emotion: "fierce",   type: "major" },
  { id: "m1-16-tower",            name: "The Tower",          image: "/cards/major/16-tower.png",            emotion: "fierce",   type: "major" },
  { id: "m1-17-star",             name: "The Star",           image: "/cards/major/17-star.png",             emotion: "ascended", type: "major" },
  { id: "m1-18-moon",             name: "The Moon",           image: "/cards/major/18-moon.png",             emotion: "sorrow",   type: "major" },
  { id: "m1-19-sun",              name: "The Sun",            image: "/cards/major/19-sun.png",              emotion: "ascended", type: "major" },
  { id: "m1-20-judgement",        name: "Judgement",          image: "/cards/major/20-judgement.png",        emotion: "ascended", type: "major" },
  { id: "m1-21-world",            name: "The World",          image: "/cards/major/21-world.png",            emotion: "ascended", type: "major" },
];

// ─── Major Arcana II (same archetypes, second art set) ────────────────────────
// Add images to public/cards/major2/ using the same filenames as major/:
//   00-fool.png … 21-world.png
const MAJOR2_CARDS: DeckCard[] = MAJOR1_CARDS.map((c) => ({
  ...c,
  id:    c.id.replace("m1-", "m2-"),
  image: c.image.replace("/cards/major/", "/cards/major2/"),
}));

// ─── Minor Arcana — full 56 cards ────────────────────────────────────────────

const MINOR_CARDS: DeckCard[] = [
  ...buildMinorCards("cups"),
  ...buildMinorCards("wands"),
  ...buildMinorCards("swords"),
  ...buildMinorCards("pentacles"),
];

// ─── Seraphine Deck ───────────────────────────────────────────────────────────

const SERAPHINE_CARDS: DeckCard[] = [
  {
    id:      "seraphine-serene-ascension",
    name:    "Serene Ascension",
    image:   "/cards/seraphine/deck/serene-ascension.png",
    emotion: "serene",
    type:    "seraphine",
  },
  {
    id:      "seraphine-fierce-breakthrough",
    name:    "Fierce Breakthrough",
    image:   "/cards/seraphine/deck/fierce-breakthrough.png",
    emotion: "fierce",
    type:    "seraphine",
  },
  {
    id:      "seraphine-sorrows-release",
    name:    "Sorrow's Release",
    image:   "/cards/seraphine/deck/sorrows-release.png",
    emotion: "sorrow",
    type:    "seraphine",
  },
];

// ─── Oracle Deck (placeholder — add cards to public/cards/oracle/) ─────────────

const ORACLE_CARDS: DeckCard[] = [
  {
    id:      "oracle-awaits",
    name:    "Oracle Awaits",
    image:   "/cards/seraphine/deck/serene-ascension.png",
    emotion: "ascended",
    type:    "oracle",
  },
];

// ─── All deck definitions (used in DeckMenu / Vault) ─────────────────────────

export const decks: DeckDefinition[] = [
  { id: "major1",    name: "Major Arcana I",  cards: MAJOR1_CARDS   },
  { id: "major2",    name: "Major Arcana II", cards: MAJOR2_CARDS   },
  { id: "minor",     name: "Minor Arcana",    cards: MINOR_CARDS    },
  { id: "oracle",    name: "Oracle Deck",     cards: ORACLE_CARDS   },
  { id: "seraphine", name: "Seraphine Deck",  cards: SERAPHINE_CARDS },
];

// ─── Pool resolver (used in Oracle reading) ───────────────────────────────────

export function getPool(poolId: PoolId): DeckCard[] {
  switch (poolId) {
    case "major1":      return MAJOR1_CARDS;
    case "major2":      return MAJOR2_CARDS;
    case "full-major":  return [...MAJOR1_CARDS, ...MAJOR2_CARDS];
    case "minor":       return MINOR_CARDS;
    case "full-tarot":  return [...MAJOR1_CARDS, ...MINOR_CARDS];
    case "oracle":      return ORACLE_CARDS;
    case "seraphine":   return SERAPHINE_CARDS;
    default:            return MAJOR1_CARDS;
  }
}

// ─── Pool selector options (7 choices shown in the Oracle reading UI) ─────────

export const POOL_OPTIONS: { id: PoolId; label: string }[] = [
  { id: "major1",     label: "Major Arcana I"    },
  { id: "major2",     label: "Major Arcana II"   },
  { id: "full-major", label: "Full Major Arcana" },
  { id: "minor",      label: "Minor Arcana"      },
  { id: "full-tarot", label: "Full Tarot"        },
  { id: "oracle",     label: "Oracle Deck"       },
  { id: "seraphine",  label: "Seraphine Deck"    },
];

// ─── Minor Arcana back card ───────────────────────────────────────────────────

export const minorBackCard: DeckCard = {
  id:      "minor-back",
  name:    "Minor Arcana Back",
  image:   "/cards/minor/back/minor-back.png",
  emotion: "serene",
  type:    "back",
};
