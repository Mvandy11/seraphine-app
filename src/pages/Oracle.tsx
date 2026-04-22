import { useState } from "react";
import { useOracleContext } from "@/contexts/OracleContext";
import OracleConsole from "@/components/OracleConsole";
import CardOfTheDayPreview from "@/components/CardOfTheDayPreview";
import CardReveal from "@/components/CardReveal";
import SaveReadingButton from "@/components/SaveReadingButton";
import BirthdayInput from "@/components/BirthdayInput";
import { getBirthdayArchetype, BirthdayArchetype } from "@/utils/birthdayEngine";

export default function Oracle() {
  const { state } = useOracleContext();
  const emotion = state.emotion;

  const [birthday, setBirthday] = useState<BirthdayArchetype | null>(null);

  const portrait = emotion
    ? `/art/seraphine/emotion/${emotion}.png`
    : `/art/seraphine/portrait.png`;

  const bg = "/art/backgrounds/oracle.jpg";

  const aura =
    emotion === "serene"
      ? "radial-gradient(circle, rgba(124,58,237,0.2), transparent)"
      : emotion === "fierce"
      ? "radial-gradient(circle, rgba(255,0,80,0.25), transparent)"
      : emotion === "sorrow"
      ? "radial-gradient(circle, rgba(0,0,0,0.4), transparent)"
      : emotion === "ascended"
      ? "radial-gradient(circle, rgba(255,255,255,0.3), transparent)"
      : "transparent";

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: aura,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <CardOfTheDayPreview />

        <img
          src={portrait}
          alt="Seraphine"
          style={{
            width: "100%",
            maxWidth: "420px",
            filter: "drop-shadow(0 0 25px rgba(124,58,237,0.6))",
          }}
        />

        {/* Birthday archetype input */}
        {!birthday ? (
          <BirthdayInput
            onSubmit={(month, day) => {
              const archetype = getBirthdayArchetype(month, day);
              setBirthday(archetype);
            }}
          />
        ) : (
          <div
            style={{
              padding: "16px 24px",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.4)",
              borderRadius: "12px",
              textAlign: "center",
              color: "white",
              maxWidth: "480px",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.85 }}>
              ✦ Life Path <strong>{birthday.lifePath}</strong> &nbsp;·&nbsp;
              <strong>{birthday.elementalAura}</strong> &nbsp;·&nbsp;
              <strong>{birthday.birthArcana}</strong>
            </p>
            <button
              onClick={() => setBirthday(null)}
              style={{
                marginTop: "8px",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              change birthday
            </button>
          </div>
        )}

        {state.spread && (
          <div style={{ display: "flex", gap: "20px" }}>
            {state.spread.map((card, i) => (
              <CardReveal key={i} card={card} />
            ))}
          </div>
        )}

        <OracleConsole birthday={birthday} />

        {state.answer && (
          <div
            style={{
              marginTop: "20px",
              color: "white",
              fontSize: "1.4rem",
              textAlign: "center",
              maxWidth: "650px",
              textShadow: "0 0 10px rgba(0,0,0,0.6)",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: state.answer }} />

            {state.explanation && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "10px",
                    fontSize: "1.6rem",
                    color: "white",
                    textShadow: "0 0 10px rgba(124,58,237,0.6)",
                  }}
                >
                  Seraphine's Explanation
                </h3>

                <p style={{ opacity: 0.9, marginBottom: "10px" }}>
                  <strong>Why this card appeared:</strong>
                  <br />
                  {state.explanation?.why}
                </p>

                <p style={{ opacity: 0.9, marginBottom: "10px" }}>
                  <strong>Symbolic meaning:</strong>
                  <br />
                  {state.explanation?.symbolism}
                </p>

                <p style={{ opacity: 0.9, marginBottom: "10px" }}>
                  <strong>How it relates to your question:</strong>
                  <br />
                  {state.explanation?.relation}
                </p>

                <p style={{ opacity: 0.9, marginBottom: "10px" }}>
                  <strong>Seraphine's guidance:</strong>
                  <br />
                  {state.explanation?.guidance}
                </p>
              </div>
            )}

            <SaveReadingButton
              type="oracle"
              payload={{
                question: state.question,
                spread: state.spread,
                emotion,
                message: state.answer,
                birthday,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
