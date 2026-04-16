// src/hooks/useSeraphine.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { resolveDisplayName, getDialogue, ART_SLOTS,
         type ComponentKey, type DialogueState } from '../lib/seraphineDialogue';

export function useSeraphine(component: ComponentKey) {
  const [name, setName] = useState('Traveler');
  const [nameReady, setNameReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!cancelled) {
        setName(resolveDisplayName(user));
        setNameReady(true);
      }
    }).catch(() => { if (!cancelled) setNameReady(true); });
    return () => { cancelled = true; };
  }, []);

  const speak = (state: DialogueState) => getDialogue(component, state, name);
  const artSlots = ART_SLOTS[component] ?? [];

  return { name, nameReady, speak, artSlots };
}
