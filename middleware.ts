import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define routes that should be protected
const protectedRoutes = ['/admin', '/user'];

export async function middleware(req: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the user is trying to access a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If no token is present, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If the user is not an admin and trying to access admin routes, redirect to home
    if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/error', req.url));
    }
  }

  // Prevent logged-in users from accessing the login or register pages
  if (token && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/sign-in', '/sign-up'],
};
