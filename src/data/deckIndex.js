// deckIndex.ts
// Expand this as you add more decks or card art.
export const decks = [
    {
        id: "major",
        name: "Major Arcana",
        cards: [
            {
                id: "the_fool",
                name: "The Fool",
                image: "/cards/major/the_fool.jpg",
                emotion: "serene",
            },
            {
                id: "the_magician",
                name: "The Magician",
                image: "/cards/major/the_magician.jpg",
                emotion: "ascended",
            },
            {
                id: "the_high_priestess",
                name: "The High Priestess",
                image: "/cards/major/the_high_priestess.jpg",
                emotion: "sorrow",
            },
            {
                id: "the_empress",
                name: "The Empress",
                image: "/cards/major/the_empress.jpg",
                emotion: "serene",
            },
            // Add the rest of your Major Arcana here…
        ],
    },
    {
        id: "seraphine",
        name: "Seraphine Deck",
        cards: [
            {
                id: "seraphine_star",
                name: "Star of Seraphine",
                image: "/cards/seraphine/star.jpg",
                emotion: "ascended",
            },
            {
                id: "seraphine_veil",
                name: "Veil of Echoes",
                image: "/cards/seraphine/veil.jpg",
                emotion: "sorrow",
            },
            // Add your custom mythic cards here…
        ],
    },
];
