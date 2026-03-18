import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore next internals and static assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/static") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token")?.value;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtected = pathname.startsWith("/(auth)/");

  if (!accessToken && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (accessToken && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
