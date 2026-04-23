// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useSeraphineOracle — React hook for the Seraphine oracle engine.
// Wraps generateSeraphineReading + getSeraphineDaily with
// loading state, user context, and birthday archetype integration.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import {
  generateSeraphineReading,
  getSeraphineDaily,
  SERAPHINE_DECK,
  type SeraphineReading,
  type SeraphineCard,
} from "@/lib/seraphineOracle";
import { getBirthdayArchetype, type BirthdayArchetype } from "@/utils/birthdayEngine";

function loadBirthday(): BirthdayArchetype | null {
  try {
    const raw = localStorage.getItem("seraphine_birthday");
    if (!raw) return null;
    const { month, day } = JSON.parse(raw);
    if (!month || !day) return null;
    return getBirthdayArchetype(Number(month), Number(day));
  } catch {
    return null;
  }
}

interface UseSeraphineOracleReturn {
  reading: SeraphineReading | null;
  daily: { card: SeraphineCard; isNew: boolean } | null;
  isDrawing: boolean;
  deck: SeraphineCard[];
  drawReading: () => void;
  drawDaily: () => void;
  clearReading: () => void;
}

export function useSeraphineOracle(): UseSeraphineOracleReturn {
  const { user } = useAppContext();
  const userId = user?.id ?? "anon";

  const [reading, setReading] = useState<SeraphineReading | null>(null);
  const [daily, setDaily] = useState<{ card: SeraphineCard; isNew: boolean } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawReading = useCallback(() => {
    setIsDrawing(true);
    // Slight delay for dramatic effect
    setTimeout(() => {
      const birthday = loadBirthday();
      const result = generateSeraphineReading(userId, birthday);
      setReading(result);
      setIsDrawing(false);
    }, 800);
  }, [userId]);

  const drawDaily = useCallback(() => {
    const birthday = loadBirthday();
    const result = getSeraphineDaily(userId, birthday);
    setDaily(result);
  }, [userId]);

  const clearReading = useCallback(() => {
    setReading(null);
  }, []);

  return {
    reading,
    daily,
    isDrawing,
    deck: SERAPHINE_DECK,
    drawReading,
    drawDaily,
    clearReading,
  };
}
