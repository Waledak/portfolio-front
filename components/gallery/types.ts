import { GalleryItem } from '@/types/strapi.type';

export interface GalleryImageProps {
    img: GalleryItem;
    index: number;
    onClick: (index: number) => void;
}

export interface LightboxProps {
    images: GalleryItem[];
    initialIndex: number;
    onClose: () => void;
    onNavigate?: (direction: 'next' | 'prev') => void;
}

export interface GalleryProps {
    pageSize?: number;
    initialPage?: number;
}