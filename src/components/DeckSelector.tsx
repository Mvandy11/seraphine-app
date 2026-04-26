// src/components/DeckSelector.tsx
// Supports two modes:
//   1. Vault mode  — no options prop → shows actual decks from deckIndex
//   2. Oracle mode — pass options prop → shows custom pool choices

import { decks } from "@/data/deckIndex";

interface SelectOption {
  id: string;
  label: string;
}

interface DeckSelectorProps {
  active: string;
  onChange: (id: string) => void;
  /** Optional explicit option list (used by Oracle reading for 7-pool mode). */
  options?: SelectOption[];
}

export default function DeckSelector({ active, onChange, options }: DeckSelectorProps) {
  const items: SelectOption[] = options
    ? options
    : decks.map((d) => ({ id: d.id, label: d.name }));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              border: isActive
                ? "1px solid rgba(167,139,250,0.8)"
                : "1px solid rgba(255,255,255,0.15)",
              background: isActive
                ? "rgba(124,58,237,0.45)"
                : "rgba(255,255,255,0.07)",
              color: "white",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: isActive ? 600 : 400,
              letterSpacing: "0.02em",
              boxShadow: isActive
                ? "0 0 18px rgba(124,58,237,0.55)"
                : "none",
              transition: "all 0.18s ease",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
