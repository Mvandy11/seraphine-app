// src/hooks/useSeraphine.ts
// Binds Supabase auth → resolves display name → returns Seraphine's dialogue lines

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  resolveDisplayName,
  getDialogue,
  DialogueComponent,
  DialogueState,
} from "@/lib/seraphineDialogue";
import type { DialogueEntry } from "@/lib/seraphineDialogue";

interface SeraphineHook {
  name: string;
  getLine: <C extends DialogueComponent>(
    component: C,
    state: DialogueState<C>,
  ) => DialogueEntry;
}

export function useSeraphine(): SeraphineHook {
  const [name, setName] = useState<string>("Traveler");

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setName(resolveDisplayName(data.user));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setName(resolveDisplayName(session?.user ?? null));
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function getLine<C extends DialogueComponent>(
    component: C,
    state: DialogueState<C>,
  ): DialogueEntry {
    return getDialogue(component, state, name);
  }

  return { name, getLine };
}
