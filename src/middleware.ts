export { default } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { routes } from './navigation';

// ----------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  /**
   * Manual redirecting (with business conditions)
   */
  const requestPathname = request.nextUrl.pathname;
  switch (true) {
    // Home
    case requestPathname === routes.home:
      /* Redirect to Blog as landing page */
      return NextResponse.redirect(new URL(routes.blog.root, request.url));
      break;
  }
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(cs|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
