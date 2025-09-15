import React from "react";
import Skeleton from "../Skeleton";

const BannerSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`relative aspect-16/9 lg:aspect-16/5 ${className}`}>
      <Skeleton className="absolute inset-0 md:rounded-2xl" />

      {/* Gradient overlay */}
      <div className="absolute inset-y-0 left-0 w-1/2 md:rounded-l-2xl bg-gradient-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-10">
        <Skeleton className="h-8 w-64 max-w-full mb-2" />
        <Skeleton className="h-5 w-48 max-w-full" />
      </div>
    </div>
  );
};

export default BannerSkeleton;
