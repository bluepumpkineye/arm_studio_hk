/** Arm Studio wordmark — an arched-doorway glyph (a recurring motif in their work) + wordmark. */
export function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  const text = light ? "text-bone" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${text} ${className}`}>
      <svg
        width="23"
        height="27"
        viewBox="0 0 23 27"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2 26V12a9.5 9.5 0 0 1 19 0v14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.5 26v-7.2a4.5 4.5 0 0 1 9 0V26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="11.5" cy="13.4" r="1.5" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02rem] uppercase tracking-[0.14em]">
          Arm Studio
        </span>
        <span className="mt-[3px] text-[0.5rem] uppercase tracking-[0.42em] opacity-60">
          Hong Kong
        </span>
      </span>
    </span>
  );
}
