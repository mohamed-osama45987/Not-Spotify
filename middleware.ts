import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  //   token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // ALlow the req to pass if you need to login or if you have a token already
  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect to the login page if there is no token
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
export const config = {
  matcher: "/",
};
