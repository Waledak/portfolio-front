'use client';

import React, {useEffect, useState, useRef, useCallback} from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchGallery } from '@/lib/strapi';
import { GalleryItem } from '@/types/strapi.type';
import {useTranslations} from "next-intl";
import {GalleryImage, GallerySkeleton, Lightbox} from "@/components/gallery";
import "./gallery.css"

export default function Gallery() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);
    const PAGE_SIZE = 8;
    const hasFetchedRef = useRef(false);
    const didFirstLoad = useRef(false);
    const t = useTranslations("Gallery")

    const loadGallery = useCallback(async (pageNumber: number) => {
        try {
            setLoading(true);
            const data = await fetchGallery(pageNumber, PAGE_SIZE);

            // Avoid duplicate images by checking IDs
            const newImages = data.data.filter(
                newImg => !images.some(existingImg => existingImg.id === newImg.id)
            );

            setImages(prev => [...prev, ...newImages]);

            if (data.meta.pagination.page >= data.meta.pagination.pageCount) {
                setHasMore(false);
            }

            setPage(pageNumber);
            if(!didFirstLoad.current) {
                didFirstLoad.current = true;
            }
            setError(false);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setError(true);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [images]);

    useEffect(() => {
        if (!hasFetchedRef.current) {
            loadGallery(1);
            hasFetchedRef.current = true;
        }
    }, [loadGallery]);

    // Open lightbox using view transition if available
    const openLightbox = useCallback((index: number) => {
        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                setLightboxIndex(index);
            });
        } else {
            setLightboxIndex(index);
        }

        // Disable scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    }, []);

    // Re-enable scroll when lightbox is closed
    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        document.body.style.overflow = '';
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 2xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <h1 className="m-5 text-3xl sm:text-4xl " id="galleryTitle">{t("title")}</h1>
            <div>
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p>{t('errorMessage')}</p>
                        <button
                            aria-label={t('retryLoadData')}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                            onClick={() => loadGallery(page)}
                        >
                            {t('retryLoadData')}
                        </button>
                    </div>
                )}
                <InfiniteScroll
                    dataLength={images.length}
                    next={() => loadGallery(page + 1)}
                    hasMore={hasMore}
                    loader={
                            didFirstLoad.current ? (
                                <div className="m-auto w-10 h-10 flex items-center justify-center my-5">
                                    <div className="w-10 h-10 rounded-full border-4 border-t-secondary border-white/30 animate-spin"></div>
                                </div>
                            ) : (
                                <GallerySkeleton />
                            )
                    }
                    scrollableTarget="scrollableMainContentContainer"
                    endMessage={
                        images.length > 0 && (
                            <p className="text-center text-gray-500 my-4">
                                {t('noMorePhoto')}
                            </p>
                        )
                    }
                >
                    {loading && images.length === 0 ? (
                        <span></span>
                    ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {images.map((img, index) => (
                                <GalleryImage
                                    key={img.id}
                                    img={img}
                                    index={index}
                                    onClick={openLightbox}
                                />
                            ))}
                        </Masonry>
                    )}
                </InfiniteScroll>

                {lightboxIndex !== null && (
                    <Lightbox
                        images={images}
                        initialIndex={lightboxIndex}
                        onClose={closeLightbox}
                    />
                )}
            </div>
        </div>
    );
}