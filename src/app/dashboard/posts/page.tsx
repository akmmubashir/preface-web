import LocalDate from '@/components/LocalDate'
import PaginationWrapper from '@/components/PaginationWrapper'
import { ProtectedRoute } from '@/contexts/AuthContext'
import { getAllPosts } from '@/data/posts'
import { Badge } from '@/shared/Badge'
import Image from 'next/image'
import Link from 'next/link'

// Dynamically import with no SSR
// const ProtectedRoute = dynamic(
//   () => import('@/contexts/AuthContext').then((mod) => mod.ProtectedRoute),
//   { ssr: false }
// )

export const metadata = {
  title: 'Dashboard - Posts',
  description: 'Dashboard - Posts',
}

async function DashboardPostsPage() {
  const posts = (await getAllPosts()).slice(0, 10)
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 ps-3 pe-4 text-left text-sm font-semibold sm:ps-0 rtl:text-right">
                  Post
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Stats
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Date created
                </th>
                <th scope="col" className="relative py-3.5 ps-3 pe-4 sm:pe-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                    <div className="flex items-center">
                      <div className="relative size-14 shrink-0">
                        <Image
                          alt={post.title}
                          src={post.featuredImage}
                          className="rounded-full object-cover"
                          fill
                          sizes="100px"
                        />
                      </div>
                      <div className="ms-4">
                        <div className="font-medium">{post.title}</div>
                        <div className="mt-1 text-gray-500 dark:text-gray-400">{post.categories[0].name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-5 text-sm whitespace-nowrap">
                    <div className="">{post.viewCount} views</div>
                    <div className="mt-1 text-gray-500 dark:text-gray-400">{post.commentCount} comments</div>
                  </td>

                  <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    <Badge color={post.status === 'published' ? 'green' : 'red'}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    <LocalDate date={post.date} />
                  </td>
                  <td className="relative py-5 ps-3 pe-4 text-right text-sm font-medium whitespace-nowrap sm:pe-0">
                    <Link href={`#`} className="underline">
                      Edit<span className="sr-only">, {post.title}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationWrapper className="mt-16" />
    </div>
  )
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPostsPage />
    </ProtectedRoute>
  )
}
