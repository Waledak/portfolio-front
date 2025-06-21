const TimelineElementContentSkeleton = () => (
    <div>
        <div className="flex justify-between gap-2 flex-wrap">
            <h2 className="text-3xl bg-base-300 h-9 w-64 rounded-lg skeleton"></h2>
            <div className="badge badge-outline badge-secondary bg-base-300 w-20 h-6 skeleton"></div>
        </div>

        <h3 className="text-lg bg-base-300 h-7 w-48 rounded-lg mt-4 skeleton"></h3>
        <p className="text-justify my-3 space-y-2">
            <span className="block bg-base-300 h-4 w-full rounded-lg skeleton"></span>
            <span className="block bg-base-300 h-4 w-5/6 rounded-lg skeleton"></span>
            <span className="block bg-base-300 h-4 w-4/5 rounded-lg skeleton"></span>
        </p>
        <div className="flex my-2 gap-2">
            <div className="badge badge-secondary bg-base-300 w-16 h-6 skeleton"></div>
            <div className="badge badge-secondary bg-base-300 w-20 h-6 skeleton"></div>
            <div className="badge badge-secondary bg-base-300 w-14 h-6 skeleton"></div>
        </div>
        <small className="flex justify-end italic bg-base-300 h-4 w-32 rounded-lg ml-auto skeleton"></small>
    </div>
)
export default TimelineElementContentSkeleton