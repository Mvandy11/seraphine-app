// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// React hook that binds Supabase auth → Seraphine's voice engine.
// Resolves the user's display name once, then exposes speak() and artSlots.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { resolveDisplayName, getDialogue, ART_SLOTS, } from '../lib/seraphineDialogue';
export function useSeraphine(component) {
    const [name, setName] = useState('Traveler');
    const [nameReady, setNameReady] = useState(false);
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
    const speak = (state) => {
        return getDialogue(component, state, name);
    };
    const artSlots = ART_SLOTS[component] ?? [];
    return { name, nameReady, speak, artSlots };
}
