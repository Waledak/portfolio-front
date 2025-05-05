import Masonry from 'react-masonry-css';

const GallerySkeleton: React.FC = () => {
    const items = Array(6).fill(0);
    const heights = [200, 250, 300, 350, 280, 320];

    return (
        <Masonry
            breakpointCols={{
                default: 3,
                1100: 2,
                700: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {items.map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="mb-4 relative overflow-hidden bg-gray-200 animate-pulse rounded-lg"
                    style={{ height: `${heights[index % heights.length]}px` }}
                />
            ))}
        </Masonry>
    );
};

export default GallerySkeleton;