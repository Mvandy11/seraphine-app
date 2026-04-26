// src/contexts/DeckContext.tsx
// Global deck selection — persists across all pages via localStorage.

import { createContext, useContext, useState, ReactNode } from "react";
import { PoolId } from "@/data/deckIndex";

const STORAGE_KEY = "seraphine_selected_deck";

interface DeckContextValue {
  selectedDeck: PoolId;
  setSelectedDeck: (id: PoolId) => void;
}

const DeckContext = createContext<DeckContextValue | null>(null);

export function DeckProvider({ children }: { children: ReactNode }) {
  const [selectedDeck, setSelectedDeckState] = useState<PoolId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const VALID: PoolId[] = [
      "major1", "major2", "full-major", "minor", "full-tarot", "oracle", "seraphine",
    ];
    return VALID.includes(stored as PoolId) ? (stored as PoolId) : "major1";
  });

  const setSelectedDeck = (id: PoolId) => {
    setSelectedDeckState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <DeckContext.Provider value={{ selectedDeck, setSelectedDeck }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDeckContext() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeckContext must be used inside DeckProvider");
  return ctx;
}
