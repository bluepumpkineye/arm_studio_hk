import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1340px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
  tone = "brass",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brass" | "mist" | "ink" | "bone";
}) {
  const toneClass =
    tone === "mist"
      ? "text-mist"
      : tone === "ink"
        ? "text-ink/60"
        : tone === "bone"
          ? "text-sand"
          : "text-brass";
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${toneClass} ${className}`}>
      {children}
    </span>
  );
}

/** Small index marker like "01 /" */
export function Index({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span className={`eyebrow text-brass/70 ${className}`}>{n}</span>
  );
}

export const btnPrimary =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:bg-espresso btn-press";
export const btnGhost =
  "group inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/25 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone btn-press";
export const btnOnDark =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-bone px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-sand btn-press";
export const btnBrass =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:bg-clay btn-press";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** WhatsApp glyph */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm5.49-7.751c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

export function SocialIcon({ type, className = "" }: { type: "instagram" | "facebook" | "youtube"; className?: string }) {
  if (type === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (type === "youtube") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10.5 9.2v5.6L15 12l-4.5-2.8z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.5c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2H8v2.8h2.4V21h3.1z" />
    </svg>
  );
}
