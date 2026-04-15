import { useEffect, useState } from "react";
import { drawCard } from "@/utils/drawCard";
import { cardEmotions } from "@/data/emotions";

export function useDailyCard() {
  const [daily, setDaily] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("dailyCard");
    const today = new Date().toISOString().split("T")[0];

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setDaily(parsed);
        return;
      }
    }

    const card = drawCard("major");
    const emotion = cardEmotions[card.id];
    const message = `Seraphine reveals ${card.name} as your guiding force today.`;

    const payload = {
      date: today,
      card,
      emotion,
      message,
    };

    localStorage.setItem("dailyCard", JSON.stringify(payload));
    setDaily(payload);
  }, []);

  return daily;
}
