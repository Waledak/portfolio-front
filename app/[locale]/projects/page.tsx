import { fetchProjects } from '@/lib/strapi';
import ProjectCardsContainer from "@/components/project/ProjectCardsContainer";
import "./project.css"

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const projects = await fetchProjects(locale, 1, 25);
    return (
        <ProjectCardsContainer projectData={projects.data} />
    );
}
