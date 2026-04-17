import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { usePayment } from '../context/PaymentContext';
import { supabase } from '../lib/supabaseClient';
const PLACEHOLDER_RESULT = {
    health: 'healthy',
    checks: [
        { label: 'Webhook endpoint reachable', passed: true, detail: 'Endpoint responded with 200' },
        { label: 'Subscription record exists', passed: true, detail: 'Active subscription found in Supabase' },
        { label: 'Stripe customer linked', passed: true, detail: 'cus_placeholder123' },
        { label: 'No recent failures', passed: true, detail: '0 failures in the last 24 hours' },
        { label: 'Period end in sync', passed: false, detail: 'Supabase period_end is 2 minutes behind Stripe' },
    ],
    subscription_snapshot: {
        status: 'active',
        plan: 'premium',
        stripe_customer_id: 'cus_placeholder123',
        current_period_end: Math.floor(Date.now() / 1000) + 86400 * 30,
    },
    recent_events: [
        {
            id: 'evt_ph_1',
            event_type: 'invoice.payment_succeeded',
            stripe_event_id: 'evt_placeholder_abc123',
            status: 'processed',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            error_message: null,
        },
        {
            id: 'evt_ph_2',
            event_type: 'customer.subscription.updated',
            stripe_event_id: 'evt_placeholder_def456',
            status: 'processed',
            created_at: new Date(Date.now() - 7200000).toISOString(),
            error_message: null,
        },
        {
            id: 'evt_ph_3',
            event_type: 'invoice.payment_failed',
            stripe_event_id: 'evt_placeholder_ghi789',
            status: 'failed',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            error_message: 'Card declined: insufficient funds',
        },
    ],
};
const HEALTH_CONFIG = {
    healthy: { color: '#4ade80', bg: 'rgba(34,197,94,0.12)', icon: '✓', label: 'Healthy' },
    degraded: { color: '#facc15', bg: 'rgba(234,179,8,0.12)', icon: '⚠', label: 'Degraded' },
    critical: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', icon: '✕', label: 'Critical' },
};
const EVENT_STATUS_DOT = {
    processed: '#4ade80',
    failed: '#f87171',
    pending: '#facc15',
};
const WebhookSyncChecker = () => {
    const { loading: paymentLoading } = usePayment();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaceholder, setIsPlaceholder] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const runCheck = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('check-webhook-sync');
            if (error)
                throw error;
            if (data && data.health && data.checks) {
                setResult(data);
                setIsPlaceholder(false);
            }
            else {
                throw new Error('Invalid response');
            }
        }
        catch {
            setResult(PLACEHOLDER_RESULT);
            setIsPlaceholder(true);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        runCheck();
    }, [runCheck]);
    if (paymentLoading || loading) {
        return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.header, children: _jsx("h2", { style: styles.title, children: "Webhook Sync Diagnostics" }) }), _jsxs("div", { style: styles.loadingBox, children: [_jsx("div", { style: styles.spinner }), _jsx("p", { style: styles.loadingText, children: "Running diagnostics..." })] })] }));
    }
    if (!result)
        return null;
    const healthCfg = HEALTH_CONFIG[result.health] || HEALTH_CONFIG.critical;
    const snap = result.subscription_snapshot;
    return (_jsxs("div", { style: styles.container, children: [_jsxs("div", { style: styles.header, children: [_jsx("h2", { style: styles.title, children: "Webhook Sync Diagnostics" }), _jsx("button", { onClick: runCheck, style: styles.recheckBtn, children: "Re-check" })] }), isPlaceholder && (_jsxs("div", { style: styles.placeholderBanner, children: [_jsx("span", { children: "\u2699\uFE0F" }), _jsxs("span", { children: ["Placeholder data \u2014 connect the", ' ', _jsx("code", { style: styles.code, children: "check-webhook-sync" }), " edge function for live diagnostics."] })] })), _jsxs("div", { style: {
                    ...styles.healthBadge,
                    background: healthCfg.bg,
                    borderColor: healthCfg.color + '33',
                }, children: [_jsx("span", { style: { color: healthCfg.color, fontSize: '1.3rem', fontWeight: 700 }, children: healthCfg.icon }), _jsx("span", { style: { color: healthCfg.color, fontWeight: 600, fontSize: '1.05rem' }, children: healthCfg.label })] }), _jsxs("div", { style: styles.section, children: [_jsx("h3", { style: styles.sectionTitle, children: "Diagnostic Checks" }), _jsx("div", { style: styles.checkList, children: result.checks.map((check, i) => (_jsxs("div", { style: styles.checkRow, children: [_jsx("span", { style: {
                                        ...styles.checkIcon,
                                        color: check.passed ? '#4ade80' : '#f87171',
                                    }, children: check.passed ? '✓' : '✕' }), _jsxs("div", { style: styles.checkContent, children: [_jsx("span", { style: styles.checkLabel, children: check.label }), check.detail && (_jsx("span", { style: styles.checkDetail, children: check.detail }))] })] }, i))) })] }), snap && (_jsxs("div", { style: styles.section, children: [_jsx("h3", { style: styles.sectionTitle, children: "Subscription Snapshot" }), _jsxs("div", { style: styles.snapGrid, children: [_jsxs("div", { style: styles.snapItem, children: [_jsx("span", { style: styles.snapLabel, children: "Status" }), _jsx("span", { style: styles.snapValue, children: snap.status })] }), _jsxs("div", { style: styles.snapItem, children: [_jsx("span", { style: styles.snapLabel, children: "Plan" }), _jsx("span", { style: styles.snapValue, children: snap.plan })] }), _jsxs("div", { style: styles.snapItem, children: [_jsx("span", { style: styles.snapLabel, children: "Stripe Customer" }), _jsx("span", { style: styles.snapValue, children: snap.stripe_customer_id || '—' })] }), _jsxs("div", { style: styles.snapItem, children: [_jsx("span", { style: styles.snapLabel, children: "Period End" }), _jsx("span", { style: styles.snapValue, children: snap.current_period_end
                                            ? new Date(snap.current_period_end * 1000).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })
                                            : '—' })] })] })] })), result.recent_events.length > 0 && (_jsxs("div", { style: styles.section, children: [_jsxs("button", { onClick: () => setShowEvents(!showEvents), style: styles.expandBtn, children: [_jsxs("h3", { style: { ...styles.sectionTitle, margin: 0 }, children: ["Webhook Event Log (", result.recent_events.length, ")"] }), _jsx("span", { style: styles.expandArrow, children: showEvents ? '▲' : '▼' })] }), showEvents && (_jsx("div", { style: styles.eventList, children: result.recent_events.map((evt) => (_jsxs("div", { style: styles.eventRow, children: [_jsx("span", { style: {
                                        ...styles.statusDot,
                                        background: EVENT_STATUS_DOT[evt.status] || '#64748b',
                                    } }), _jsxs("div", { style: styles.eventContent, children: [_jsxs("div", { style: styles.eventTop, children: [_jsx("span", { style: styles.eventType, children: evt.event_type }), _jsx("span", { style: styles.eventTime, children: new Date(evt.created_at).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }) })] }), _jsx("span", { style: styles.eventId, children: evt.stripe_event_id }), evt.error_message && (_jsx("span", { style: styles.eventError, children: evt.error_message }))] })] }, evt.id))) }))] }))] }));
};
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        color: '#e2e0f0',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: 700,
        color: '#e2e0f0',
        margin: 0,
    },
    recheckBtn: {
        padding: '0.5rem 1.25rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#c4b5fd',
        background: 'rgba(124, 58, 237, 0.1)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
    placeholderBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.75rem 1rem',
        background: 'rgba(234, 179, 8, 0.08)',
        border: '1px solid rgba(234, 179, 8, 0.2)',
        borderRadius: '10px',
        fontSize: '0.85rem',
        color: '#facc15',
        marginBottom: '1.25rem',
    },
    code: {
        background: 'rgba(255,255,255,0.06)',
        padding: '0.15rem 0.4rem',
        borderRadius: '4px',
        fontSize: '0.82rem',
        fontFamily: "'Fira Code', 'Consolas', monospace",
    },
    healthBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.65rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid',
        marginBottom: '2rem',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionTitle: {
        fontWeight: 600,
        color: '#a78bfa',
        marginBottom: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: '0.8rem',
    },
    checkList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
    },
    checkRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.7rem 1rem',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '10px',
        border: '1px solid rgba(124, 58, 237, 0.06)',
    },
    checkIcon: {
        fontSize: '1rem',
        fontWeight: 700,
        marginTop: '0.1rem',
        flexShrink: 0,
    },
    checkContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.15rem',
    },
    checkLabel: {
        fontSize: '0.9rem',
        fontWeight: 500,
        color: '#e2e0f0',
    },
    checkDetail: {
        fontSize: '0.8rem',
        color: '#8b80b0',
    },
    snapGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.75rem',
    },
    snapItem: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.85rem 1rem',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '10px',
        border: '1px solid rgba(124, 58, 237, 0.06)',
    },
    snapLabel: {
        fontSize: '0.72rem',
        fontWeight: 600,
        color: '#6b5fa0',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.3rem',
    },
    snapValue: {
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#c4b5fd',
    },
    expandBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem 0',
        marginBottom: '0.75rem',
    },
    expandArrow: {
        fontSize: '0.75rem',
        color: '#8b80b0',
    },
    eventList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    eventRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.7rem 1rem',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '10px',
        border: '1px solid rgba(124, 58, 237, 0.06)',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginTop: '0.45rem',
        flexShrink: 0,
    },
    eventContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        flex: 1,
        minWidth: 0,
    },
    eventTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
    },
    eventType: {
        fontSize: '0.88rem',
        fontWeight: 500,
        color: '#e2e0f0',
    },
    eventTime: {
        fontSize: '0.75rem',
        color: '#6b5fa0',
        flexShrink: 0,
    },
    eventId: {
        fontSize: '0.75rem',
        color: '#5a5280',
        fontFamily: "'Fira Code', 'Consolas', monospace",
    },
    eventError: {
        fontSize: '0.78rem',
        color: '#f87171',
        marginTop: '0.2rem',
    },
    loadingBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem',
        gap: '1rem',
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
        fontSize: '0.95rem',
        color: '#8b80b0',
        fontStyle: 'italic',
    },
};
export default WebhookSyncChecker;
