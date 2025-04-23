'use client';

import Image from 'next/image';
import type {ProjectItem} from '@/types/strapi.type';

type ProjectCardProps = {
    project: ProjectItem;
    clampLines?: number;
};

export default function ProjectCard({
                                        project,
                                    }: ProjectCardProps) {
    return (
        <div className="card bg-base-100 w-full shadow-sm mx-auto">
            <figure className="relative w-full h-36">
                <Image
                    fill
                    src={project.image.formats.large?.url ?? project.image.url}
                    alt={project.image.name}
                    className="object-contain p-3"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-black flex-wrap">
                    {project.name}
                    <div className="badge badge-sm badge-secondary ml-2">
                        {project.type}
                    </div>
                </h2>

                <p className="text-gray-700 mb-2">
                    {project.description}
                </p>

                <div className="card-actions gap-0">
                    {project.techno.map((techno, idx) => (
                        <div className="w-full" key={`${techno.id}-${idx}`}>
                            <div className="flex flex-wrap gap-2">
                                <div className="badge badge-outline badge-sm badge-secondary">
                                    {techno.name}
                                </div>
                                {techno.tags.map((tag) => (
                                    <div
                                        className="badge badge-sm badge-secondary"
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                            {idx < project.techno.length - 1 && (
                                <div className="divider my-2 h-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
