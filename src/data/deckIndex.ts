// src/data/deckIndex.ts
// Full deck registry: major1, major2, minor (active only), seraphine, oracle

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
  /** false = card image not yet available; excluded from all UI and draw pools */
  enabled?: boolean;
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns only cards where enabled !== false (undefined counts as enabled) */
function active(cards: DeckCard[]): DeckCard[] {
  return cards.filter((c) => c.enabled !== false);
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

// ─── Major Arcana II ──────────────────────────────────────────────────────────
// All uploaded files have a double .png extension (e.g. 00-the-fool.png.png).
// Cards 5 & 6 use a '2' suffix variant filename.
// Card 12 (The Hanged Man) was not uploaded — uses major1 art as fallback.
const MAJOR2_CARDS: DeckCard[] = [
  { id: "m2-00-fool",             name: "The Fool",           image: "/cards/major2/00-the-fool.png.png",           emotion: "serene",   type: "major", upright: "New beginnings, innocence, spontaneity, free spirit",    reversed: "Recklessness, fear, risk-averse, naivety" },
  { id: "m2-01-magician",         name: "The Magician",       image: "/cards/major2/01-the-magician.png.png",       emotion: "ascended", type: "major", upright: "Willpower, manifestation, resourcefulness, skill",        reversed: "Manipulation, untapped potential, trickery" },
  { id: "m2-02-high-priestess",   name: "The High Priestess", image: "/cards/major2/02-the-high-priestess.png.png", emotion: "sorrow",   type: "major", upright: "Intuition, mystery, inner knowledge, the subconscious",   reversed: "Secrets, withdrawal, silence, repressed intuition" },
  { id: "m2-03-empress",          name: "The Empress",        image: "/cards/major2/03-the-empress.png.png",        emotion: "serene",   type: "major", upright: "Abundance, nurturing, fertility, nature, sensuality",     reversed: "Dependence, emptiness, creative block, smothering" },
  { id: "m2-04-emperor",          name: "The Emperor",        image: "/cards/major2/04-the-emperor.png.png",        emotion: "fierce",   type: "major", upright: "Authority, structure, stability, father figure",           reversed: "Domination, rigidity, stubbornness, loss of control" },
  { id: "m2-05-hierophant",       name: "The Hierophant",     image: "/cards/major2/05-the-hierophant2.png.png",    emotion: "serene",   type: "major", upright: "Tradition, spiritual wisdom, conformity, mentorship",     reversed: "Rebellion, subversion, unorthodoxy, restriction" },
  { id: "m2-06-lovers",           name: "The Lovers",         image: "/cards/major2/06-the-lovers2.png.png",        emotion: "serene",   type: "major", upright: "Love, harmony, relationships, alignment, choices",         reversed: "Disharmony, imbalance, misalignment, indecision" },
  { id: "m2-07-chariot",          name: "The Chariot",        image: "/cards/major2/07-the-chariot.png.png",        emotion: "fierce",   type: "major", upright: "Determination, willpower, triumph, control",               reversed: "Aggression, lack of direction, obstacles, defeat" },
  { id: "m2-08-strength",         name: "Strength",           image: "/cards/major2/08-strength.png.png",           emotion: "fierce",   type: "major", upright: "Courage, inner strength, compassion, patience",            reversed: "Self-doubt, weakness, insecurity, raw emotion" },
  { id: "m2-09-hermit",           name: "The Hermit",         image: "/cards/major2/09-the-hermit.png.png",         emotion: "sorrow",   type: "major", upright: "Soul-searching, introspection, solitude, inner guidance",  reversed: "Isolation, loneliness, withdrawal, lost" },
  { id: "m2-10-wheel-of-fortune", name: "Wheel of Fortune",   image: "/cards/major2/10-wheel-of-fortune.png.png",   emotion: "ascended", type: "major", upright: "Change, cycles, fate, turning point, destiny",             reversed: "Bad luck, resistance to change, breaking cycles" },
  { id: "m2-11-justice",          name: "Justice",            image: "/cards/major2/11-justice.png.png",            emotion: "serene",   type: "major", upright: "Fairness, truth, law, cause and effect, clarity",          reversed: "Injustice, dishonesty, lack of accountability" },
  { id: "m2-12-hanged-man",       name: "The Hanged Man",     image: "/cards/major/12-hanged-man.png",              emotion: "sorrow",   type: "major", upright: "Surrender, letting go, new perspective, pause",           reversed: "Stalling, resistance, indecision, martyrdom" },
  { id: "m2-13-death",            name: "Death",              image: "/cards/major2/13-death.png.png",              emotion: "sorrow",   type: "major", upright: "Transformation, endings, transition, release",             reversed: "Resistance to change, fear of endings, stagnation" },
  { id: "m2-14-temperance",       name: "Temperance",         image: "/cards/major2/14-temperance.png.png",         emotion: "serene",   type: "major", upright: "Balance, patience, moderation, harmony, purpose",          reversed: "Imbalance, excess, lack of long-term vision" },
  { id: "m2-15-devil",            name: "The Devil",          image: "/cards/major2/15-the-devil.png.png",          emotion: "fierce",   type: "major", upright: "Bondage, materialism, shadow self, attachment",            reversed: "Release, freedom, reclaiming power, detachment" },
  { id: "m2-16-tower",            name: "The Tower",          image: "/cards/major2/16-the-tower.png.png",          emotion: "fierce",   type: "major", upright: "Upheaval, sudden change, revelation, awakening",           reversed: "Fear of change, averting disaster, delaying the inevitable" },
  { id: "m2-17-star",             name: "The Star",           image: "/cards/major2/17-the-star.png.png",           emotion: "ascended", type: "major", upright: "Hope, renewal, serenity, inspiration, faith",              reversed: "Despair, disconnection, lack of faith, discouragement" },
  { id: "m2-18-moon",             name: "The Moon",           image: "/cards/major2/18-the-moon.png.png",           emotion: "sorrow",   type: "major", upright: "Illusion, intuition, dreams, the unconscious, fear",       reversed: "Clarity, release of fear, truth revealed, confidence" },
  { id: "m2-19-sun",              name: "The Sun",            image: "/cards/major2/19-the-sun.png.png",            emotion: "ascended", type: "major", upright: "Joy, success, vitality, confidence, celebration",          reversed: "Sadness, temporary setbacks, blocked happiness" },
  { id: "m2-20-judgement",        name: "Judgement",          image: "/cards/major2/20-judgement.png.png",          emotion: "ascended", type: "major", upright: "Rebirth, reflection, reckoning, inner calling",            reversed: "Self-doubt, refusal of self-examination, stagnation" },
  { id: "m2-21-world",            name: "The World",          image: "/cards/major2/21-the-world.png.png",          emotion: "ascended", type: "major", upright: "Completion, accomplishment, wholeness, fulfillment",        reversed: "Incompletion, stagnation, lack of closure, emptiness" },
];

// ─── Minor Arcana — Cups (14 images present, all enabled) ────────────────────
// Image filenames use "N of cups.png" convention, court cards capitalised.

const CUPS_CARDS: DeckCard[] = [
  { id: "cups-ace",    name: "Ace of Cups",    image: "/cards/minor/cups/ace.png",             emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-2",      name: "Two of Cups",    image: "/cards/minor/cups/2 of cups.png",       emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-3",      name: "Three of Cups",  image: "/cards/minor/cups/3 of cups.png",       emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-4",      name: "Four of Cups",   image: "/cards/minor/cups/4 of cups.png",       emotion: "sorrow", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-5",      name: "Five of Cups",   image: "/cards/minor/cups/5 of cups.png",       emotion: "sorrow", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-6",      name: "Six of Cups",    image: "/cards/minor/cups/6 of cups.png",       emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-7",      name: "Seven of Cups",  image: "/cards/minor/cups/7 of cups.png",       emotion: "sorrow", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-8",      name: "Eight of Cups",  image: "/cards/minor/cups/8 of cups.png",       emotion: "sorrow", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-9",      name: "Nine of Cups",   image: "/cards/minor/cups/9 of cups.png",       emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-10",     name: "Ten of Cups",    image: "/cards/minor/cups/10 of cups.png",      emotion: "ascended", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-page",   name: "Page of Cups",   image: "/cards/minor/cups/Page of cups.png",   emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-knight", name: "Knight of Cups", image: "/cards/minor/cups/Knight of cups.png", emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-queen",  name: "Queen of Cups",  image: "/cards/minor/cups/Queen of cups.png",  emotion: "serene", suit: "cups", type: "minor", enabled: true  },
  { id: "cups-king",   name: "King of Cups",   image: "/cards/minor/cups/King of cups.png",   emotion: "ascended", suit: "cups", type: "minor", enabled: true  },
];

// ─── Minor Arcana — Wands (pip cards ace–10 present; court cards not yet uploaded) ──
// HIDDEN: Page/Knight/Queen/King of Wands — images not yet generated.
// To re-enable: upload Page of wands.png, Knight of wands.png, Queen of wands.png,
//               King of wands.png to public/cards/minor/wands/ and set enabled: true.

const WANDS_CARDS: DeckCard[] = [
  { id: "wands-ace",    name: "Ace of Wands",    image: "/cards/minor/wands/ace.png",           emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-2",      name: "Two of Wands",    image: "/cards/minor/wands/2 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-3",      name: "Three of Wands",  image: "/cards/minor/wands/3 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-4",      name: "Four of Wands",   image: "/cards/minor/wands/4 of wands.png",    emotion: "serene", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-5",      name: "Five of Wands",   image: "/cards/minor/wands/5 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-6",      name: "Six of Wands",    image: "/cards/minor/wands/6 of wands.png",    emotion: "ascended", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-7",      name: "Seven of Wands",  image: "/cards/minor/wands/7 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-8",      name: "Eight of Wands",  image: "/cards/minor/wands/8 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-9",      name: "Nine of Wands",   image: "/cards/minor/wands/9 of wands.png",    emotion: "fierce", suit: "wands", type: "minor", enabled: true  },
  { id: "wands-10",     name: "Ten of Wands",    image: "/cards/minor/wands/10 of wands.png",   emotion: "sorrow", suit: "wands", type: "minor", enabled: true  },
  // HIDDEN SUITS: Wands court cards are hidden because their images have not been
  // generated yet. To re-enable: upload the images to public/cards/minor/wands/
  // and set enabled: true below.
  { id: "wands-page",   name: "Page of Wands",   image: "/cards/minor/wands/Page of wands.png",   emotion: "fierce", suit: "wands", type: "minor", enabled: false },
  { id: "wands-knight", name: "Knight of Wands", image: "/cards/minor/wands/Knight of wands.png", emotion: "fierce", suit: "wands", type: "minor", enabled: false },
  { id: "wands-queen",  name: "Queen of Wands",  image: "/cards/minor/wands/Queen of wands.png",  emotion: "fierce", suit: "wands", type: "minor", enabled: false },
  { id: "wands-king",   name: "King of Wands",   image: "/cards/minor/wands/King of wands.png",   emotion: "ascended", suit: "wands", type: "minor", enabled: false },
];

// ─── Minor Arcana — Swords & Pentacles ───────────────────────────────────────
// HIDDEN SUITS: Swords (Two–King) and Pentacles (Two–King) are hidden because
// their card images have not been generated yet.
// To re-enable: set enabled: true (and upload images) once files are loaded into
// public/cards/minor/swords/ and public/cards/minor/pentacles/.

const SWORDS_CARDS: DeckCard[] = [
  { id: "swords-ace",    name: "Ace of Swords",    image: "/cards/minor/swords/ace.png",             emotion: "sorrow",   suit: "swords", type: "minor", enabled: true  },
  { id: "swords-2",      name: "Two of Swords",    image: "/cards/minor/swords/2 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-3",      name: "Three of Swords",  image: "/cards/minor/swords/3 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-4",      name: "Four of Swords",   image: "/cards/minor/swords/4 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-5",      name: "Five of Swords",   image: "/cards/minor/swords/5 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-6",      name: "Six of Swords",    image: "/cards/minor/swords/6 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-7",      name: "Seven of Swords",  image: "/cards/minor/swords/7 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-8",      name: "Eight of Swords",  image: "/cards/minor/swords/8 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-9",      name: "Nine of Swords",   image: "/cards/minor/swords/9 of swords.png",    emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-10",     name: "Ten of Swords",    image: "/cards/minor/swords/10 of swords.png",   emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-page",   name: "Page of Swords",   image: "/cards/minor/swords/Page of swords.png", emotion: "sorrow",   suit: "swords", type: "minor", enabled: false },
  { id: "swords-knight", name: "Knight of Swords", image: "/cards/minor/swords/Knight of swords.png", emotion: "fierce", suit: "swords", type: "minor", enabled: false },
  { id: "swords-queen",  name: "Queen of Swords",  image: "/cards/minor/swords/Queen of swords.png", emotion: "sorrow",  suit: "swords", type: "minor", enabled: false },
  { id: "swords-king",   name: "King of Swords",   image: "/cards/minor/swords/King of swords.png",  emotion: "fierce",  suit: "swords", type: "minor", enabled: false },
];

const PENTACLES_CARDS: DeckCard[] = [
  { id: "pentacles-ace",    name: "Ace of Pentacles",    image: "/cards/minor/pentacles/ace.png",               emotion: "ascended", suit: "pentacles", type: "minor", enabled: true  },
  { id: "pentacles-2",      name: "Two of Pentacles",    image: "/cards/minor/pentacles/2 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-3",      name: "Three of Pentacles",  image: "/cards/minor/pentacles/3 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-4",      name: "Four of Pentacles",   image: "/cards/minor/pentacles/4 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-5",      name: "Five of Pentacles",   image: "/cards/minor/pentacles/5 of pentacles.png",    emotion: "sorrow",   suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-6",      name: "Six of Pentacles",    image: "/cards/minor/pentacles/6 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-7",      name: "Seven of Pentacles",  image: "/cards/minor/pentacles/7 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-8",      name: "Eight of Pentacles",  image: "/cards/minor/pentacles/8 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-9",      name: "Nine of Pentacles",   image: "/cards/minor/pentacles/9 of pentacles.png",    emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-10",     name: "Ten of Pentacles",    image: "/cards/minor/pentacles/10 of pentacles.png",   emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-page",   name: "Page of Pentacles",   image: "/cards/minor/pentacles/Page of pentacles.png", emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-knight", name: "Knight of Pentacles", image: "/cards/minor/pentacles/Knight of pentacles.png", emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-queen",  name: "Queen of Pentacles",  image: "/cards/minor/pentacles/Queen of pentacles.png", emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
  { id: "pentacles-king",   name: "King of Pentacles",   image: "/cards/minor/pentacles/King of pentacles.png",  emotion: "ascended", suit: "pentacles", type: "minor", enabled: false },
];

// ─── Active Minor Arcana pool (enabled cards only) ───────────────────────────
// Cards with enabled: false are excluded from ALL rendering and draw logic.

const MINOR_CARDS: DeckCard[] = active([
  ...CUPS_CARDS,
  ...WANDS_CARDS,
  ...SWORDS_CARDS,
  ...PENTACLES_CARDS,
]);

// ─── Seraphine Deck ───────────────────────────────────────────────────────────

const SERAPHINE_CARDS: DeckCard[] = [
  { id: "seraphine-serene-ascension",  name: "Serene Ascension",  image: "/cards/seraphine/deck/serene-ascension.png",  emotion: "serene",   type: "seraphine" },
  { id: "seraphine-fierce-breakthrough", name: "Fierce Breakthrough", image: "/cards/seraphine/deck/fierce-breakthrough.png", emotion: "fierce", type: "seraphine" },
  { id: "seraphine-sorrows-release",   name: "Sorrow's Release",  image: "/cards/seraphine/deck/sorrows-release.png",   emotion: "sorrow",   type: "seraphine" },
];

// ─── Oracle Deck (placeholder — add cards to public/cards/oracle/) ─────────────

const ORACLE_CARDS: DeckCard[] = [
  { id: "oracle-awaits", name: "Oracle Awaits", image: "/cards/seraphine/deck/serene-ascension.png", emotion: "ascended", type: "oracle" },
];

// ─── All deck definitions (used in DeckMenu / Vault) ─────────────────────────
// Each deck shows only enabled cards — no broken image slots appear.

export const decks: DeckDefinition[] = [
  { id: "major1",    name: "Major Arcana I",  cards: MAJOR1_CARDS        },
  { id: "major2",    name: "Major Arcana II", cards: MAJOR2_CARDS        },
  { id: "minor",     name: "Minor Arcana",    cards: MINOR_CARDS         },
  { id: "oracle",    name: "Oracle Deck",     cards: ORACLE_CARDS        },
  { id: "seraphine", name: "Seraphine Deck",  cards: SERAPHINE_CARDS     },
];

// ─── Pool resolver (used in Oracle reading & draw engine) ────────────────────
// All pools are filtered to active (enabled) cards only.

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

// ─── Pool selector options (shown in the Oracle reading UI) ──────────────────

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
