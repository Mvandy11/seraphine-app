// src/pages/Subscribe.tsx

import React from "react";
import { useApp } from "@/contexts/AppContext";
import SubscribeTab from "@/components/SubscribeTab";

const Subscribe: React.FC = () => {
  const { user } = useApp();

  return (
    <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Subscribe</h1>

      <p style={{ opacity: 0.8, marginBottom: "20px" }}>
        Unlock full access to Seraphine.
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <SubscribeTab user={user} />
      </div>
    </div>
  );
};

export default Subscribe;
