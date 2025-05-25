import { Skill } from "@/types/strapi.type";
import SkillCard from "@/components/ui/SkillCard";
import Section from "@/components/ui/Section";

interface SkillsGridProps {
    title: string;
    skills: Skill[];
}

/**
 * A grid component that displays a collection of skills
 */
export default function SkillsGrid({ title, skills }: SkillsGridProps) {
    return (
        <Section title={title}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-cols-fr">
                {skills?.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>
        </Section>
    );
}
