'use client'

import SectionMagazine4 from './SectionMagazine4' // adjust the path

const ClientSideVisuals = ({ dict, posts, lang }: { dict: any; posts: any; lang: string }) => {
  // const { data: latestVideos, isLoading, error } = useLatestVideos(8);
  // console.log(latestVideos,"latestVideos");
  // const displayPosts = latestVideos?.data || [];
  // console.log(displayPosts);

  return (
    <div className="bg-[#000000] py-10 md:py-14 lg:py-20 dark:bg-[#0D0D0D]">
      <div className="relative container">
        <SectionMagazine4
          heading={dict.sections.visuals.heading}
          subHeading={dict.sections.visuals.description}
          // posts={displayPosts.slice(0, 6) as any}
          posts={posts.slice(0, 6) as any}
          headingColor="light"
          lang={lang}
        />
      </div>
    </div>
  )
}

export default ClientSideVisuals
