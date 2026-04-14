// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

const Header: React.FC = () => {
  const { user, signOut } = useAppContext();

  return (
    <header
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <Link to="/" style={{ fontSize: "1.4rem", fontWeight: 700, color: "white" }}>
        Seraphine
      </Link>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/oracle" style={{ color: "white" }}>
          Oracle
        </Link>

        {user && (
          <Link to="/manage" style={{ color: "white" }}>
            Manage
          </Link>
        )}

        {!user ? (
          <Link to="/subscribe" style={{ color: "white" }}>
            Subscribe
          </Link>
        ) : (
          <button
            onClick={signOut}
            style={{
              background: "none",
              border: "1px solid white",
              padding: "6px 12px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

