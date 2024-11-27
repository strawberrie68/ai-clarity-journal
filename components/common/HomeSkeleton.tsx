import React from 'react';
import { SunIcon } from "@radix-ui/react-icons";

const HomeSkeleton = () => {
    return (
        <main className="mx-6 mt-10 pb-8 animate-pulse lg:max-w-screen-lg lg:mx-auto">
            <header className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
                <section>
                    {/* Sun Button Skeleton */}
                    <button
                        className="bg-zinc-200 h-11 w-11 rounded-full flex justify-center items-center"
                        disabled
                    >
                        <SunIcon width={18} height={18} className="text-zinc-400" />
                    </button>

                    {/* Header Text Skeleton */}
                    <div className="mt-10 space-y-4">
                        <div className="h-12 bg-zinc-200 w-40 rounded"></div>
                        <div className="h-12 bg-zinc-200 w-60 rounded"></div>
                    </div>
                </section>

                {/* Profile Nav Skeleton */}
                <section>
                    <div className="h-10 w-10 bg-zinc-200 rounded-full"></div>
                </section>
            </header>

            {/* NavBar Skeleton */}
            <div className="mt-6 space-y-4">
                <div className="h-16 bg-zinc-200 rounded-lg"></div>
                <div className="h-16 bg-zinc-200 rounded-lg"></div>
            </div>

            {/* Bottom Nav Skeleton */}
            <nav className="fixed inset-x-0 bottom-4 px-4 lg:bottom-6 lg:max-w-screen-lg lg:left-1/2 lg:-translate-x-1/2">
                <div className="bg-zinc-200 h-14 rounded-full"></div>
            </nav>
        </main>
    );
};

export default HomeSkeleton;