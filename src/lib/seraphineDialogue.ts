// src/lib/seraphineDialogue.ts

// ─── Name Resolution ─────────────────────────────────────────
export function resolveDisplayName(user: {
  user_metadata?: { display_name?: string };
  email?: string;
} | null): string {
  if (!user) return 'Traveler';
  const displayName = user.user_metadata?.display_name?.trim();
  if (displayName) return displayName;
  const email = user.email;
  if (email) {
    const local = email.split('@')[0];
    const cleaned = local.replace(/[._]/g, ' ').replace(/\d+/g, '').trim();
    if (cleaned.length > 1) {
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).split(' ')[0];
    }
  }
  return 'Traveler';
}

// ─── Dialogue Entry Type ────────────────────────────────────
export interface DialogueEntry {
  text: string;
  useName: boolean;
  isSubtle?: boolean;
  icon?: string;
}

// ─── Dialogue Maps ───────────────────────────────────────────
// {name} is injected at runtime when useName is true

const DIALOGUE_MAP = {
  welcomePremium: {
    loading: { text: 'Attuning to your essence...', useName: false, isSubtle: true, icon: '🔮' },
    active:  { text: '{name}, the flames have recognized you. Welcome to the inner circle.', useName: true, icon: '🔥' },
    empty:   { text: 'The path awaits you, {name}. Your flame has yet to be kindled.', useName: true, icon: '✨' },
  },
  premiumGate: {
    locked:  { text: '{name}, this realm requires deeper attunement to enter.', useName: true, icon: '🔒' },
    loading: { text: 'Reading the wards...', useName: false, isSubtle: true },
  },
  billingHistory: {
    active:  { text: 'Your chronicle of patronage, {name}.', useName: true, isSubtle: true },
    empty:   { text: 'No records yet inscribed upon the ledger.', useName: false, isSubtle: true },
    loading: { text: 'Consulting the archives...', useName: false, isSubtle: true },
  },
  subscribeTab: {
    greeting: { text: '{name}, choose the flame that calls to you.', useName: true, icon: '🔥' },
    active:   { text: 'Each tier unlocks deeper layers of the mythic experience.', useName: false, isSubtle: true },
  },
  manageSubscription: {
    active:  { text: 'Your sacred bond is strong, {name}.', useName: true, isSubtle: true },
    warning: { text: 'The flame dims... but it never truly dies.', useName: false, icon: '🕯️' },
    success: { text: 'It is done. The realm acknowledges your decision.', useName: false },
  },
} as const;

export type DialogueComponent = keyof typeof DIALOGUE_MAP;
export type DialogueState<C extends DialogueComponent> = keyof (typeof DIALOGUE_MAP)[C];

// ─── Dialogue Resolver ───────────────────────────────────────
export function getDialogue<C extends DialogueComponent>(
  component: C,
  state: DialogueState<C>,
  name: string = 'Traveler',
): DialogueEntry {
  const raw = DIALOGUE_MAP[component][state] as DialogueEntry;
  const text = raw.useName ? raw.text.replace('{name}', name) : raw.text;
  return { ...raw, text };
}
