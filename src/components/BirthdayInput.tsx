import { useState } from "react";

interface BirthdayInputProps {
  onSubmit: (month: number, day: number) => void;
}

export default function BirthdayInput({ onSubmit }: BirthdayInputProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h3 style={{ color: "white", marginBottom: "10px" }}>
        Enter Your Birthday
      </h3>

      <input
        type="number"
        placeholder="Month (1–12)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "6px",
          width: "120px",
        }}
      />

      <input
        type="number"
        placeholder="Day (1–31)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          width: "120px",
        }}
      />

      <button
        onClick={() => onSubmit(Number(month), Number(day))}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#7c3aed",
          color: "white",
          cursor: "pointer",
          border: "none",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Save Birthday
      </button>
    </div>
  );
}
