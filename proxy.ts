import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
// Define where middleware runs
export const config = {
  matcher: ['/dashboard/:path*','/dashboard','/login','/signup'], // apply only where matches
}

export function proxy(req: NextRequest) {
  
  const token = req.cookies.get("session")?.value as string;
  if (!token) {
    // user not logged, redirect to login
      if(! (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup'))){
        return NextResponse.redirect(new URL("/login", req.url));
      }
        return NextResponse.next();
    
  }

  try {
    const user = verifyToken(token);
    if (!user) throw new Error("Invalid token");

    // valid user, let it go through
    if(req.nextUrl.pathname.startsWith('/login')|| req.nextUrl.pathname.startsWith('/signup')){
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  } catch (err) {
    // token invalid or expried
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
