// src/data/deckIndex.ts

export interface DeckCard {
  id: string;
  name: string;
  image: string;
  emotion: "serene" | "fierce" | "sorrow" | "ascended";
}

export interface DeckDefinition {
  id: string;
  name: string;
  cards: DeckCard[];
}

export const decks: DeckDefinition[] = [
  {
    id: "major",
    name: "Major Arcana",
    cards: [
      { id: "00-fool",             name: "The Fool",             image: "/cards/major/00-fool.png",             emotion: "serene"   },
      { id: "01-magician",         name: "The Magician",         image: "/cards/major/01-magician.png",         emotion: "ascended" },
      { id: "02-high-priestess",   name: "The High Priestess",   image: "/cards/major/02-high-priestess.png",   emotion: "sorrow"   },
      { id: "03-empress",          name: "The Empress",          image: "/cards/major/03-empress.png",          emotion: "serene"   },
      { id: "04-emperor",          name: "The Emperor",          image: "/cards/major/04-emperor.png",          emotion: "fierce"   },
      { id: "05-hierophant",       name: "The Hierophant",       image: "/cards/major/05-hierophant.png",       emotion: "serene"   },
      { id: "06-lovers",           name: "The Lovers",           image: "/cards/major/06-lovers.png",           emotion: "serene"   },
      { id: "07-chariot",          name: "The Chariot",          image: "/cards/major/07-chariot.png",          emotion: "fierce"   },
      { id: "08-strength",         name: "Strength",             image: "/cards/major/08-strength.png",         emotion: "fierce"   },
      { id: "09-hermit",           name: "The Hermit",           image: "/cards/major/09-hermit.png",           emotion: "sorrow"   },
      { id: "10-wheel-of-fortune", name: "Wheel of Fortune",     image: "/cards/major/10-wheel-of-fortune.png", emotion: "ascended" },
      { id: "11-justice",          name: "Justice",              image: "/cards/major/11-justice.png",          emotion: "serene"   },
      { id: "12-hanged-man",       name: "The Hanged Man",       image: "/cards/major/12-hanged-man.png",       emotion: "sorrow"   },
      { id: "13-death",            name: "Death",                image: "/cards/major/13-death.png",            emotion: "sorrow"   },
      { id: "14-temperance",       name: "Temperance",           image: "/cards/major/14-temperance.png",       emotion: "serene"   },
      { id: "15-devil",            name: "The Devil",            image: "/cards/major/15-devil.png",            emotion: "fierce"   },
      { id: "16-tower",            name: "The Tower",            image: "/cards/major/16-tower.png",            emotion: "fierce"   },
      { id: "17-star",             name: "The Star",             image: "/cards/major/17-star.png",             emotion: "ascended" },
      { id: "18-moon",             name: "The Moon",             image: "/cards/major/18-moon.png",             emotion: "sorrow"   },
      { id: "19-sun",              name: "The Sun",              image: "/cards/major/19-sun.png",              emotion: "ascended" },
      { id: "20-judgement",        name: "Judgement",            image: "/cards/major/20-judgement.png",        emotion: "ascended" },
      { id: "21-world",            name: "The World",            image: "/cards/major/21-world.png",            emotion: "ascended" },
    ],
  },

  {
    id: "seraphine",
    name: "Seraphine Deck",
    cards: [
      {
        id: "seraphine_star",
        name: "Star of Seraphine",
        image: "/cards/major/17-star.png",
        emotion: "ascended",
      },
      {
        id: "seraphine_veil",
        name: "Veil of Echoes",
        image: "/cards/major/18-moon.png",
        emotion: "sorrow",
      },
    ],
  },
];
