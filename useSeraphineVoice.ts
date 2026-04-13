// src/hooks/useSeraphineVoice.ts
import { supabase } from "@/lib/supabaseClient";

export const useSeraphineVoice = () => {
  // Example placeholder — adjust to your real logic
  const speak = async (text: string) => {
    const { data, error } = await supabase.functions.invoke("seraphine-voice", {
      body: { text }
    });

    return { data, error };
  };

  return { speak };
};
