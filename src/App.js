import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Oracle from "@/pages/Oracle";
import ManageSubscription from "@/components/ManageSubscription";
import Subscribe from "@/pages/Subscribe";
import CardOfTheDay from "@/pages/CardOfTheDay";
import SavedReadings from "@/pages/SavedReadings";
import DeckMenu from "@/pages/DeckMenu";
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Oracle, {}) }), _jsx(Route, { path: "/oracle", element: _jsx(Oracle, {}) }), _jsx(Route, { path: "/manage", element: _jsx(ManageSubscription, {}) }), _jsx(Route, { path: "/subscribe", element: _jsx(Subscribe, {}) }), _jsx(Route, { path: "/card-of-the-day", element: _jsx(CardOfTheDay, {}) }), _jsx(Route, { path: "/readings", element: _jsx(SavedReadings, {}) }), _jsx(Route, { path: "/deck", element: _jsx(DeckMenu, {}) })] }), _jsx(BottomNav, {})] }));
}
