import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryImageProps } from './types';

const GalleryImage: React.FC<GalleryImageProps> = ({ img, index, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className="cursor-pointer mb-4 relative group"
            onClick={() => onClick(index)}
        >
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={img.image.formats?.medium?.url || img.image.url}
                    alt={img.image.name || 'Gallery Image'}
                    width={img.image.width || 500}
                    height={img.image.height || 300}
                    className={`w-full transition-all duration-300 ease-in-out
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                    group-hover:scale-105`}
                    onLoad={() => setIsLoading(false)}
                    blurDataURL={img.image.formats?.thumbnail?.url || img.image.url}
                    placeholder="blur"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
            </div>
        </div>
    );
};

export default GalleryImage;