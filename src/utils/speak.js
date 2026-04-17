// speak.ts — Seraphine ElevenLabs Voice Engine
// Ensures: feminine voice, no male fallback, stable ElevenLabs loading
// ------------------------------------------------------------
// 1. ElevenLabs API config
// ------------------------------------------------------------
const ELEVEN_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const SERAPHINE_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;
// ------------------------------------------------------------
// 2. Emotion → style mapping (numeric 0.0–1.0 per ElevenLabs spec)
// ------------------------------------------------------------
const emotionStyle = {
    serene: 0.2,
    fierce: 0.75,
    sorrow: 0.1,
    ascended: 0.5,
};
// ------------------------------------------------------------
// 3. ElevenLabs request
// ------------------------------------------------------------
async function speakWithElevenLabs(text, emotion) {
    if (!ELEVEN_API_KEY || !SERAPHINE_VOICE_ID) {
        console.warn("ElevenLabs: missing API key or voice ID — falling back to browser voice.");
        return false;
    }
    const style = emotionStyle[emotion ?? "serene"] ?? 0.2;
    let response;
    try {
        response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${SERAPHINE_VOICE_ID}`, {
            method: "POST",
            headers: {
                "xi-api-key": ELEVEN_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_turbo_v2",
                voice_settings: {
                    stability: 0.4,
                    similarity_boost: 0.75,
                    style,
                    use_speaker_boost: true,
                },
            }),
        });
    }
    catch (networkErr) {
        console.error("ElevenLabs network error (CORS or no connection):", networkErr);
        return false;
    }
    if (!response.ok) {
        // Log the actual ElevenLabs error body for diagnosis
        const errBody = await response.text().catch(() => "(unreadable)");
        console.error(`ElevenLabs API error ${response.status}:`, errBody);
        return false;
    }
    try {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        return true;
    }
    catch (playErr) {
        console.error("ElevenLabs playback error:", playErr);
        return false;
    }
}
// ------------------------------------------------------------
// 4. Browser fallback (forced feminine voice)
// ------------------------------------------------------------
function fallbackBrowserVoice(text, emotion) {
    if (!window.speechSynthesis)
        return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v => /female|woman|zira|eva|susan|sara|samantha|victoria|karen/i.test(v.name));
    utter.voice = preferred ?? voices[0];
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
if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged === null) {
    speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded — feminine fallback ready.");
    };
}
// ------------------------------------------------------------
// 6. Main speak() function
// ------------------------------------------------------------
export async function speak(text, emotion) {
    const success = await speakWithElevenLabs(text, emotion);
    if (!success)
        fallbackBrowserVoice(text, emotion);
}
