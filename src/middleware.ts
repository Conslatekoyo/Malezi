import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /dashboard, /auth/login)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/register' || path === '/'

  // Get the token from the cookies
  const authToken = request.cookies.get('auth-storage')

  // If the path is public and user is logged in, redirect to dashboard
  if (isPublicPath && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the path is protected and user is not logged in, redirect to login
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Otherwise, continue with the request
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