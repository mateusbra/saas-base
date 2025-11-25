import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { verify } from "crypto";

// Define where middleware runs
export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/login', '/signup', '/projects'], // apply only where matches
}
const protectedRoutes = ['/projects', '/dashboard'];

export function proxy(req: NextRequest) {
  const middlewares = [authMiddleware];
  middlewares.forEach(middleware => {
    const result = middleware(req);
    if (result) return result;
  })
  return NextResponse.next();
}

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value as string;
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname.startsWith("/login");
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))


  //if route is protected and doesn't have token
  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = verifyToken(token);
    if (!user) throw new Error("Invalid token");
    //if there is token and tries to go to login page redirect
    if (user && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (err) {
    // token invalid or expried
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}