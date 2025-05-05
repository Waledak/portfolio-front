import { fetchProjects } from '@/lib/strapi';
import ProjectCardsContainer from "@/components/project/ProjectCardsContainer";
import "./project.css"
import Loading from "./loading"
import {Suspense, use} from "react";

// Composant séparé pour le chargement des données
const ProjectsContent = ({ locale }: { locale: string }) => {
    const projects = use(fetchProjects(locale));
    return <ProjectCardsContainer projectData={projects.data} />;
};

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <Suspense fallback={<Loading />}>
            <ProjectsContent locale={locale} />
        </Suspense>
    );
}