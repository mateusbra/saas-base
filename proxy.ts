// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore public pages
  const publicPaths = ["/login", "/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;

  if (!token) {
    // user not logged, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = verifyToken(token);
    if (!user) throw new Error("Invalid token");

    // valid user, let it go through
    return NextResponse.next();
  } catch (err) {
    // token invalid or expried
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
