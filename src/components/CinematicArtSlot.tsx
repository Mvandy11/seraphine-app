// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Art placeholder system — renders fallback gradients now,
// swaps to real cinematic art assets when imageUrl is provided.
// Dev mode shows labeled slot identifiers for asset mapping.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React from 'react';
import type { ArtSlot } from '@/lib/seraphineDialogue';

interface CinematicArtSlotProps {
  /** Art slot definition from seraphineDialogue.ts */
  slot: ArtSlot;
  /** Override height (e.g., '320px', '100%') */
  height?: string;
  /** When provided, replaces the fallback gradient with the real image */
  imageUrl?: string;
  /** Show dev label overlay identifying the slot (default: true in development) */
  showDevLabel?: boolean;
  /** Optional CSS overrides */
  style?: React.CSSProperties;
  /** Children rendered on top of the art layer */
  children?: React.ReactNode;
}

const CinematicArtSlot: React.FC<CinematicArtSlotProps> = ({
  slot,
  height = '240px',
  imageUrl,
  showDevLabel,
  style,
  children,
}) => {
  const isDev =
    showDevLabel ?? (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');

  const positionStyles = POSITION_DEFAULTS[slot.position] ?? {};

  const containerStyle: React.CSSProperties = {
    ...positionStyles,
    height,
    background: imageUrl ? 'none' : slot.fallbackGradient,
    position: 'relative' as const,
    overflow: 'hidden',
    borderRadius: slot.position === 'avatar' ? '50%' : '0',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {/* Real image layer */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={slot.label}
          style={imageStyles}
          loading="lazy"
        />
      )}

      {/* Dev label overlay */}
      {isDev && !imageUrl && (
        <div style={devLabelStyles}>
          <span style={devLabelBracket}>[{slot.id}]</span>
          <span style={devLabelText}>{slot.label}</span>
        </div>
      )}

      {/* Content rendered on top */}
      {children && (
        <div style={contentOverlayStyles}>{children}</div>
      )}
    </div>
  );
};

// ─── Position Defaults ───────────────────────────────────────

const POSITION_DEFAULTS: Record<string, React.CSSProperties> = {
  hero: {
    width: '100%',
  },
  avatar: {
    width: '80px',
    height: '80px',
    flexShrink: 0,
  },
  accent: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  background: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
};

const imageStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
};

const devLabelStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem',
  pointerEvents: 'none',
  zIndex: 1,
};

const devLabelBracket: React.CSSProperties = {
  fontSize: '0.7rem',
  fontFamily: "'Fira Code', 'Consolas', monospace",
  color: 'rgba(167, 139, 250, 0.35)',
  letterSpacing: '0.04em',
};

const devLabelText: React.CSSProperties = {
  fontSize: '0.65rem',
  color: 'rgba(139, 128, 176, 0.3)',
  fontStyle: 'italic',
  textAlign: 'center',
  maxWidth: '180px',
};

const contentOverlayStyles: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  width: '100%',
  height: '100%',
};

export default CinematicArtSlot;
