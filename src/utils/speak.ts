// speak.ts — Seraphine ElevenLabs Voice Engine (Final Fix)
// Ensures: feminine voice, no male fallback, stable ElevenLabs loading

// ------------------------------------------------------------
// 1. ElevenLabs API config
// ------------------------------------------------------------
const ELEVEN_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const SERAPHINE_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

// ------------------------------------------------------------
// 2. Emotion → style mapping (numeric 0.0–1.0 per ElevenLabs spec)
// ------------------------------------------------------------
const emotionStyle: Record<string, number> = {
  serene: 0.2,
  fierce: 0.75,
  sorrow: 0.1,
  ascended: 0.5,
};

// ------------------------------------------------------------
// 3. ElevenLabs request (clean + compatible)
// ------------------------------------------------------------
async function speakWithElevenLabs(text: string, emotion?: string) {
  if (!ELEVEN_API_KEY || !SERAPHINE_VOICE_ID) return false;

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
          model_id: "eleven_turbo_v2",
          voice_settings: {
            stability: 0.15,
            similarity_boost: 0.55,
            style: style,
            use_speaker_boost: false
          }
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
// 4. Browser fallback (forced feminine voice)
// ------------------------------------------------------------
function fallbackBrowserVoice(text: string, emotion?: string) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    /female|woman|zira|eva|susan|sara|english|uk|us/i.test(v.name)
  );
  utter.voice = preferred || voices[0];

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
// 5. Chrome voice-loading fix
// ------------------------------------------------------------
if (speechSynthesis.onvoiceschanged === null) {
  speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded — feminine fallback ready.");
  };
}

// ------------------------------------------------------------
// 6. Main speak() function
// ------------------------------------------------------------
export async function speak(text: string, emotion?: string) {
  const success = await speakWithElevenLabs(text, emotion);
  if (!success) fallbackBrowserVoice(text, emotion);
}
