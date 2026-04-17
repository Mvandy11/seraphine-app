// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Seraphine Voice Engine — Dialogue maps, name resolution, art slots
// Single source of truth for every Seraphine line across the platform.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ─── Name Resolution ─────────────────────────────────────────
// Fallback chain: display_name → first name from email → "Traveler"
export function resolveDisplayName(user) {
    if (!user)
        return 'Traveler';
    const displayName = user.user_metadata?.display_name?.trim();
    if (displayName)
        return displayName;
    const email = user.email;
    if (email) {
        const local = email.split('@')[0];
        const cleaned = local
            .replace(/[._]/g, ' ')
            .replace(/\d+/g, '')
            .trim();
        if (cleaned.length > 1) {
            const firstName = cleaned.split(' ')[0];
            return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        }
    }
    return 'Traveler';
}
// ─── Dialogue Map ────────────────────────────────────────────
// {name} is replaced at runtime via getDialogue()
const DIALOGUE_MAP = {
    welcomePremium: {
        loading: {
            text: 'Attuning to your essence...',
            useName: false,
            isSubtle: true,
            icon: '🔮',
        },
        active: {
            text: '{name}, the flames have recognized you. Welcome to the inner circle.',
            useName: true,
            icon: '🔥',
        },
        empty: {
            text: 'The path awaits you, {name}. Your flame has yet to be kindled.',
            useName: true,
            icon: '✨',
        },
    },
    premiumGate: {
        locked: {
            text: '{name}, this realm requires deeper attunement to enter.',
            useName: true,
            icon: '🔒',
        },
        loading: {
            text: 'Reading the wards...',
            useName: false,
            isSubtle: true,
        },
    },
    billingHistory: {
        active: {
            text: 'Your chronicle of patronage, {name}.',
            useName: true,
            isSubtle: true,
        },
        empty: {
            text: 'No records yet inscribed upon the ledger.',
            useName: false,
            isSubtle: true,
        },
        loading: {
            text: 'Consulting the archives...',
            useName: false,
            isSubtle: true,
        },
    },
    subscribeTab: {
        greeting: {
            text: '{name}, choose the flame that calls to you.',
            useName: true,
            icon: '🔥',
        },
        active: {
            text: 'Each tier unlocks deeper layers of the mythic experience.',
            useName: false,
            isSubtle: true,
        },
    },
    manageSubscription: {
        active: {
            text: 'Your sacred bond is strong, {name}.',
            useName: true,
            isSubtle: true,
        },
        warning: {
            text: 'The flame dims... but it never truly dies.',
            useName: false,
            icon: '🕯️',
        },
        success: {
            text: 'It is done. The realm acknowledges your decision.',
            useName: false,
        },
    },
};
// ─── Dialogue Resolver ───────────────────────────────────────
export function getDialogue(component, state, name) {
    const stateMap = DIALOGUE_MAP[component];
    if (!stateMap)
        return null;
    const line = stateMap[state];
    if (!line)
        return null;
    return {
        ...line,
        text: line.useName ? line.text.replace(/\{name\}/g, name) : line.text,
    };
}
// ─── Art Slot Definitions ────────────────────────────────────
// Each component declares named positions for cinematic art.
// CinematicArtSlot renders the fallback gradient until imageUrl is provided.
export const ART_SLOTS = {
    welcomePremium: [
        {
            id: 'welcome-hero',
            label: 'Full-width cinematic backdrop',
            fallbackGradient: 'linear-gradient(180deg, rgba(124,58,237,0.12) 0%, rgba(10,10,18,0) 100%)',
            position: 'hero',
        },
        {
            id: 'welcome-avatar',
            label: 'Seraphine portrait',
            fallbackGradient: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
            position: 'avatar',
        },
    ],
    subscribeTab: [
        {
            id: 'subscribe-hero',
            label: 'Three ascending flames',
            fallbackGradient: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(192,132,252,0.06) 100%)',
            position: 'hero',
        },
        {
            id: 'subscribe-avatar',
            label: 'Seraphine guiding',
            fallbackGradient: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            position: 'avatar',
        },
    ],
    premiumGate: [
        {
            id: 'gate-accent',
            label: 'Runic ward overlay',
            fallbackGradient: 'linear-gradient(180deg, rgba(124,58,237,0.06) 0%, rgba(10,10,18,0.8) 100%)',
            position: 'accent',
        },
    ],
    billingHistory: [
        {
            id: 'billing-background',
            label: 'Parchment/ledger texture',
            fallbackGradient: 'linear-gradient(180deg, rgba(74,69,101,0.04) 0%, rgba(10,10,18,0) 100%)',
            position: 'background',
        },
    ],
    manageSubscription: [
        {
            id: 'manage-accent',
            label: 'Glowing subscription sigil',
            fallbackGradient: 'radial-gradient(circle at 50% 30%, rgba(124,58,237,0.1) 0%, transparent 60%)',
            position: 'accent',
        },
    ],
};
