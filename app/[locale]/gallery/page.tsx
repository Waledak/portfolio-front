'use client';

import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchGallery } from '@/lib/strapi';
import { GalleryItem } from '@/types/strapi.type';

// Lightbox component to display a selected image with next/prev navigation and dynamic view-transition
function Lightbox({
                      images,
                      initialIndex,
                      onClose,
                  }: {
    images: GalleryItem[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg bg-opacity-75 transition-opacity duration-300">
            <button
                onClick={onClose}
                className="absolute top-4 p-5 right-4 cursor-pointer text-white text-3xl"
                aria-label="Close"
            >
                ×
            </button>
            <button
                onClick={handlePrev}
                className="absolute left-4 p-5 cursor-pointer text-white text-3xl"
                aria-label="Previous Image"
            >
                &lt;
            </button>
            <img
                src={currentImage.image.url}
                alt={currentImage.image.name || 'Gallery Image'}
                className={`max-h-full max-w-full cursor-pointer transition-transform duration-500 ease-in-out [view-transition-name:gallery-photo-${initialIndex}]`}
            />
            <button
                onClick={handleNext}
                className="absolute right-4 p-5 cursor-pointer text-white text-3xl"
                aria-label="Next Image"
            >
                &gt;
            </button>
        </div>
    );
}

export default function Gallery() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const PAGE_SIZE = 8;
    const hasFetchedRef = useRef(false);

    const loadGallery = async (pageNumber: number) => {
        try {
            const data = await fetchGallery(pageNumber, PAGE_SIZE);
            setImages((prev) => [...prev, ...data.data]);
            if (data.meta.pagination.page >= data.meta.pagination.pageCount) {
                setHasMore(false);
            }
            setPage(pageNumber);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            loadGallery(1);
            hasFetchedRef.current = true;
        }
    }, []);

    // Open lightbox using view transition if available
    const openLightbox = (index: number) => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setLightboxIndex(index);
            });
        } else {
            setLightboxIndex(index);
        }
    };

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <div className="py-10 w-11/12 sm:w-10/12 md:w-4/6 xl:w-3/6 mx-auto">
            <InfiniteScroll
                dataLength={images.length}
                next={() => loadGallery(page + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((img, index) => (
                        <div
                            key={img.id}
                            className="cursor-pointer mb-4"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={img.image.formats.large?.url || img.image.url}
                                alt={img.image.name || 'Gallery Image'}
                                className={`w-full block transition-transform duration-500 ease-in-out [view-transition-name:gallery-photo-${index}]`}
                            />
                        </div>
                    ))}
                </Masonry>
            </InfiniteScroll>
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}
