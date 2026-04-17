import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
const Header = () => {
    const { user, signOut } = useAppContext();
    return (_jsxs("header", { style: {
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
        }, children: [_jsx(Link, { to: "/", style: { fontSize: "1.4rem", fontWeight: 700, color: "white" }, children: "Seraphine" }), _jsxs("nav", { style: { display: "flex", gap: "20px", alignItems: "center" }, children: [_jsx(Link, { to: "/oracle", style: { color: "white" }, children: "Oracle" }), _jsx(Link, { to: "/card-of-the-day", style: { color: "white" }, children: "Daily" }), _jsx(Link, { to: "/deck", style: { color: "white" }, children: "Deck Vault" }), _jsx(Link, { to: "/readings", style: { color: "white" }, children: "Readings" }), user && (_jsx(Link, { to: "/manage", style: { color: "white" }, children: "Manage" })), !user ? (_jsx(Link, { to: "/subscribe", style: { color: "white" }, children: "Subscribe" })) : (_jsx("button", { onClick: signOut, style: {
                            background: "none",
                            border: "1px solid white",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            color: "white",
                            cursor: "pointer",
                        }, children: "Sign Out" }))] })] }));
};
export default Header;
