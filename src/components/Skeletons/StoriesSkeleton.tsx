import React from 'react'
import Card11Skeleton from './Card11Skeleton'

const StoriesSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {[...Array(6)].map((_, i) => (
        <Card11Skeleton key={i} className="animate-duration-[2000ms] animate-pulse" />
      ))}
    </div>
  )
}

export default StoriesSkeleton
