import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/server/auth/token/session";

export async function middleware(req) {
  console.log("Middleware running for path:", req.nextUrl.pathname);
  console.log("middleware hit");

  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/login", "/signup", "/"];

  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => {
    currentPath.startsWith(currentPath);
  });
  const isPublicRoute = publicRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const sessionCookie = req.cookies.get("session")?.value;
    const session = await decrypt(sessionCookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
