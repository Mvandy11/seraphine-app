import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { usePayment } from '../context/PaymentContext';
import { useSeraphine } from '../hooks/useSeraphine';
const TIER_RANK = {
    free: 0,
    basic: 1,
    premium: 2,
    mythic: 3,
};
function meetsRequirement(currentPlan, requiredPlan) {
    if (!currentPlan)
        return false;
    const currentRank = TIER_RANK[currentPlan] ?? -1;
    const requiredRank = TIER_RANK[requiredPlan] ?? 0;
    return currentRank >= requiredRank;
}
const PremiumGate = ({ requiredPlan = 'premium', blurPreview = false, silent = false, fallback, onUpgrade, children, }) => {
    const { subscription, isSubscribed, loading } = usePayment();
    const { speak } = useSeraphine('premiumGate');
    if (loading) {
        return (_jsxs("div", { style: styles.loadingContainer, children: [_jsx("div", { style: styles.spinner }), _jsx("p", { style: styles.loadingText, children: speak('loading')?.text })] }));
    }
    const hasAccess = isSubscribed && meetsRequirement(subscription?.plan, requiredPlan);
    if (hasAccess) {
        return _jsx(_Fragment, { children: children });
    }
    if (silent)
        return null;
    if (fallback)
        return _jsx(_Fragment, { children: fallback });
    const requiredLabel = requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1);
    const gateOverlay = (_jsx("div", { style: styles.gateOverlay, children: _jsxs("div", { style: styles.gateCard, children: [_jsx("div", { style: styles.lockIcon, children: "\uD83D\uDD12" }), _jsxs("h3", { style: styles.gateTitle, children: [requiredLabel, " Content"] }), _jsx("p", { style: styles.gateMessage, children: speak('locked')?.text }), onUpgrade && (_jsxs("button", { onClick: onUpgrade, style: styles.upgradeButton, children: ["Upgrade to ", requiredLabel] }))] }) }));
    if (blurPreview) {
        return (_jsxs("div", { style: styles.blurWrapper, children: [_jsx("div", { style: styles.blurredContent, children: children }), gateOverlay] }));
    }
    return gateOverlay;
};
const styles = {
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
    },
    spinner: {
        width: '32px',
        height: '32px',
        border: '3px solid rgba(124, 58, 237, 0.2)',
        borderTopColor: '#7c3aed',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    loadingText: {
        marginTop: '0.75rem',
        fontSize: '0.9rem',
        color: '#a78bfa',
        fontStyle: 'italic',
        opacity: 0.7,
    },
    blurWrapper: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
    },
    blurredContent: {
        filter: 'blur(8px)',
        opacity: 0.4,
        pointerEvents: 'none',
        userSelect: 'none',
    },
    gateOverlay: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 18, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 10,
    },
    gateCard: {
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        borderRadius: '20px',
        padding: '2.5rem',
        textAlign: 'center',
        maxWidth: '380px',
        width: '90%',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    },
    lockIcon: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    gateTitle: {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#e2e0f0',
        marginBottom: '0.5rem',
    },
    gateMessage: {
        fontSize: '0.9rem',
        color: '#8b80b0',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
    },
    upgradeButton: {
        padding: '0.75rem 2rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#fff',
        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 0 16px rgba(124, 58, 237, 0.25)',
    },
};
export default PremiumGate;
