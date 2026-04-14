// src/pages/Subscribe.tsx
import React from "react";
import { Link } from "react-router-dom";

const Subscribe: React.FC = () => {
  return (
    <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Subscribe</h1>

      <p style={{ opacity: 0.8, marginBottom: "20px" }}>
        Unlock full access to Seraphine.
      </p>

      <Link
        to="/manage"
        style={{
          padding: "14px 24px",
          background: "#3b82f6",
          borderRadius: "8px",
          color: "white",
          textDecoration: "none",
        }}
      >
        Continue
      </Link>
    </div>
  );
};

export default Subscribe;
