import {TimelineContainerProps} from "@/components/timeline/types";
import {useFormatter, useTranslations} from "next-intl";
import * as LucideIcons from "lucide-react";
import React from "react";
import {TimelineBadge} from "@/types/strapi.type";
import Image from "next/image";
import Timeline from "@/components/timeline/timelineComponent/timeline";
import TimelineElement from "@/components/timeline/timelineComponent/timelineElement";

const TimelineContainer = ({timelineItems}: TimelineContainerProps) => {
    const format = useFormatter();
    const t = useTranslations("Journey")

    const badgeComponent = (component: TimelineBadge) => {
        if("name" in component) {
            const Icon = (LucideIcons[component.name as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>);
            return <Icon />;
        }
        if ('image' in component) {
            return <Image
                src={component.image.formats?.small?.url ?? component.image.url}
                alt={component.image.alternativeText ?? ''}
                fill
                className="object-cover overflow-hidden  w-full h-full"
            />
        }
        return <div></div>
    }

    return (
        <Timeline>
            {
                timelineItems.map((item) => {
                    const badge = item.badge[0]
                    return (
                        <TimelineElement
                            key={item.documentId}
                            date={
                                <p>
                                    {format.dateTime(new Date(item.startDate), {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                    &nbsp;-&nbsp;
                                    {
                                        item.endDate
                                            ? format.dateTime(new Date(item.endDate), {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : t("today")
                                    }
                                </p>
                            }
                            badge={badge ? badgeComponent(badge) : null}
                        >
                            <div>
                                <div className="flex justify-between gap-2 flex-wrap">
                                    <h2 className="text-3xl">{item.title}</h2>
                                    <div className="badge badge-outline badge-secondary">{t(`type.${item.type}`)}</div>
                                </div>

                                <h3 className="text-lg">{item.subtitle}</h3>
                                <p className="text-justify my-3">{item.description}</p>
                                <div className="flex my-2">
                                    {
                                        item.technologies.map((technologie) => (
                                            <div className="badge badge-secondary"
                                                 key={technologie.documentId}>{technologie.name}</div>
                                        ))
                                    }
                                </div>
                                <small className="flex justify-end italic">{item.location}</small>
                            </div>
                        </TimelineElement>
                    )
                })
            }
        </Timeline>
    )
}

export default TimelineContainer