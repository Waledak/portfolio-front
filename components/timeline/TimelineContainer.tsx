import {TimelineContainerProps} from "@/components/timeline/types";
import {useFormatter, useTranslations} from "next-intl";
import * as LucideIcons from "lucide-react";
import React from "react";
import {TimelineBadge} from "@/types/strapi.type";
import Image from "next/image";
import Timeline from "@/components/timeline/timelineComponent/timeline";
import TimelineElement from "@/components/timeline/timelineComponent/timelineElement";
import {TimelineElementContent} from "@/components/timeline/index";

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
                            <TimelineElementContent description={item.description} location={item.location} subtitle={item.subtitle} title={item.title} type={item.type} technologies={item.technologies} />
                        </TimelineElement>
                    )
                })
            }
        </Timeline>
    )
}

export default TimelineContainer