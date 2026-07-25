import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

/**
 * Resolve the active locale. Reads the `x-locale` header set by middleware
 * (URL-based: /zh = Chinese, everything else = English) first, then falls back
 * to cookie / Accept-Language for safety.
 */
export async function getLocale(): Promise<Locale> {
  try {
    const h = await headers();
    const fromMiddleware = h.get("x-locale");
    if (fromMiddleware === "zh") return "zh";
    if (fromMiddleware === "en") return "en";
  } catch {
    /* headers() unavailable */
  }
  try {
    const store = await cookies();
    const c = store.get("locale")?.value;
    if (c && isLocale(c)) return c;
  } catch {
    /* cookies() unavailable */
  }
  try {
    const h = await headers();
    const al = (h.get("accept-language") ?? "").toLowerCase();
    if (al.startsWith("zh")) return "zh";
  } catch {
    /* headers() unavailable */
  }
  return DEFAULT_LOCALE;
}
