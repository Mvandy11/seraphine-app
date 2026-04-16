// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Reusable dialogue renderer — glowing avatar orb + Seraphine's text.
// Supports full and subtle (compact) display modes.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React from 'react';
import type { DialogueLine } from '../lib/seraphineDialogue';

interface SeraphineMessageProps {
  /** The dialogue line from speak() — renders nothing if null */
  line: DialogueLine | null;
  /** Override the avatar size in px (default: 40 for full, 28 for subtle) */
  avatarSize?: number;
  /** Optional CSS overrides for the outer container */
  style?: React.CSSProperties;
}

const SeraphineMessage: React.FC<SeraphineMessageProps> = ({
  line,
  avatarSize,
  style,
}) => {
  if (!line) return null;

  const isSubtle = line.isSubtle ?? false;
  const resolvedAvatarSize = avatarSize ?? (isSubtle ? 28 : 40);

  return (
    <div
      style={{
        ...styles.container,
        ...(isSubtle ? styles.containerSubtle : {}),
        ...style,
      }}
    >
      {/* Avatar Orb */}
      <div
        style={{
          ...styles.avatarOrb,
          width: `${resolvedAvatarSize}px`,
          height: `${resolvedAvatarSize}px`,
          ...(isSubtle ? styles.avatarOrbSubtle : {}),
        }}
      >
        <span
          style={{
            ...styles.avatarInner,
            width: `${resolvedAvatarSize * 0.55}px`,
            height: `${resolvedAvatarSize * 0.55}px`,
          }}
        />
      </div>

      {/* Dialogue Content */}
      <div style={styles.textBlock}>
        {!isSubtle && (
          <span style={styles.speakerName}>Seraphine</span>
        )}
        <p
          style={{
            ...styles.dialogueText,
            ...(isSubtle ? styles.dialogueTextSubtle : {}),
          }}
        >
          {line.icon && (
            <span style={styles.icon}>{line.icon} </span>
          )}
          {line.text}
        </p>
      </div>
    </div>
  );
};

// ─── Styles ──────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.85rem',
    padding: '1rem 1.25rem',
    background: 'rgba(124, 58, 237, 0.04)',
    border: '1px solid rgba(124, 58, 237, 0.1)',
    borderRadius: '16px',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    maxWidth: '600px',
  },
  containerSubtle: {
    padding: '0.6rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    gap: '0.6rem',
  },
  avatarOrb: {
    flexShrink: 0,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 40% 35%, rgba(167,139,250,0.35) 0%, rgba(124,58,237,0.15) 60%, transparent 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 12px rgba(124, 58, 237, 0.2)',
    position: 'relative' as const,
  },
  avatarOrbSubtle: {
    boxShadow: '0 0 6px rgba(124, 58, 237, 0.12)',
  },
  avatarInner: {
    borderRadius: '50%',
    background: 'radial-gradient(circle, #c084fc 0%, #7c3aed 100%)',
    display: 'block',
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
    minWidth: 0,
  },
  speakerName: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#a78bfa',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  dialogueText: {
    margin: 0,
    fontSize: '0.95rem',
    lineHeight: 1.55,
    color: '#c4b5fd',
    fontStyle: 'italic',
  },
  dialogueTextSubtle: {
    fontSize: '0.85rem',
    color: '#8b80b0',
  },
  icon: {
    fontStyle: 'normal',
  },
};

export default SeraphineMessage;
