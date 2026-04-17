import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// BottomNav.tsx — mobile nav bar
import { Link, useLocation } from "react-router-dom";
export default function BottomNav() {
    const { pathname } = useLocation();
    const linkStyle = (path) => ({
        flex: 1,
        padding: "12px 0",
        textAlign: "center",
        color: pathname === path ? "#7c3aed" : "white",
        fontWeight: pathname === path ? "bold" : "normal",
        textDecoration: "none",
    });
    return (_jsxs("div", { style: {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            zIndex: 999,
        }, children: [_jsx(Link, { to: "/oracle", style: linkStyle("/oracle"), children: "Oracle" }), _jsx(Link, { to: "/card-of-the-day", style: linkStyle("/card-of-the-day"), children: "Daily" }), _jsx(Link, { to: "/deck", style: linkStyle("/deck"), children: "Vault" }), _jsx(Link, { to: "/readings", style: linkStyle("/readings"), children: "Readings" })] }));
}
