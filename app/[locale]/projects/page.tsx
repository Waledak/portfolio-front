import { fetchProjects } from '@/lib/strapi';
import ProjectCard from "@/components/project/ProjectCard";

export default async function projectsPage({
       params,
    }: {
        params: Promise<{ locale: string }>;
    }) {
    const { locale } = await params;
    const projects = await fetchProjects(locale);

    return (
        <div className="py-10 mt-5 w-11/12 sm:w-10/12 md:w-4/6 xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <div className="px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.data.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}    // nombre de lignes avant "Voir plus"
                    />
                ))}
            </div>
        </div>
    );
}
