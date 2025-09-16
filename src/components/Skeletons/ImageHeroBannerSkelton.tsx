import React from "react";

const ImageHeroBannerSkeleton = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background skeleton */}
      <div className="absolute inset-0 animate-pulse">
        <div className="h-full w-full bg-gray-400" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90 z-10" />

      {/* Main content skeleton */}
      <div className="absolute inset-0 container flex items-end pb-24 z-20">
        {/* Left side */}
        <div className="flex flex-1 flex-col pr-2 md:pr-8">
          <div className="mb-4 h-6 w-3/4 md:h-10 md:w-2/3 rounded bg-gray-500 animate-pulse" />
          <div className="h-4 w-1/2 md:h-5 md:w-1/3 rounded bg-gray-600 animate-pulse" />

          <div className="mt-6 h-10 w-32 rounded bg-gray-500 animate-pulse" />
        </div>

        {/* Right side (dots skeleton) */}
        <div className="hidden md:flex flex-1 justify-end">
          <div className="flex space-x-2 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`${i === 0 ? "w-4 bg-gray-600" : "h-2 w-2 bg-gray-500"} rounded-full animate-pulse`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageHeroBannerSkeleton;
