'use client'

import Image from 'next/image'
import Link from 'next/link'

type HeaderIntroProps = {
    lang: string
    imgUrl: string
    alt: string
    fullname: string
    baseline: string
    description: string
    cvUrl: string
}

export default function HeaderIntro({
        lang,
        imgUrl,
        alt,
        fullname,
        baseline,
        description,
        cvUrl
    }: HeaderIntroProps) {
    return (
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Image Side */}
            <figure className="sm:justify-self-end justify-self-center">
                <Image
                    src={imgUrl}
                    alt={alt}
                    width={150}
                    height={150}
                    className="rounded-3xl"
                    priority
                />
            </figure>

            {/* Text Side */}
            <section
                className="flex flex-col sm:col-span-2 rounded-3xl bg-white/30 backdrop-blur-sm justify-center px-6 py-6 text-black w-full">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{fullname}</h1>
                <p className="text-xl text-primary mt-1">{baseline}</p>
                <p className="text-neutral mt-6 text-lg">{description}</p>

                <nav className="flex justify-between flex-wrap items-center gap-4 mt-3">
                    <Link className="px-5 py-2 rounded-full bg-primary text-white font-medium text-center hover:bg-secondary transition" target="_blank" href={cvUrl}>
                        CV
                    </Link>
                    <div className="flex gap-4 items-center flex-wrap">
                        <Link
                            href={`/${lang}/projects`}
                            className="px-5 py-2 rounded-full bg-primary text-white font-medium text-center hover:bg-secondary transition"
                        >
                            Projects
                        </Link>
                        <Link
                            href={`/${lang}/gallery`}
                            className="px-5 py-2 rounded-full border border-primary text-black font-medium text-center hover:bg-primary hover:text-white transition"
                        >
                            Gallery
                        </Link>
                    </div>

                </nav>
            </section>
        </header>
    )
}
