// ------------------------------------------------------------
// ⭐ NEW FILE — /src/utils/savedReadings.ts
// ------------------------------------------------------------
const STORAGE_KEY = "seraphine_saved_readings";
export function getSavedReadings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
        return [];
    try {
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}
export function addSavedReading(reading) {
    const existing = getSavedReadings();
    const full = {
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
