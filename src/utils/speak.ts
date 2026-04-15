// speak.ts — Seraphine ElevenLabs Kess‑Hybrid Voice Engine
// Drop-in replacement for your existing file

// ------------------------------------------------------------
// 1. ElevenLabs API config
// ------------------------------------------------------------
const ELEVEN_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const SERAPHINE_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

// ------------------------------------------------------------
// 2. Emotion → voice style mapping (Kess-hybrid)
// ------------------------------------------------------------
const emotionStyle: Record<string, string> = {
  serene: "calm",
  fierce: "tense",
  sorrow: "melancholic",
  ascended: "mysterious"
};

// ------------------------------------------------------------
// 3. ElevenLabs request (Kess-like synthetic tuning)
// ------------------------------------------------------------
async function speakWithElevenLabs(text: string, emotion?: string) {
  if (!ELEVEN_API_KEY || !SERAPHINE_VOICE_ID) {
    console.warn("ElevenLabs not configured — falling back to browser voice.");
    return false;
  }

  try {
    const style = emotionStyle[emotion || "serene"] || "calm";

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${SERAPHINE_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.15,          // more synthetic, less natural
            similarity_boost: 0.55,   // slight robotic edge
            style: style,             // emotion-driven
            use_speaker_boost: false, // removes human warmth

            // Kess-like synthetic resonance
            pitch: 1.12,
            speed: 0.96,
            volume: 0.92,

            // subtle vocoder shimmer
            exaggeration: 0.35
          },
        }),
      }
    );

    if (!response.ok) throw new Error("ElevenLabs request failed");

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    audio.play();

    return true;
  } catch (err) {
    console.error("ElevenLabs error:", err);
    return false;
  }
}

// ------------------------------------------------------------
// 4. Browser fallback (if ElevenLabs fails)
// ------------------------------------------------------------
function fallbackBrowserVoice(text: string, emotion?: string) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);

  // Pick a feminine voice
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    /female|woman|zira|eva|susan|sara/i.test(v.name)
  );
  utter.voice = preferred || voices[0];

  // Emotional shaping
  switch (emotion) {
    case "serene":
      utter.pitch = 1.3;
      utter.rate = 0.9;
      break;
    case "fierce":
      utter.pitch = 0.9;
      utter.rate = 1.15;
      break;
    case "sorrow":
      utter.pitch = 0.75;
      utter.rate = 0.85;
      break;
    case "ascended":
      utter.pitch = 1.45;
      utter.rate = 0.95;
      break;
    default:
      utter.pitch = 1.0;
      utter.rate = 1.0;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ------------------------------------------------------------
// 5. Main speak() function
// ------------------------------------------------------------
export async function speak(text: string, emotion?: string) {
  const success = await speakWithElevenLabs(text, emotion);

  if (!success) fallbackBrowserVoice(text, emotion);
}
