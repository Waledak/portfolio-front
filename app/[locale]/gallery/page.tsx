import { fetchGallery } from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import {Gallery} from "@/components/gallery";
import './gallery.css';

export default async function GalleryPage() {
    const initialData = await fetchGallery(1, 8);
    const t = await getTranslations('Gallery');
    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 2xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <h1 className="m-5 text-3xl sm:text-4xl" id="galleryTitle">
                {t('title')}
            </h1>
            <Gallery
                initialImages={initialData.data}
                initialHasMore={initialData.meta.pagination.page < initialData.meta.pagination.pageCount}
                noMorePhotoText={t('noMorePhoto')}
            />
        </div>
    );
}