import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
// Define where middleware runs
export const config = {
  matcher: ['/dashboard/:path','/dashboard'], // apply only where matches
}

export function proxy(req: NextRequest) {
  
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
