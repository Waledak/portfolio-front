export default function GallerySkeleton() {
    const heights = [200, 250, 300, 350, 280, 320];

    return (
        <div className="p-5 my-5 w-full mx-auto bg-base-100 rounded-3xl">
            {/* Masonry-like skeleton layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={`skeleton-${index}`}
                        className="mb-4 relative overflow-hidden bg-gray-200 animate-pulse rounded-lg break-inside-avoid"
                        style={{ height: `${heights[index % heights.length]}px` }}
                    />
                ))}
            </div>
        </div>
    );
}