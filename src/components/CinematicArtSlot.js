import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CinematicArtSlot = ({ slot, height = '240px', imageUrl, showDevLabel, style, children, }) => {
    const isDev = showDevLabel ?? (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');
    const positionStyles = POSITION_DEFAULTS[slot.position] ?? {};
    const containerStyle = {
        ...positionStyles,
        height,
        background: imageUrl ? 'none' : slot.fallbackGradient,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: slot.position === 'avatar' ? '50%' : '0',
        ...style,
    };
    return (_jsxs("div", { style: containerStyle, children: [imageUrl && (_jsx("img", { src: imageUrl, alt: slot.label, style: imageStyles, loading: "lazy" })), isDev && !imageUrl && (_jsxs("div", { style: devLabelStyles, children: [_jsxs("span", { style: devLabelBracket, children: ["[", slot.id, "]"] }), _jsx("span", { style: devLabelText, children: slot.label })] })), children && (_jsx("div", { style: contentOverlayStyles, children: children }))] }));
};
// ─── Position Defaults ───────────────────────────────────────
const POSITION_DEFAULTS = {
    hero: {
        width: '100%',
    },
    avatar: {
        width: '80px',
        height: '80px',
        flexShrink: 0,
    },
    accent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 0,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
    },
};
const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
};
const devLabelStyles = {
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
const devLabelBracket = {
    fontSize: '0.7rem',
    fontFamily: "'Fira Code', 'Consolas', monospace",
    color: 'rgba(167, 139, 250, 0.35)',
    letterSpacing: '0.04em',
};
const devLabelText = {
    fontSize: '0.65rem',
    color: 'rgba(139, 128, 176, 0.3)',
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: '180px',
};
const contentOverlayStyles = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
};
export default CinematicArtSlot;
