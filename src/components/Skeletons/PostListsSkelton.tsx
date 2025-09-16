import Card16PodcastSkeleton from './Card16PodcastSkeleton'

const PostListsSkelton = () => {
  return (
    <div className="pt-6 lg:pt-10">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card16PodcastSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export default PostListsSkelton
