// src/utils/drawSpread.ts

import { drawCard } from "./drawCard";

export function drawSpread(type: "one" | "three" | "celtic") {
  if (type === "one") {
    return [drawCard("major")];
  }

  if (type === "three") {
    return [
      { ...drawCard("major"), position: "past" },
      { ...drawCard("major"), position: "present" },
      { ...drawCard("major"), position: "future" },
    ];
  }

  if (type === "celtic") {
    return [
      { ...drawCard("major"), position: "present" },
      { ...drawCard("major"), position: "challenge" },
      { ...drawCard("major"), position: "past" },
      { ...drawCard("major"), position: "future" },
      { ...drawCard("major"), position: "above" },
      { ...drawCard("major"), position: "below" },
      { ...drawCard("major"), position: "self" },
      { ...drawCard("major"), position: "environment" },
      { ...drawCard("major"), position: "hopes" },
      { ...drawCard("major"), position: "outcome" },
    ];
  }

  return [];
}
