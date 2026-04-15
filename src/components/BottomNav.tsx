// BottomNav.tsx — mobile nav bar

import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const { pathname } = useLocation();

  const linkStyle = (path: string) => ({
    flex: 1,
    padding: "12px 0",
    textAlign: "center" as const,
    color: pathname === path ? "#7c3aed" : "white",
    fontWeight: pathname === path ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        zIndex: 999,
      }}
    >
      <Link to="/oracle" style={linkStyle("/oracle")}>Oracle</Link>
      <Link to="/card-of-the-day" style={linkStyle("/card-of-the-day")}>Daily</Link>
      <Link to="/deck" style={linkStyle("/deck")}>Vault</Link>
      <Link to="/readings" style={linkStyle("/readings")}>Readings</Link>
    </div>
  );
}
