import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { LightboxProps } from './types';

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);
    const currentImage = images[currentIndex];

    // Close on ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePrev = useCallback(() => {
        setIsLoading(true);
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback(() => {
        setIsLoading(true);
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Stop propagation to prevent closing when clicking the image container
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg transition-opacity duration-300"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white z-10 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close"
            >
                <X size={24} />
            </button>

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
                className="relative max-w-[90dvw] w-full h-full flex items-center justify-center p-4"
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
    );
};

export default Lightbox;