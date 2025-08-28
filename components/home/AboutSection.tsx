import ReactMarkdown from 'react-markdown'
import PhotoCarousel from "@/components/media/PhotoCarousel";
import MapWrapper from "@/components/map/MapWrapper";
import { StrapiMedia } from "@/types/strapi.type";
import Section from "@/components/ui/Section";

interface AboutSectionProps {
    title: string;
    content: string;
    photos: StrapiMedia[];
}

/**
 * About section component displaying personal information, photos, and location
 */
export default function AboutSection({ title, content, photos }: AboutSectionProps) {
    return (
        <Section title={title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Markdown description */}
                <article className="px-4 py-2 bg-white shadow-sm rounded-3xl text-black text-justify row-span-2 md:col-span-2 prose prose-neutral">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>

                {/* Photo Carousel */}
                <PhotoCarousel images={photos} />

                {/* Map */}
                <div className="justify-self-center">
                    <MapWrapper />
                </div>
            </div>
        </Section>
    );
}
