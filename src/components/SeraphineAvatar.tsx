// src/components/SeraphineAvatar.tsx
import React from "react";

const SeraphineAvatar: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #9333ea)",
          margin: "0 auto",
        }}
      />
      <p style={{ marginTop: "12px", fontSize: "1.2rem", fontWeight: 600 }}>
        Seraphine
      </p>
    </div>
  );
};

export default SeraphineAvatar;

