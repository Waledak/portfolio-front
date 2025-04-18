import { getHomeData } from '@/lib/strapi';
import HeaderIntro from '@/components/home/HeaderIntro';
import 'leaflet/dist/leaflet.css';
import SkillsGrid from "@/components/home/SkillsGrid";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import {notFound} from "next/navigation";

export default async function HomePage({params}: {
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params

    const homePage = await getHomeData(lang)
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
    } = homePage;

    const imgUrl = profilePicture.formats.large?.url || profilePicture.url;
    const alt = profilePicture.alternativeText || fullname;

    if (!homePage) {
        notFound() // ⬅️ va afficher ton not-found.tsx
    }
    return (
            <div className="py-10 w-11/12 sm:w-10/12 md:4/6 xl:w-3/6 mx-auto">
                <HeaderIntro
                    lang={lang}
                    imgUrl={imgUrl}
                    alt={alt}
                    fullname={fullname}
                    baseline={baseline}
                    description={description}
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
}
