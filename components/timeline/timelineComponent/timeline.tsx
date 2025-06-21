import React from "react";
import "./timeline.css"

export interface TimelineProps {
    children: React.ReactNode
}

const Timeline: React.FC<TimelineProps> = ({children}) => {
    return (
        <div className="vertical-timeline">
            {children}
        </div>
    )
}
export default Timeline