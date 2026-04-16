// src/components/SeraphineMessage.tsx
// Reusable dialogue renderer — avatar orb + Seraphine's text

import type { DialogueEntry } from "@/lib/seraphineDialogue";

interface SeraphineMessageProps {
  entry: DialogueEntry;
  className?: string;
}

export default function SeraphineMessage({ entry, className = "" }: SeraphineMessageProps) {
  const { text, icon, isSubtle } = entry;

  return (
    <div
      className={`flex items-start gap-3 ${isSubtle ? "opacity-60" : "opacity-100"} ${className}`}
    >
      {/* Avatar orb */}
      <div
        className={`
          relative shrink-0 rounded-full
          flex items-center justify-center
          ${isSubtle ? "w-7 h-7" : "w-9 h-9"}
          bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-700
          shadow-[0_0_14px_rgba(139,92,246,0.55)]
          ring-1 ring-violet-400/30
        `}
        aria-hidden
      >
        <span className={`${isSubtle ? "text-xs" : "text-sm"} select-none`}>
          {icon ?? "✦"}
        </span>
        {/* Subtle pulse ring for non-subtle entries */}
        {!isSubtle && (
          <span className="absolute inset-0 rounded-full animate-ping bg-violet-500/20 pointer-events-none" />
        )}
      </div>

      {/* Dialogue text */}
      <p
        className={`
          font-serif leading-relaxed
          ${isSubtle
            ? "text-sm text-purple-300/70 italic"
            : "text-base text-purple-100"}
        `}
      >
        {text}
      </p>
    </div>
  );
}
