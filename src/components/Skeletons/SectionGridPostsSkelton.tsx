import React from "react";

const SectionGridPostsSkeleton = () => {
  return (
    <div className="section-grid-posts relative">
      {/* Heading skeleton */}
      <div
        className="mb-10 flex flex-col items-start space-y-2"
      >
        <div className="h-6 w-48 md:h-8 md:w-64 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-600 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div
        className="grid gap-x-6 gap-y-8 md:gap-x-7 md:gap-y-10 grid-cols-12"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="col-span-4 max-md:col-span-full flex flex-col overflow-hidden animate-pulse"
          >
            {/* Thumbnail */}
            <div className="w-full h-48 md:h-48 bg-gray-700 rounded-lg" />

            {/* Title */}
            <div className="pt-4 space-y-3">
              <div className="h-4 w-3/4 bg-gray-600 rounded" />
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-500 rounded-full" />
                <div className="h-3 w-1/3 bg-gray-500 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGridPostsSkeleton;
