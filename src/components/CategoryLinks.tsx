'use client'

import type { TCategory } from '@/data/categories'
import { getCategories } from '@/data/categories'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CategoryLinksProps {
  className?: string
}

export default function CategoryLinks({ className = '' }: CategoryLinksProps) {
  const [categories, setCategories] = useState<TCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Dynamic Category Routes</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.handle}`}
            className="block rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">/{category.handle}</div>
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">{category.count} posts</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">Example URLs:</h4>
        <div className="space-y-1 text-sm">
          <div className="text-blue-700 dark:text-blue-300">
            • <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">/muhammed</code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            • <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">/islam-for-beginners</code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            • <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">/holy-quran</code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            • <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">/pillars-of-faith</code>
          </div>
        </div>
      </div>
    </div>
  )
}
