// voiceWarmup.ts
// Ensures feminine voice is loaded BEFORE Seraphine speaks
// Prevents Chrome/Edge from defaulting to male robotic voice

let voicesLoaded = false;

export function warmupVoices() {
  return new Promise<void>((resolve) => {
    // If voices already loaded, resolve immediately
    if (voicesLoaded) {
      resolve();
      return;
    }

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();

      if (voices.length > 0) {
        voicesLoaded = true;
        console.log("🔮 Seraphine Voice Warm‑Up Complete — feminine voices ready.");
        resolve();
      }
    };

    // Try immediately
    loadVoices();

    // Chrome requires this event
    speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };

    // Safety timeout fallback
    setTimeout(() => {
      voicesLoaded = true;
      console.log("🔮 Seraphine Voice Warm‑Up Timeout — continuing anyway.");
      resolve();
    }, 1500);
  });
}
