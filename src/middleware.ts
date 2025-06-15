import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Firebase Auth cannot be securely verified at the edge. Enforce auth in the app (e.g., in layouts/pages).
export function middleware(request: NextRequest) {
  // Allow all requests through. Auth is enforced in the app.
  return NextResponse.next()
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (public icons)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons).*)',
  ],
}