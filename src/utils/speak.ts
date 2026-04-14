// src/utils/speak.ts

export function speak(text: string, emotion?: string) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();
  const female =
    voices.find((v) => v.name.toLowerCase().includes("female")) ||
    voices.find((v) => v.name.toLowerCase().includes("woman")) ||
    voices.find((v) => v.name.toLowerCase().includes("zira")) ||
    voices[0];

  utter.voice = female;

  switch (emotion) {
    case "serene":
      utter.rate = 0.9;
      utter.pitch = 1.2;
      break;
    case "fierce":
      utter.rate = 1.1;
      utter.pitch = 0.9;
      break;
    case "sorrow":
      utter.rate = 0.85;
      utter.pitch = 0.8;
      break;
    case "ascended":
      utter.rate = 1.0;
      utter.pitch = 1.3;
      break;
    default:
      utter.rate = 1.0;
      utter.pitch = 1.0;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
