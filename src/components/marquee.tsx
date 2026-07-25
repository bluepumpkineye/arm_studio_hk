import type { ReactNode } from "react";

/** CSS-only seamless marquee (doubled track, pauses on hover). Server-safe. */
export function Marquee({
  items,
  className = "",
  separator,
}: {
  items: string[];
  className?: string;
  separator?: ReactNode;
}) {
  const row = [...items, ...items];
  const sep = separator ?? <span className="mx-8 text-brass/50">✦</span>;

  return (
    <div className={`marquee-wrap relative overflow-hidden ${className}`}>
      <div className="marquee items-center">
        {row.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-2 font-display text-2xl tracking-tight text-ink/70">{it}</span>
            {sep}
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bone to-transparent" />
    </div>
  );
}
