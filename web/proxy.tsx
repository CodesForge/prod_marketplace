import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const homeURL = new URL("/", request.url);
    homeURL.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(homeURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
  ],
};
