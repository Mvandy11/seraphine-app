// src/components/SeraphineResponse.tsx
import { TypewriterText } from "./TypewriterText";

export function SeraphineResponse({ text }: { text: string }) {
  return (
    <div className="seraphine-response">
      <TypewriterText text={text} speed={40} />
    </div>
  );
}

export default SeraphineResponse;

