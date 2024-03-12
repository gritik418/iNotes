import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const secureRoutes = ["/notes", "/todo", "/profile"];

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("_at");
  const user: any = jwt.decode(cookie?.value!);
  if (secureRoutes.includes(request.nextUrl.pathname)) {
    if (!user?.email) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (user?.email) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/login/:path*",
    "/signup/:path*",
    "/notes/:path*",
    "/todo/:path*",
    "/profile/:path*",
  ],
};
