import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        const loginURL = new URL("/login", request.url);
        return NextResponse.redirect(loginURL);
    }
    return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};