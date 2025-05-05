import { getHomeData } from '@/lib/strapi';
import HeaderIntro from '@/components/home/HeaderIntro';
import 'leaflet/dist/leaflet.css';
import SkillsGrid from "@/components/home/SkillsGrid";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'fr' },
    ];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }){
    const { locale } = await params;
    const homePage = await getHomeData(locale);

    if (!homePage) {
        notFound();
    }

    const {
        fullname,
        baseline,
        description,
        profilePicture,
        skills,
        aboutMe,
        photosPreview,
        aboutSectionName,
        skillSectionName,
        contactSectionName,
        contactDescription,
        contactLink,
        cv
    } = homePage;

    const imgUrl = profilePicture.formats.large?.url || profilePicture.url;
    const alt = profilePicture.alternativeText || fullname;

    return (
        <div className="py-10 w-11/12 sm:w-10/12 md:4/6 xl:w-3/6 mx-auto">
            <HeaderIntro
                locale={locale}
                imgUrl={imgUrl}
                alt={alt}
                fullname={fullname}
                baseline={baseline}
                description={description}
                cvUrl={cv.url}
            />

            <SkillsGrid title={skillSectionName} skills={skills} />

            <AboutSection
                title={aboutSectionName}
                content={aboutMe}
                photos={photosPreview}
            />

            <ContactSection
                title={contactSectionName}
                description={contactDescription}
                links={contactLink}
            />
        </div>
    );
};