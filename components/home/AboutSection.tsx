'use client'

import ReactMarkdown from 'react-markdown'
import PhotoCarousel from "@/components/carousel";
import MapWrapper from "@/components/mapWrapper";
import {StrapiImageFormat} from "@/types/strapi.type";

type AboutSectionProps = {
    title: string
    content: string
    photos:  StrapiImageFormat[]
}

export default function AboutSection({ title, content, photos }: AboutSectionProps) {
    return (
        <section className="col-span-3 mt-9 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            <h2 className="bg-neutral-200/30 w-fit p-4 backdrop-blur-sm rounded-3xl text-3xl">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
                {/* Markdown description */}
                <article className="px-4 py-2 bg-neutral-200/30 rounded-3xl row-span-2 md:col-span-2 prose prose-neutral">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>

                {/* Photo Carousel */}
                <PhotoCarousel images={photos} />

                {/* Map */}
                <div className="justify-self-center">
                    <MapWrapper />
                </div>
            </div>
        </section>
    )
}
