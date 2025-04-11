import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'
const PUBLIC_FILE = /\.(.*)$/i

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Ne jamais rediriger les fichiers statiques ou API
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next()
    }

    // 2. Rediriger uniquement `/` vers `/fr`
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
    }

    // 3. Vérifie si la route commence par une locale valide
    const firstSegment = pathname.split('/')[1]
    if (LOCALES.includes(firstSegment)) {
        return NextResponse.next()
    }

    // 4. Sinon, c'est un chemin inconnu -> redirige vers /fr (pas /fr/aze)
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
}
