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

// ─── Major Arcana II — explicit filenames matching what was uploaded ──────────
// All uploaded files have a double .png extension (e.g. 00-the-fool.png.png).
// Cards 5 & 6 have a '2' suffix variant.
// Card 12 (The Hanged Man) was not uploaded — falls back to major1 art.
const MAJOR2_CARDS: DeckCard[] = [
  { id: "m2-00-fool",             name: "The Fool",           image: "/cards/major2/00-the-fool.png.png",           emotion: "serene",   type: "major", upright: "New beginnings, innocence, spontaneity, free spirit", reversed: "Recklessness, fear, risk-averse, naivety" },
  { id: "m2-01-magician",         name: "The Magician",       image: "/cards/major2/01-the-magician.png.png",       emotion: "ascended", type: "major", upright: "Willpower, manifestation, resourcefulness, skill",     reversed: "Manipulation, untapped potential, trickery" },
  { id: "m2-02-high-priestess",   name: "The High Priestess", image: "/cards/major2/02-the-high-priestess.png.png", emotion: "sorrow",   type: "major", upright: "Intuition, mystery, inner knowledge, the subconscious",  reversed: "Secrets, withdrawal, silence, repressed intuition" },
  { id: "m2-03-empress",          name: "The Empress",        image: "/cards/major2/03-the-empress.png.png",        emotion: "serene",   type: "major", upright: "Abundance, nurturing, fertility, nature, sensuality",    reversed: "Dependence, emptiness, creative block, smothering" },
  { id: "m2-04-emperor",          name: "The Emperor",        image: "/cards/major2/04-the-emperor.png.png",        emotion: "fierce",   type: "major", upright: "Authority, structure, stability, father figure",          reversed: "Domination, rigidity, stubbornness, loss of control" },
  { id: "m2-05-hierophant",       name: "The Hierophant",     image: "/cards/major2/05-the-hierophant2.png.png",    emotion: "serene",   type: "major", upright: "Tradition, spiritual wisdom, conformity, mentorship",    reversed: "Rebellion, subversion, unorthodoxy, restriction" },
  { id: "m2-06-lovers",           name: "The Lovers",         image: "/cards/major2/06-the-lovers2.png.png",        emotion: "serene",   type: "major", upright: "Love, harmony, relationships, alignment, choices",        reversed: "Disharmony, imbalance, misalignment, indecision" },
  { id: "m2-07-chariot",          name: "The Chariot",        image: "/cards/major2/07-the-chariot.png.png",        emotion: "fierce",   type: "major", upright: "Determination, willpower, triumph, control",              reversed: "Aggression, lack of direction, obstacles, defeat" },
  { id: "m2-08-strength",         name: "Strength",           image: "/cards/major2/08-strength.png.png",           emotion: "fierce",   type: "major", upright: "Courage, inner strength, compassion, patience",           reversed: "Self-doubt, weakness, insecurity, raw emotion" },
  { id: "m2-09-hermit",           name: "The Hermit",         image: "/cards/major2/09-the-hermit.png.png",         emotion: "sorrow",   type: "major", upright: "Soul-searching, introspection, solitude, inner guidance",  reversed: "Isolation, loneliness, withdrawal, lost" },
  { id: "m2-10-wheel-of-fortune", name: "Wheel of Fortune",   image: "/cards/major2/10-wheel-of-fortune.png.png",   emotion: "ascended", type: "major", upright: "Change, cycles, fate, turning point, destiny",            reversed: "Bad luck, resistance to change, breaking cycles" },
  { id: "m2-11-justice",          name: "Justice",            image: "/cards/major2/11-justice.png.png",            emotion: "serene",   type: "major", upright: "Fairness, truth, law, cause and effect, clarity",         reversed: "Injustice, dishonesty, lack of accountability" },
  { id: "m2-12-hanged-man",       name: "The Hanged Man",     image: "/cards/major/12-hanged-man.png",              emotion: "sorrow",   type: "major", upright: "Surrender, letting go, new perspective, pause",          reversed: "Stalling, resistance, indecision, martyrdom" },
  { id: "m2-13-death",            name: "Death",              image: "/cards/major2/13-death.png.png",              emotion: "sorrow",   type: "major", upright: "Transformation, endings, transition, release",            reversed: "Resistance to change, fear of endings, stagnation" },
  { id: "m2-14-temperance",       name: "Temperance",         image: "/cards/major2/14-temperance.png.png",         emotion: "serene",   type: "major", upright: "Balance, patience, moderation, harmony, purpose",         reversed: "Imbalance, excess, lack of long-term vision" },
  { id: "m2-15-devil",            name: "The Devil",          image: "/cards/major2/15-the-devil.png.png",          emotion: "fierce",   type: "major", upright: "Bondage, materialism, shadow self, attachment",           reversed: "Release, freedom, reclaiming power, detachment" },
  { id: "m2-16-tower",            name: "The Tower",          image: "/cards/major2/16-the-tower.png.png",          emotion: "fierce",   type: "major", upright: "Upheaval, sudden change, revelation, awakening",          reversed: "Fear of change, averting disaster, delaying the inevitable" },
  { id: "m2-17-star",             name: "The Star",           image: "/cards/major2/17-the-star.png.png",           emotion: "ascended", type: "major", upright: "Hope, renewal, serenity, inspiration, faith",             reversed: "Despair, disconnection, lack of faith, discouragement" },
  { id: "m2-18-moon",             name: "The Moon",           image: "/cards/major2/18-the-moon.png.png",           emotion: "sorrow",   type: "major", upright: "Illusion, intuition, dreams, the unconscious, fear",      reversed: "Clarity, release of fear, truth revealed, confidence" },
  { id: "m2-19-sun",              name: "The Sun",            image: "/cards/major2/19-the-sun.png.png",            emotion: "ascended", type: "major", upright: "Joy, success, vitality, confidence, celebration",         reversed: "Sadness, temporary setbacks, blocked happiness" },
  { id: "m2-20-judgement",        name: "Judgement",          image: "/cards/major2/20-judgement.png.png",          emotion: "ascended", type: "major", upright: "Rebirth, reflection, reckoning, inner calling",           reversed: "Self-doubt, refusal of self-examination, stagnation" },
  { id: "m2-21-world",            name: "The World",          image: "/cards/major2/21-the-world.png.png",          emotion: "ascended", type: "major", upright: "Completion, accomplishment, wholeness, fulfillment",       reversed: "Incompletion, stagnation, lack of closure, emptiness" },
];

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
