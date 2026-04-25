import { NextRequest, NextResponse } from 'next/server';
import { unsealData } from 'iron-session';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get('store_session')?.value;

  if (!cookieValue) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const session = await unsealData<{ isLoggedIn?: boolean }>(cookieValue, {
      password: process.env.SESSION_SECRET ?? 'fallback-secret-change-in-production-32chars',
    });
    if (!session?.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
