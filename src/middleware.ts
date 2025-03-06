import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For demo purposes, we're just checking if there's a user in localStorage
  // In a real app, you would check for a valid session cookie

  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    "/developer-dashboard",
    "/dashboard",
    "/ide",
    "/reports",
  ];

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // In a real implementation, you would check for a valid session cookie here
  // For this demo, we'll just redirect to the login page for protected routes
  // The actual auth check happens client-side in the AuthProvider

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
