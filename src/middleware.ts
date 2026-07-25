import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * URL-based locale routing (cookie-free, reliable in iframes / restricted
 * preview environments where cookies don't round-trip).
 *
 *  - English is served at the root, e.g. /portfolio
 *  - Chinese (繁體) is served at /zh/*, e.g. /zh/portfolio
 *
 * Middleware rewrites /zh/* to the real routes and tags every request with the
 * active locale via the `x-locale` header, which getLocale() reads.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", isZh ? "zh" : "en");

  if (isZh) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/zh" ? "/" : pathname.slice(3); // strip "/zh"
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
};
