import ProjectCard from "@/components/project/ProjectCard";
import {useTranslations} from "next-intl";
import {ProjectItem} from "@/types/strapi.type";
type ProjectCardsContainerProps = {
    projectData: ProjectItem[]
}

export default function ProjectCardsContainer ({projectData}: ProjectCardsContainerProps) {
    const t = useTranslations("Project")

    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <h1 className="m-5 text-3xl sm:text-4xl " id="projectTitle">{t("title")}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projectData.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}    // nombre de lignes avant "Voir plus"
                    />
                ))}
            </div>
        </div>
    )
}