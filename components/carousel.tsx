'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import {StrapiImageFormat} from "@/types/strapi.type";
type Props = {
    images: StrapiImageFormat[]
}
export default function PhotoCarousel({images}: Props) {
    const autoplay = useRef(
        Autoplay(
            { delay: 5000, stopOnInteraction: false }
        )
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [autoplay.current]
    )

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    return (
        <div className="justify-self-center w-48 h-48 rounded-3xl  bg-neutral-200/30 relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                <div className="flex">
                    {images.map((img, i) => (
                        <div className="relative  flex-[0_0_100%] h-48" key={i}>
                            <Image
                                src={img.url}
                                alt={img.name || `Photo ${i + 1}`}
                                fill
                                className="object-cover  w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={scrollPrev}
                className="absolute cursor-pointer top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
                <ArrowLeftIcon className="h-3 w-3 text-black" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
                <ArrowRightIcon className="h-3 w-3 text-black" />
            </button>
        </div>
    )
}
