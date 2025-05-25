import Image from 'next/image'
import Link from 'next/link'
import {useTranslations} from "next-intl";
import {StrapiMedia} from "@/types/strapi.type";
import DropdownMenu from '@/components/ui/DropdownMenu';

type HeaderIntroProps = {
    locale: string
    imgUrl: string
    alt: string
    fullname: string
    baseline: string
    description: string
    cvUrl: string
    additionalFiles?: {
        name: string
        file: StrapiMedia
    }[]
}

/**
 * Header component displaying profile information, CV link, and navigation
 */
export default function HeaderIntro({
        locale,
        imgUrl,
        alt,
        fullname,
        baseline,
        description,
        cvUrl,
        additionalFiles = []
    }: HeaderIntroProps) {
    const t = useTranslations("HeaderSection")

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
                className="flex flex-col sm:col-span-2 rounded-3xl bg-white/30 backdrop-blur-sm z-20 justify-center px-6 py-6 text-black w-full">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{fullname}</h1>
                <p className="text-xl text-primary mt-1">{baseline}</p>
                <p className="text-neutral mt-6 text-lg">{description}</p>

                <nav className="flex justify-between flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center">
                        <DropdownMenu 
                            items={additionalFiles} 
                            buttonAriaLabel={t("downloadFiles")}
                            label={t("cv")}
                            url={cvUrl}
                        />
                    </div>
                    <div className="flex gap-4 items-center flex-wrap">
                        <Link
                            href={`/${locale}/projects`}
                            prefetch={true}
                            className="px-5 py-2 rounded-full bg-primary text-white font-medium text-center hover:bg-secondary transition"
                        >
                            {t("projects")}
                        </Link>
                        <Link
                            href={`/${locale}/gallery`}
                            prefetch={true}
                            className="px-5 py-2 rounded-full border border-primary text-black font-medium text-center hover:bg-primary hover:text-white transition"
                        >
                            {t("gallery")}
                        </Link>
                    </div>
                </nav>
            </section>
        </header>
    )
}
