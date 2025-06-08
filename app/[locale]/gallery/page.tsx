'use client';

import React, {useEffect, useState, useRef, useCallback} from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQueryState } from 'nuqs';
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
    const [error, setError] = useState<boolean>(false);
    const PAGE_SIZE = 8;
    const hasFetchedRef = useRef(false);
    const didFirstLoad = useRef(false);
    const t = useTranslations("Gallery");

    // Use nuqs to manage the lightbox state via URL
    const [lightboxDocumentId, setLightboxDocumentId] = useQueryState('image', {
        defaultValue: null,
        parse: (value) => value || null,
        serialize: (value) => value || '',
        clearOnDefault: true
    });

    // Calculate lightbox index from documentId
    const lightboxIndex = lightboxDocumentId
        ? images.findIndex(img => img.documentId === lightboxDocumentId)
        : null;

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

    // Effect to handle lightbox opening when URL contains image parameter
    useEffect(() => {
        if (lightboxDocumentId && images.length > 0) {
            const imageExists = images.some(img => img.documentId === lightboxDocumentId);

            if (imageExists) {
                // Disable scroll when lightbox is open
                document.body.style.overflow = 'hidden';
            } else {
                // If image doesn't exist in current loaded images, we might need to load more
                // You could implement logic here to fetch more pages until the image is found
                console.warn(`Image with documentId ${lightboxDocumentId} not found in loaded images`);
            }
        } else if (!lightboxDocumentId) {
            // Re-enable scroll when lightbox is closed
            document.body.style.overflow = '';
        }
    }, [lightboxDocumentId, images]);

    // Open lightbox using view transition if available
    const openLightbox = useCallback((index: number) => {
        const img = images[index];
        if (!img?.documentId) return;

        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                setLightboxDocumentId(img.documentId);
            });
        } else {
            setLightboxDocumentId(img.documentId);
        }
    }, [images, setLightboxDocumentId]);

    // Close lightbox by clearing the URL parameter
    const closeLightbox = useCallback(() => {
        setLightboxDocumentId(null);
    }, [setLightboxDocumentId]);

    // Navigate to next/previous image in lightbox
    const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
        if (lightboxIndex === null) return;

        let newIndex: number;
        if (direction === 'next') {
            newIndex = lightboxIndex + 1 >= images.length ? 0 : lightboxIndex + 1;
        } else {
            newIndex = lightboxIndex - 1 < 0 ? images.length - 1 : lightboxIndex - 1;
        }

        const newImg = images[newIndex];
        if (newImg?.documentId) {
            setLightboxDocumentId(newImg.documentId);
        }
    }, [lightboxIndex, images, setLightboxDocumentId]);

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

                {lightboxIndex !== null && lightboxIndex >= 0 && (
                    <Lightbox
                        images={images}
                        initialIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onNavigate={navigateLightbox}
                    />
                )}
            </div>
        </div>
    );
}