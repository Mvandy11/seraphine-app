import React from "react";
import { useOracleContext } from "@/contexts/OracleContext";
import OracleConsole from "@/components/OracleConsole";
import SeraphinePortrait from "@/components/SeraphinePortrait";

const Oracle: React.FC = () => {
  const { state } = useOracleContext();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0f0a1f, #05030d)",
        color: "white",
        overflowX: "hidden",
        paddingTop: "40px",
      }}
    >
      {/* Cinematic Seraphine Portrait */}
      <SeraphinePortrait />

      {/* Active Reading Console */}
      <div style={{ width: "100%", maxWidth: "900px", marginTop: "40px" }}>
        <OracleConsole />
      </div>
    </div>
  );
};

export default Oracle;
