"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { LightboxProps } from './types';

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose, onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);

    // Sync currentIndex with initialIndex when it changes (from URL navigation)
    useEffect(() => {
        if (initialIndex !== currentIndex) {
            setCurrentIndex(initialIndex);
            setIsLoading(true);
        }
    }, [initialIndex, currentIndex]);

    const currentImage = images[currentIndex];

    const handlePrev = useCallback(() => {
        if (onNavigate) {
            onNavigate('prev');
        } else {
            // Fallback for backward compatibility
            setIsLoading(true);
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }
    }, [onNavigate, images.length]);

    const handleNext = useCallback(() => {
        if (onNavigate) {
            onNavigate('next');
        } else {
            // Fallback for backward compatibility
            setIsLoading(true);
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
    }, [onNavigate, images.length]);

    // Close on ESC key press and handle arrow navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, onClose]); // Remove currentIndex dependency since we're using onNavigate

    // Stop propagation to prevent closing when clicking the image container
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Updated client-side download handler
    const handleDownload = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            if (!currentImage?.image?.url) {
                console.error('No image URL available');
                return;
            }

            // Prepare the filename
            const filename = currentImage.image.name || 'downloaded-image.jpg';

            // Create the API URL with parameters
            const apiUrl = `/api/download-image?${new URLSearchParams({
                url: currentImage.image.url,
                filename: filename
            })}`;

            // Fetch from your API route
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            // Create blob from response
            const imageBlob = await response.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            // Create and trigger download
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = filename;
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            URL.revokeObjectURL(imageURL);

        } catch (error) {
            console.error('Error downloading image:', error);
            // Optional: Show user feedback
            alert('Failed to download image. Please try again.');
        }
    }, [currentImage]);

    // Handle loading state when image changes
    useEffect(() => {
        setIsLoading(true);
    }, [currentImage?.image?.url]);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-lg transition-opacity duration-300"
            onClick={onClose}
        >
            {/* Top Controls using Flexbox */}
            <div className="z-20 fixed w-full flex justify-end items-center p-4 pb-0 gap-4">
                <button
                    onClick={handleDownload}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 transition-colors cursor-pointer"
                    aria-label="Download Image"
                >
                    <Download size={24} />
                </button>

                <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Main content area - keeping original structure */}
            <div className="flex-1 flex items-center justify-center relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                    }}
                    className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Previous Image"
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    className="relative max-w-[90dvw] h-full flex items-center justify-center p-4"
                    onClick={handleContentClick}
                >
                    {isLoading && (
                        <div className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center">
                            <div className="w-full h-full rounded-full border-4 border-t-white border-white/30 animate-spin"></div>
                        </div>
                    )}

                    <Image
                        src={currentImage.image.url}
                        alt={currentImage.image.name || 'Gallery Image'}
                        width={currentImage.image.width || 1200}
                        height={currentImage.image.height || 800}
                        className={`max-h-[90dvh] max-w-full object-contain transition-opacity duration-300 ease-in-out
                ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        priority
                    />
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Next Image"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 text-white text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
};

export default Lightbox;