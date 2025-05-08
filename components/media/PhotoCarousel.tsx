'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { StrapiMedia } from "@/types/strapi.type";

interface PhotoCarouselProps {
  images: StrapiMedia[];
}

/**
 * A carousel component for displaying images
 * Uses embla-carousel for smooth scrolling and autoplay
 */
export default function PhotoCarousel({ images }: PhotoCarouselProps) {
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
    <div className="justify-self-center w-48 h-48 rounded-3xl bg-neutral-200/30 relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div className="relative flex-[0_0_100%] h-48" key={img.id || i}>
              <Image
                src={img.formats.small?.url ?? img.url}
                alt={img.alternativeText || img.name || `Photo ${i + 1}`}
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        className="absolute cursor-pointer top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ArrowLeftIcon className="h-3 w-3 text-black" />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Next image"
        className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <ArrowRightIcon className="h-3 w-3 text-black" />
      </button>
    </div>
  )
}