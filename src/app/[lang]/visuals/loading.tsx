import React from 'react'
import ImageHeroBannerSkeleton from '@/components/Skeletons/ImageHeroBannerSkelton'
import SectionGridPostsSkeleton from '@/components/Skeletons/SectionGridPostsSkelton'
import SwipableSliderPostsSkeleton from '@/components/Skeletons/SwipableSliderPostsSkelton'

export default function Loading() {
  return (
    <React.Fragment>
      <div className="visuals-page">
        <ImageHeroBannerSkeleton />
      </div>
      <div className="container space-y-10 py-10 md:space-y-14 md:py-14 lg:space-y-20 lg:py-20">
        <div className="relative py-10 md:py-14 lg:py-20"> 
          <SwipableSliderPostsSkeleton />
        </div>
        <div className="relative">
          <SectionGridPostsSkeleton />
        </div>
      </div>
    </React.Fragment>
  )
}
