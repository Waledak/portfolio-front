import React from "react";
import "./timelineElement.css"

export interface TimelineElement {
    children: React.ReactNode;
    date: React.ReactNode;
    badge: React.ReactNode;
}

const TimelineElement: React.FC<TimelineElement> = ({children, date, badge}) => {
    return (
        <div className="timeline-element">
            <div className="timeline-element-badge overflow-hidden bg-white shadow-sm">
                {badge}
            </div>
            <div className="timeline-element-content rounded-lg bg-white shadow-sm">
                <div className="timeline-element-date">
                    {date}
                </div>
                {children}
            </div>
        </div>
    )
}

export default TimelineElement;