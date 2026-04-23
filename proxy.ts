import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const isAuthed = request.cookies.has('ph-auth');
  const { pathname } = request.nextUrl;

  if (isAuthed && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/heists', request.url));
  }

  if (!isAuthed && pathname.startsWith('/heists')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/heists/:path*'],
};
