'use client';

import React from 'react';
import {useTranslations} from "next-intl";

export default function ProjectsLoading() {
    const skeletonCards = Array.from({ length: 3 }, (_, index) => index);
    const t = useTranslations("Project")
    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            {/* Skeleton pour le titre */}
            <h1 className="m-5 text-3xl sm:text-4xl " id="projectTitle">{t("title")}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {skeletonCards.map((index) => (
                    <SkeletonProjectCard key={index} />
                ))}
            </div>
        </div>
    );
}

function SkeletonProjectCard() {
    return (
        <div className="card bg-base-100 w-full shadow-sm mx-auto">
            {/* Skeleton pour l'image */}
            <figure className="relative w-full h-36">
                <div className="skeleton w-full h-full"></div>
            </figure>

            <div className="card-body">
                {/* Skeleton pour le titre et le badge */}
                <div className="flex items-center">
                    <div className="skeleton h-7 w-32"></div>
                    <div className="ml-2 skeleton h-5 w-16 rounded-full"></div>
                </div>

                {/* Skeleton pour la description */}
                <div className="space-y-2 mt-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                    <div className="skeleton h-4 w-4/6"></div>
                </div>

                {/* Skeleton pour les technologies */}
                <div className="card-actions gap-0 mt-4">
                    <div className="w-full">
                        {/* Première technologie */}
                        <div className="divider divider-start my-2 h-1">
                            <div className="skeleton h-5 w-24"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="skeleton h-3 w-16 rounded-full"></div>
                            <div className="skeleton h-3 w-20 rounded-full"></div>
                            <div className="skeleton h-3 w-14 rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-full mt-2">
                        {/* Deuxième technologie */}
                        <div className="divider divider-start my-2 h-1">
                            <div className="skeleton h-5 w-20"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="skeleton h-3 w-12 rounded-full"></div>
                            <div className="skeleton h-3 w-16 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}