"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

/**
 * Language toggle — locale lives in the URL (English at /, Chinese at /zh), so
 * switching navigates to the same page under the other locale prefix. This is
 * cookie-free and works reliably in iframes / restricted preview environments.
 */
function stripLocale(p: string): string {
  if (!p) return "/";
  if (p === "/zh" || p === "/en") return "/";
  if (p.startsWith("/zh/") || p.startsWith("/en/")) return p.slice(3);
  return p;
}

export function LanguageToggle({
  locale,
  tone = "on-light",
  className = "",
}: {
  locale: Locale;
  tone?: "on-light" | "on-dark";
  className?: string;
}) {
  const pathname = usePathname();

  function choose(l: Locale) {
    if (l === locale) return;
    if (typeof window === "undefined") return;
    const base = stripLocale(pathname || "/");
    const target = l === "zh" ? (base === "/" ? "/zh" : `/zh${base}`) : base;
    // Full navigation so the server re-renders at the new locale path.
    window.location.href = target || "/";
  }

  const border = tone === "on-dark" ? "border-bone/25" : "border-ink/15";
  return (
    <div
      role="group"
      aria-label="Language / 語言"
      className={`inline-flex items-center rounded-full border ${border} text-[0.7rem] font-semibold tracking-wide ${className}`}
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1.5 transition-colors duration-200 ${
              active
                ? tone === "on-dark"
                  ? "bg-bone/15 text-bone"
                  : "bg-ink text-bone"
                : tone === "on-dark"
                  ? "text-bone/55 hover:text-bone"
                  : "text-ink/55 hover:text-ink"
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
