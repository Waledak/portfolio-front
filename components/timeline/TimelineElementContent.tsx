import React from "react";
import {Technology} from "@/types/strapi.type";

export interface TimelineElementContentProps {
    title: string;
    type: string;
    subtitle: string;
    description: string;
    technologies: Technology[]
    location: string;
}

const TimelineElementContent = ({title, type, description, subtitle, technologies, location}: TimelineElementContentProps) => (
    <div>
        <div className="flex justify-between gap-2 flex-wrap">
            <h2 className="text-3xl">{title}</h2>
            <div className="badge badge-outline badge-secondary">{type}</div>
        </div>

        <h3 className="text-lg">{subtitle}</h3>
        <p className="text-justify my-3">{description}</p>
        <div className="flex my-2">
            {
                technologies.map((technologie) => (
                    <div className="badge badge-secondary"
                         key={technologie.documentId}>{technologie.name}</div>
                ))
            }
        </div>
        <small className="flex justify-end italic">{location}</small>
    </div>
)

export default TimelineElementContent