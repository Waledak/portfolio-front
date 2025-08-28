'use client'

import * as HeroIcons from '@heroicons/react/24/outline'
import { Skill } from "@/types/strapi.type";

interface SkillCardProps {
  skill: Skill;
}

/**
 * A card component that displays a skill with its icon and tags
 */
export default function SkillCard({ skill }: SkillCardProps) {
  // Get the icon from HeroIcons or use ExclamationCircleIcon as fallback
  const Icon = HeroIcons[skill.logo as keyof typeof HeroIcons] ?? HeroIcons.ExclamationCircleIcon;
  
  return (
    <article
      className="px-4 py-2 bg-white shadow-sm text-sm rounded-3xl w-full min-h-36 flex flex-col"
    >
      <Icon className="w-6 h-6 mb-1 text-primary" />
      <h3 className="text-xl mb-3 border-b-[1px] pb-2 border-neutral text-black">{skill.name}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {skill.tags.map((tag) => (
          <span key={tag.id} className="badge badge-soft badge-primary">
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}