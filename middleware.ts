import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'fr';

// next-intl middleware instance
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle static files and API routes
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.(.*)$/i.test(pathname)) {
        return NextResponse.next();
    }

    // Redirect root path "/" directly to "/fr"
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    // Validate if pathname starts with a valid locale
    const pathnameLocale = pathname.split('/')[1];

    if (locales.includes(pathnameLocale)) {
        // If valid locale, run intl middleware
        return intlMiddleware(request);
    } else {
        // Redirect invalid locale or paths directly to default locale root
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }
}

export const config = {
    matcher: ['/', '/(.*)'],
};
