"use client"

import Link from 'next/link'
import {usePathname} from "next/navigation";

export default function NotFound() {
    const pathname = usePathname()
    const lang = pathname.split('/')[1] || 'fr'

    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold">404 – Page not found</h1>
            <p className="mt-2 text-gray-600">
                The page you’re looking for doesn’t exist.
            </p>
            <Link
                href={`/${lang}`}
                className="mt-6 px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition"
            >
                Go back home
            </Link>
        </main>
    )
}