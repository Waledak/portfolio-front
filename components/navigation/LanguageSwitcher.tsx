'use client'

import { useRouter, usePathname } from 'next/navigation'

/**
 * A component that allows users to switch between languages
 */
export default function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value
        const segments = pathname.split('/')
        segments[1] = selected // Replace the locale segment
        const newPath = segments.join('/')
        router.push(newPath)
    }

    return (
        <select
            name="locale"
            aria-label={`Language ${pathname}`}
            className="select select-bordered select-primary select-sm cursor-pointer text-black"
            onChange={handleChange}
            defaultValue={pathname.split('/')[1]}
        >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
        </select>
    )
}