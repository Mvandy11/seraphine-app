import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { usePayment } from '../context/PaymentContext';
import { useSeraphine } from '../hooks/useSeraphine';
import SeraphineMessage from './SeraphineMessage';
const FEATURES = [
    {
        icon: '📜',
        title: 'Mythic Lore Vault',
        description: 'Unlock the full archive of world lore, character histories, and hidden narratives.',
    },
    {
        icon: '🎬',
        title: 'Cinematic Experiences',
        description: 'Access exclusive cinematic sequences, trailers, and behind-the-scenes content.',
    },
    {
        icon: '🛠️',
        title: 'Creator Tools',
        description: 'Build and customize your own mythic content with premium creator utilities.',
    },
    {
        icon: '⚡',
        title: 'Priority Access',
        description: 'Be first in line for new releases, beta features, and community events.',
    },
];
const WelcomePremium = ({ onContinue }) => {
    const { subscription, isSubscribed, loading } = usePayment();
    const { name, speak, artSlots } = useSeraphine('welcomePremium');
    const [revealedFeatures, setRevealedFeatures] = useState(0);
    useEffect(() => {
        if (!loading && isSubscribed) {
            const interval = setInterval(() => {
                setRevealedFeatures((prev) => {
                    if (prev >= FEATURES.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [loading, isSubscribed]);
    if (loading) {
        return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.loadingOrb }), _jsx("p", { style: styles.loadingText, children: speak('loading')?.text })] }));
    }
    if (!isSubscribed) {
        return (_jsxs("div", { style: styles.container, children: [_jsx("h2", { style: styles.heading, children: "You haven't unlocked Premium yet" }), _jsx("p", { style: styles.subText, children: "Subscribe to access the full mythic experience." }), onContinue && (_jsx("button", { onClick: onContinue, style: styles.ctaButton, children: "View Plans" }))] }));
    }
    const planLabel = subscription?.plan
        ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
        : 'Premium';
    const renewalDate = subscription?.current_period_end
        ? new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;
    return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.glowRing }), _jsx(SeraphineMessage, { line: speak('active'), style: { marginBottom: '1.5rem' } }), _jsx("h1", { style: styles.title, children: "Welcome to the Inner Circle" }), _jsxs("p", { style: styles.greeting, children: [name, ", your ", planLabel, " membership is active."] }), _jsxs("div", { style: styles.tierBadge, children: [_jsx("span", { style: styles.tierIcon, children: "\u25C6" }), _jsxs("span", { style: styles.tierLabel, children: [planLabel, " Tier"] })] }), renewalDate && (_jsxs("p", { style: styles.renewalText, children: ["Renews on ", renewalDate] })), _jsx("div", { style: styles.featureGrid, children: FEATURES.map((feature, index) => (_jsxs("div", { style: {
                        ...styles.featureCard,
                        opacity: index < revealedFeatures ? 1 : 0,
                        transform: index < revealedFeatures
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
                    }, children: [_jsx("span", { style: styles.featureIcon, children: feature.icon }), _jsx("h3", { style: styles.featureTitle, children: feature.title }), _jsx("p", { style: styles.featureDesc, children: feature.description })] }, feature.title))) }), onContinue && (_jsx("button", { onClick: onContinue, style: styles.ctaButton, children: "Enter the Realm" }))] }));
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a12 0%, #12101f 50%, #0a0a12 100%)',
        color: '#e2e0f0',
        padding: '3rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    },
    glowRing: {
        position: 'absolute',
        top: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    loadingOrb: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 100%)',
        marginBottom: '1.5rem',
    },
    loadingText: {
        fontSize: '1.1rem',
        color: '#a78bfa',
        fontStyle: 'italic',
    },
    title: {
        fontSize: '2.4rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #a78bfa, #7c3aed, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem',
        textAlign: 'center',
        zIndex: 1,
    },
    greeting: {
        fontSize: '1.15rem',
        color: '#c4b5fd',
        marginBottom: '1rem',
        zIndex: 1,
    },
    tierBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.25rem',
        borderRadius: '999px',
        background: 'rgba(124, 58, 237, 0.15)',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        marginBottom: '0.5rem',
        zIndex: 1,
    },
    tierIcon: {
        color: '#a78bfa',
        fontSize: '0.9rem',
    },
    tierLabel: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#c4b5fd',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    renewalText: {
        fontSize: '0.9rem',
        color: '#8b80b0',
        marginBottom: '2.5rem',
        zIndex: 1,
    },
    heading: {
        fontSize: '1.8rem',
        fontWeight: 600,
        color: '#e2e0f0',
        marginBottom: '0.5rem',
    },
    subText: {
        fontSize: '1rem',
        color: '#8b80b0',
        marginBottom: '1.5rem',
    },
    featureGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        maxWidth: '900px',
        width: '100%',
        marginBottom: '2.5rem',
        zIndex: 1,
    },
    featureCard: {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(124, 58, 237, 0.12)',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
    },
    featureIcon: {
        fontSize: '2rem',
        display: 'block',
        marginBottom: '0.75rem',
    },
    featureTitle: {
        fontSize: '1.05rem',
        fontWeight: 600,
        color: '#e2e0f0',
        marginBottom: '0.4rem',
    },
    featureDesc: {
        fontSize: '0.85rem',
        color: '#8b80b0',
        lineHeight: 1.5,
    },
    ctaButton: {
        padding: '0.85rem 2.5rem',
        fontSize: '1.05rem',
        fontWeight: 600,
        color: '#fff',
        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        zIndex: 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
    },
};
export default WelcomePremium;
