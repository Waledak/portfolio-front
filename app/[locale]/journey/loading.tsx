import {useTranslations} from "next-intl";
import Timeline from "@/components/timeline/timelineComponent/timeline";
import TimelineElement from "@/components/timeline/timelineComponent/timelineElement";
import React from "react"
import {TimelineElementContentSkeleton} from "@/components/timeline";

function JourneyLoading() {
    const t = useTranslations("Journey")
    const skeletonTimelineItems = Array.from({ length: 3 }, (_, index) => index);
    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            {/* Skeleton pour le titre */}
            <h1 className="m-5 text-3xl sm:text-4xl" id="projectTitle">{t("title")}</h1>
            <Timeline>
                {
                    skeletonTimelineItems.map((item) => {
                        return (
                            <TimelineElement
                                key={item}
                                date={
                                    <p>
                                        <span className="rounded-lg skeleton bg-base-300 w-56 h-24">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                    </p>
                                }
                                badge={<div className="h-full w-full skeleton"></div>}
                            >
                                <TimelineElementContentSkeleton />
                            </TimelineElement>
                        )
                    })
                }
            </Timeline>
        </div>
    );
}

export default JourneyLoading;