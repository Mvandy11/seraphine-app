import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./Header";
import Footer from "./Footer";
const AppLayout = ({ children }) => {
    return (_jsxs("div", { style: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "radial-gradient(circle at top, #0f172a, #020617)",
            color: "white",
            position: "relative",
            zIndex: 0,
        }, children: [_jsx(Header, {}), _jsx("main", { style: { flex: 1, width: "100%", paddingTop: "20px", zIndex: 1 }, children: children }), _jsx(Footer, {})] }));
};
export default AppLayout;
