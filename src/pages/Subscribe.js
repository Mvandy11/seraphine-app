import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Subscribe = () => {
    return (_jsxs("div", { style: { padding: "40px", color: "white", textAlign: "center" }, children: [_jsx("h1", { style: { fontSize: "2rem", marginBottom: "20px" }, children: "Subscribe" }), _jsx("p", { style: { opacity: 0.8, marginBottom: "20px" }, children: "Unlock full access to Seraphine." }), _jsx(Link, { to: "/manage", style: {
                    padding: "14px 24px",
                    background: "#3b82f6",
                    borderRadius: "8px",
                    color: "white",
                    textDecoration: "none",
                }, children: "Continue" })] }));
};
export default Subscribe;
