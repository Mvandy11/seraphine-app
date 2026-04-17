// ------------------------------------------------------------
// FILE: /src/utils/birthdayEngine.ts
// Seraphine's Birthday → Archetype Engine
// ------------------------------------------------------------
export function calculateLifePath(month, day) {
    const sumDigits = (n) => n < 10 ? n : sumDigits(n.toString().split("").reduce((a, b) => a + Number(b), 0));
    return sumDigits(month + day);
}
export function getElementalAura(month) {
    if (month === 12 || month === 1 || month === 2)
        return "Winter / Shadow";
    if (month >= 3 && month <= 5)
        return "Spring / Growth";
    if (month >= 6 && month <= 8)
        return "Summer / Fire";
    return "Autumn / Wisdom";
}
const majorArcana = [
    "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength",
    "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
    "Death", "Temperance", "The Devil", "The Tower",
    "The Star", "The Moon", "The Sun", "Judgement", "The World", "The Fool"
];
export function getBirthArcana(day) {
    const index = (day - 1) % majorArcana.length;
    return majorArcana[index];
}
export function generateArchetypeSummary(lifePath, aura, arcana) {
    return `
Your path number is **${lifePath}**, shaping your inner rhythm and emotional gravity.
Your elemental aura is **${aura}**, influencing how energy moves through your life.
Your birth arcana is **${arcana}**, the mythic force that shadows your destiny.
  `.trim();
}
export function getBirthdayArchetype(month, day) {
    const lifePath = calculateLifePath(month, day);
    const elementalAura = getElementalAura(month);
    const birthArcana = getBirthArcana(day);
    return {
        lifePath,
        elementalAura,
        birthArcana,
        summary: generateArchetypeSummary(lifePath, elementalAura, birthArcana),
    };
}
export function buildBirthdayPromptContext(birthday) {
    if (!birthday)
        return "";
    return `
User Birthday Archetype:
- Life Path: ${birthday.lifePath}
- Elemental Aura: ${birthday.elementalAura}
- Birth Arcana: ${birthday.birthArcana}

Interpret the reading through this lens.
`.trim();
}
