import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
const NotFound = () => {
    const location = useLocation();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-[#07061a]", children: _jsxs("div", { className: "text-center p-12 animate-fade-in", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-8", children: _jsx(Sparkles, { className: "w-7 h-7 text-purple-400/50" }) }), _jsx("h1", { className: "text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent", children: "404" }), _jsx("p", { className: "text-purple-300/50 text-lg mb-2", children: "This path does not exist in the field." }), _jsx("p", { className: "text-purple-500/30 text-sm mb-8", children: "The energy you seek lies elsewhere." }), _jsx("a", { href: "/", className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300", children: "Return to the Oracle" })] }) }));
};
export default NotFound;
