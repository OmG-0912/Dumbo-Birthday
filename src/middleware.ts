import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: Exclusively keeps the Landing Page ('/') and Birthday Experience ('/birthday') active.
 * Any other route (e.g. /spaces/*, /universe, /admin, /showcase, /memories/*) is redirected to the home landing page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals, API routes, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/audio") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/textures") ||
    pathname.startsWith("/environments") ||
    pathname.startsWith("/models") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Only permit root landing page and birthday page
  if (pathname === "/" || pathname === "/birthday" || pathname === "/birthday/") {
    return NextResponse.next();
  }

  // Redirect all blocked pages to the root landing page
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and icons
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
