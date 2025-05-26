import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - ... files in the public folder
  // - ... files with extensions (e.g. favicon.ico)
  // - ... /_next/ (Next.js internals)
  // - ... /_vercel/ (Vercel internals)
  // - ... /api/ (API routes)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
