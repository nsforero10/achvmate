import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isAuthPage = nextUrl.pathname.startsWith("/login");

  // NextAuth v5 session cookie name (works in both dev and prod)
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;

  // Already logged in → don't show /login again
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Not logged in → redirect to /login
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};

