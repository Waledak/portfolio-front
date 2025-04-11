'use client'

import * as HeroIcons from '@heroicons/react/24/outline'
import {Skill} from "@/types/strapi.type";

type SkillsGridProps = {
    title: string
    skills: Skill[]
}

export default function SkillsGrid({ title, skills }: SkillsGridProps) {
    return (
        <section className="col-span-3 mt-9 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            <h2 className="bg-neutral-200/30 w-fit p-4 backdrop-blur-sm rounded-3xl text-3xl">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-3 auto-cols-fr">
                {skills?.map((skill) => {
                    const Icon = HeroIcons[skill.logo as keyof typeof HeroIcons] ?? HeroIcons.ExclamationCircleIcon
                    return (
                        <article
                            key={skill.id}
                            className="px-4 py-2 bg-neutral-200/30 text-sm rounded-3xl w-full min-h-36 flex flex-col"
                        >
                            <Icon className="w-6 h-6 mb-1 text-primary" />
                            <h3 className="text-xl mb-3 border-b-[1px] pb-2 border-neutral">{skill.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skill.tags.map((tag) => (
                                    <span key={tag.id} className="badge badge-soft badge-primary">
                    {tag.name}
                  </span>
                                ))}
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
