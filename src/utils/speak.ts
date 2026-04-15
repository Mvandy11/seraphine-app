// speak.ts — Seraphine's upgraded mystical voice engine

// ------------------------------------------------------------
// 1. Strong feminine voice selection
// ------------------------------------------------------------
function getSeraphineVoice() {
  const voices = speechSynthesis.getVoices();

  // Stronger matching for feminine voices across browsers
  const preferred = voices.find(v =>
    /female|woman|zira|susan|eva|sara|english|uk|us/i.test(v.name)
  );

  // Fallback: highest pitch voice available
  const fallback = voices.sort((a, b) => (b.pitch || 1) - (a.pitch || 1))[0];

  return preferred || fallback || voices[0];
}

// ------------------------------------------------------------
// 2. Main speak() function with emotional physics
// ------------------------------------------------------------
export function speak(text: string, emotion?: string) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance();

  // Base mystical cadence
  let mystical = text
    .replace(/\. /g, "... ")
    .replace(/,/g, ", ")
    .replace(/:/g, " — ")
    .replace(/;/g, " — ");

  // ------------------------------------------------------------
  // 3. Emotional physics → voice shaping
  // ------------------------------------------------------------
  switch (emotion) {
    case "serene":
      utter.pitch = 1.35;
      utter.rate = 0.88;
      utter.volume = 0.95;
      mystical = "… " + mystical.replace(/\./g, "…");
      break;

    case "fierce":
      utter.pitch = 0.92;
      utter.rate = 1.18;
      utter.volume = 1.0;
      mystical = mystical.replace(/,/g, " —");
      break;

    case "sorrow":
      utter.pitch = 0.75;
      utter.rate = 0.82;
      utter.volume = 0.85;
      mystical = mystical.replace(/ /g, "  ");
      break;

    case "ascended":
      utter.pitch = 1.45;
      utter.rate = 0.95;
      utter.volume = 0.9;
      mystical = mystical
        .replace(/a/g, "aa")
        .replace(/e/g, "ee")
        .replace(/o/g, "oo");
      break;

    default:
      utter.pitch = 1.0;
      utter.rate = 1.0;
      utter.volume = 1.0;
  }

  utter.text = mystical;

  // ------------------------------------------------------------
  // 4. Apply feminine voice
  // ------------------------------------------------------------
  utter.voice = getSeraphineVoice();

  // ------------------------------------------------------------
  // 5. Chrome voice-loading fix
  // ------------------------------------------------------------
  if (speechSynthesis.onvoiceschanged === null) {
    speechSynthesis.onvoiceschanged = () => {
      console.log("Seraphine voices loaded");
    };
  }

  // ------------------------------------------------------------
  // 6. Speak
  // ------------------------------------------------------------
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
