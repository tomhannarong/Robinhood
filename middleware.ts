import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_RECENT_USER, URL_DASHBOARD, URL_LOGIN } from "./app/constants";

const protectedRoutes = [URL_DASHBOARD];
export default function middleware(request: NextRequest) {
  const recentUserCookie = request.cookies.get(COOKIE_RECENT_USER);

  if (!recentUserCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(URL_LOGIN, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
