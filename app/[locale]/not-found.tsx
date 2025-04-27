"use client"

import Link from 'next/link'
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const pathname = usePathname()
    const locale = pathname.split('/')[1] || 'fr'
    const t = useTranslations("NotFound")

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center text-center p-6 bg-base-100 rounded-3xl mx-3">
                <h1 className="text-4xl font-bold">404 – {t('title')}</h1>
                <p className="mt-2 text-gray-600">
                    {t('message')}
                </p>
                <Link
                    href={`/${locale}`}
                    className="mt-6 px-5 py-2 bg-primary text-white rounded-full hover:bg-secondary transition"
                >
                    {t('backHome')}
                </Link>
            </div>
        </div>

    )
}