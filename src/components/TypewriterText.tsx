// src/components/TypewriterText.tsx
import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
};

export function TypewriterText({ text, speed = 40 }: Props) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return <span>{display}</span>;
}

export default TypewriterText;
