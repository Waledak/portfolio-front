function LoadingHomeSkeleton() {
    return (
        <div className="py-10 w-11/12 sm:w-10/12 md:4/6 xl:w-3/6 mx-auto">
            {/* Header Skeleton */}
            <header className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Image Skeleton */}
                <figure className="sm:justify-self-end justify-self-center">
                    <div className="skeleton w-[150px] h-[150px] rounded-3xl"></div>
                </figure>

                {/* Text Side Skeleton */}
                <section className="flex flex-col sm:col-span-2 rounded-3xl bg-white/30 backdrop-blur-sm justify-center px-6 py-6 text-black w-full">
                    <div className="skeleton h-10 w-64 mb-2"></div>
                    <div className="skeleton h-6 w-40 mt-1"></div>
                    <div className="space-y-2 mt-6">
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-5/6"></div>
                        <div className="skeleton h-4 w-4/6"></div>
                    </div>

                    <nav className="flex justify-between flex-wrap items-center gap-4 mt-3">
                        <div className="skeleton h-10 w-20 rounded-full"></div>
                        <div className="flex gap-4 items-center flex-wrap">
                            <div className="skeleton h-10 w-28 rounded-full"></div>
                            <div className="skeleton h-10 w-28 rounded-full"></div>
                        </div>
                    </nav>
                </section>
            </header>

            {/* Skills Section Skeleton */}
            <section className="col-span-3 mt-9 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
                <div className="skeleton h-12 w-40 rounded-3xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-3 auto-cols-fr">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <article
                            key={index}
                            className="px-4 py-2 bg-neutral-200/30 text-sm rounded-3xl w-full min-h-36 flex flex-col"
                        >
                            <div className="skeleton h-6 w-6 mb-1"></div>
                            <div className="skeleton h-8 w-40 mb-3"></div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {Array.from({ length: 3 }).map((_, tagIndex) => (
                                    <div key={tagIndex} className="skeleton h-6 w-16 rounded-full"></div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* About Section Skeleton */}
            <section className="col-span-3 mt-9 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
                <div className="skeleton h-12 w-40 rounded-3xl"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
                    {/* Markdown description skeleton */}
                    <article className="px-4 py-2 bg-neutral-200/30 rounded-3xl text-black text-justify row-span-2 md:col-span-2 prose prose-neutral">
                        <div className="space-y-3">
                            <div className="skeleton h-5 w-full"></div>
                            <div className="skeleton h-5 w-full"></div>
                            <div className="skeleton h-5 w-3/4"></div>
                            <div className="skeleton h-5 w-full"></div>
                            <div className="skeleton h-5 w-5/6"></div>
                            <div className="skeleton h-5 w-4/5"></div>
                        </div>
                    </article>

                    {/* Photo Carousel skeleton */}
                    <div className="skeleton h-64 rounded-xl"></div>

                    {/* Map skeleton */}
                    <div className="skeleton h-64 w-full rounded-xl"></div>
                </div>
            </section>

            {/* Contact Section Skeleton */}
            <footer className="col-span-3 mt-9 gap-3 flex flex-col items-center justify-center border-primary border-2 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
                <div className="skeleton h-8 w-40"></div>
                <div className="skeleton h-4 w-64"></div>

                <div className="flex flex-wrap mt-5 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="skeleton h-8 w-32 rounded-full"
                        ></div>
                    ))}
                </div>
            </footer>
        </div>
    );
}
export default LoadingHomeSkeleton;