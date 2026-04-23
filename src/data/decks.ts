// src/data/decks.ts

export const decks = {
  major: {
    name: "Major Arcana",
    path: "/cards/major/",
    cards: [
      { id: "00-fool",             name: "The Fool"           },
      { id: "01-magician",         name: "The Magician"       },
      { id: "02-high-priestess",   name: "The High Priestess" },
      { id: "03-empress",          name: "The Empress"        },
      { id: "04-emperor",          name: "The Emperor"        },
      { id: "05-hierophant",       name: "The Hierophant"     },
      { id: "06-lovers",           name: "The Lovers"         },
      { id: "07-chariot",          name: "The Chariot"        },
      { id: "08-strength",         name: "Strength"           },
      { id: "09-hermit",           name: "The Hermit"         },
      { id: "10-wheel-of-fortune", name: "Wheel of Fortune"   },
      { id: "11-justice",          name: "Justice"            },
      { id: "12-hanged-man",       name: "The Hanged Man"     },
      { id: "13-death",            name: "Death"              },
      { id: "14-temperance",       name: "Temperance"         },
      { id: "15-devil",            name: "The Devil"          },
      { id: "16-tower",            name: "The Tower"          },
      { id: "17-star",             name: "The Star"           },
      { id: "18-moon",             name: "The Moon"           },
      { id: "19-sun",              name: "The Sun"            },
      { id: "20-judgement",        name: "Judgement"          },
      { id: "21-world",            name: "The World"          },
    ],
  },

  minor: {
    name: "Minor Arcana",
    path: "/cards/minor/",
    cards: [
      { id: "cups-ace",      name: "Ace of Cups",      image: "/cards/minor/cups/ace.png",      suit: "cups"      },
      { id: "pentacles-ace", name: "Ace of Pentacles", image: "/cards/minor/pentacles/ace.png", suit: "pentacles" },
      { id: "swords-ace",    name: "Ace of Swords",    image: "/cards/minor/swords/ace.png",    suit: "swords"    },
      { id: "wands-ace",     name: "Ace of Wands",     image: "/cards/minor/wands/ace.png",     suit: "wands"     },
    ],
  },
};
