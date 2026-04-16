// src/components/CinematicArtSlot.tsx
// Art placeholder system — gradient stubs now, real assets later.
// Drop in a real `src` prop and the gradient disappears automatically.

interface CinematicArtSlotProps {
  slot: "oracle" | "altar" | "gate" | "vault" | "premium" | "billing" | string;
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

const SLOT_GRADIENTS: Record<string, string> = {
  oracle:   "from-indigo-900 via-violet-800 to-purple-950",
  altar:    "from-rose-950 via-purple-900 to-indigo-950",
  gate:     "from-slate-900 via-violet-900 to-slate-950",
  vault:    "from-amber-950 via-violet-900 to-slate-900",
  premium:  "from-violet-900 via-fuchsia-800 to-purple-950",
  billing:  "from-slate-900 via-slate-800 to-violet-950",
};

const ASPECT_CLASSES: Record<string, string> = {
  portrait:  "aspect-[2/3]",
  landscape: "aspect-[16/9]",
  square:    "aspect-square",
};

export default function CinematicArtSlot({
  slot,
  src,
  alt = "Seraphine Awaits",
  className = "",
  aspectRatio = "portrait",
}: CinematicArtSlotProps) {
  const gradient = SLOT_GRADIENTS[slot] ?? "from-violet-900 via-purple-800 to-indigo-950";
  const aspect   = ASPECT_CLASSES[aspectRatio];

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        ${aspect}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        /* Gradient placeholder */
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          {/* Subtle shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
          {/* Decorative sigil */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-4xl opacity-10 select-none pointer-events-none"
              style={{ filter: "blur(1px)" }}
              aria-hidden
            >
              ✦
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
