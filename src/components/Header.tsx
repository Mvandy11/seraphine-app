import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

const Header: React.FC = () => {
  const { user, signOut } = useAppContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <header
      style={{
        width: "100%",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        background: "rgba(5,3,15,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(124,58,237,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "white",
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}
      >
        ✦ Seraphine
      </Link>

      <nav style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
        <NavLink to="/oracle">Oracle</NavLink>
        <NavLink to="/card-of-the-day">Daily</NavLink>
        <NavLink to="/deck">Vault</NavLink>
        <NavLink to="/readings">Readings</NavLink>

        {user ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/manage">Manage</NavLink>
            <button onClick={handleSignOut} style={signOutStyle}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/subscribe">Subscribe</NavLink>
            <Link to="/login" style={loginButtonStyle}>
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{
        color: "rgba(255,255,255,0.75)",
        textDecoration: "none",
        fontSize: "0.9rem",
        padding: "6px 10px",
        borderRadius: "6px",
        transition: "color 0.2s",
      }}
    >
      {children}
    </Link>
  );
}

const loginButtonStyle: React.CSSProperties = {
  padding: "6px 16px",
  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  borderRadius: "8px",
  color: "white",
  fontWeight: 600,
  fontSize: "0.88rem",
  textDecoration: "none",
  boxShadow: "0 0 12px rgba(124,58,237,0.3)",
};

const signOutStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid rgba(255,255,255,0.2)",
  padding: "6px 14px",
  borderRadius: "8px",
  color: "rgba(255,255,255,0.7)",
  cursor: "pointer",
  fontSize: "0.88rem",
};

export default Header;
