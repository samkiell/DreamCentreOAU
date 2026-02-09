import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/jwt';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define Route Protection Rules
  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isAdminRoute || isDashboardRoute) {
    const token = request.cookies.get('dc_token')?.value;

    // Verify presence and validity of token
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role check for Admin routes
    if (isAdminRoute && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
