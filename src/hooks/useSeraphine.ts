// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// React hook that binds Supabase auth → Seraphine's voice engine.
// Resolves the user's display name once, then exposes speak() and artSlots.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  resolveDisplayName,
  getDialogue,
  ART_SLOTS,
  type ComponentKey,
  type DialogueState,
  type DialogueLine,
  type ArtSlot,
} from '../lib/seraphineDialogue';

interface UseSeraphineReturn {
  /** Resolved display name — "Michael", parsed first name, or "Traveler" */
  name: string;
  /** True once user data has been fetched and name resolved */
  nameReady: boolean;
  /** Get Seraphine's dialogue line for a given state */
  speak: (state: DialogueState) => DialogueLine | null;
  /** Art slot definitions for this component */
  artSlots: ArtSlot[];
}

export function useSeraphine(component: ComponentKey): UseSeraphineReturn {
  const [name, setName] = useState<string>('Traveler');
  const [nameReady, setNameReady] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (!cancelled) {
          setName(resolveDisplayName(user));
          setNameReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNameReady(true);
          // Falls back to "Traveler" — graceful degradation
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const speak = (state: DialogueState): DialogueLine | null => {
    return getDialogue(component, state, name);
  };

  const artSlots = ART_SLOTS[component] ?? [];

  return { name, nameReady, speak, artSlots };
}
