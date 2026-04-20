type LightingOverlayProps = {
  emotion?: string | null;
};

const emotionGlow: Record<string, string> = {
  serene:   "rgba(124, 58, 237, 0.18)",
  fierce:   "rgba(255, 0, 80, 0.22)",
  sorrow:   "rgba(0, 0, 0, 0.45)",
  ascended: "rgba(255, 255, 255, 0.25)",
};

export default function LightingOverlay({ emotion }: LightingOverlayProps) {
  const color = (emotion && emotionGlow[emotion]) ?? "rgba(124, 58, 237, 0.10)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        background: `radial-gradient(ellipse at 50% 0%, ${color}, transparent 70%)`,
        transition: "background 1.2s ease",
      }}
    />
  );
}
