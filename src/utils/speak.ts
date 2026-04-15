// speak.ts — upgraded mystical voice engine

export function speak(text: string, emotion?: string) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance();

  // Add SSML‑style pacing manually
  const mysticalText = text
    .replace(/\. /g, "... ")
    .replace(/,/g, ", ")
    .replace(/:/g, " — ")
    .replace(/;/g, " — ");

  utter.text = mysticalText;

  // Pick a female voice if available
  const voices = speechSynthesis.getVoices();
  const voice =
    voices.find((v) => v.name.toLowerCase().includes("female")) ||
    voices.find((v) => v.name.toLowerCase().includes("woman")) ||
    voices.find((v) => v.name.toLowerCase().includes("zira")) ||
    voices[0];

  utter.voice = voice;

  // Emotion physics → voice tuning
  switch (emotion) {
    case "serene":
      utter.pitch = 1.25;
      utter.rate = 0.92;
      utter.volume = 0.95;
      break;

    case "fierce":
      utter.pitch = 0.92;
      utter.rate = 1.12;
      utter.volume = 1.0;
      break;

    case "sorrow":
      utter.pitch = 0.78;
      utter.rate = 0.85;
      utter.volume = 0.88;
      break;

    case "ascended":
      utter.pitch = 1.35;
      utter.rate = 0.97;
      utter.volume = 0.92;
      break;

    default:
      utter.pitch = 1.0;
      utter.rate = 1.0;
      utter.volume = 1.0;
  }

  // Add mystical pauses
  utter.onstart = () => {
    utter.text = mysticalText.replace(/…/g, "...");
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
