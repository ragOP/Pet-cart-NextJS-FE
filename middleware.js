import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Request >>>>>>>>>>>>>>>>>>>>>>>>>', request);
  const token = request.cookies.get('token');


  console.log('Token >>>>>>>>>>>>>>>>>>>>>>>>>', token);

  if (!token) {
    // Redirect to login page for protected routes
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account',
    '/account/:path*',
    '/cart',
    '/orders',
    '/orders/:path*',
    '/profile',
    '/profile/:path*',
  ],
};
