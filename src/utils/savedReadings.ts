// ------------------------------------------------------------
// ⭐ NEW FILE — /src/utils/savedReadings.ts
// ------------------------------------------------------------

export type SavedReadingType = "oracle" | "daily";

export interface SavedReading {
  id: string;
  type: SavedReadingType;
  timestamp: number;
  date: string;
  question?: string;
  spread?: any[] | null;
  card?: any | null;
  emotion?: string | null;
  message: string;
}

const STORAGE_KEY = "seraphine_saved_readings";

export function getSavedReadings(): SavedReading[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addSavedReading(reading: Omit<SavedReading, "id">): SavedReading {
  const existing = getSavedReadings();
  const full: SavedReading = {
    ...reading,
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
  };
  const updated = [full, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return full;
}

export function clearSavedReadings() {
  localStorage.removeItem(STORAGE_KEY);
}
