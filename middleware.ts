import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // If no token is present and the user is trying to access a protected route, redirect to the login page
    if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl.origin));
    }
  } else {
    // If the user is not an admin and trying to access admin routes, redirect to an error page
    if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/error', req.nextUrl.origin));
    }

    // Prevent logged-in users from accessing the login or register pages
    if (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/sign-in', '/sign-up'],
};
