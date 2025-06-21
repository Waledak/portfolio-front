import {fetchTimelineItem} from '@/lib/strapi';
import { getTranslations } from 'next-intl/server';
import "./journey.css"
import {TimelineContainer} from "@/components/timeline";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const initialData = await fetchTimelineItem(locale);
    const t = await getTranslations('Journey');
    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 2xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <h1 className="m-5 text-3xl sm:text-4xl" id="journeyTitle">
                {t('title')}
            </h1>
            <TimelineContainer timelineItems={initialData.data}></TimelineContainer>
        </div>
    );
}