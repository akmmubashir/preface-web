"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/data/categories";
import type { TCategory } from "@/data/categories";

interface CategoryLinksProps {
  className?: string;
}

export default function CategoryLinks({ className = "" }: CategoryLinksProps) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Dynamic Category Routes
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.handle}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {category.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              /{category.handle}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              {category.count} posts
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Example URLs:
        </h4>
        <div className="space-y-1 text-sm">
          <div className="text-blue-700 dark:text-blue-300">
            •{" "}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              /muhammed
            </code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            •{" "}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              /islam-for-beginners
            </code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            •{" "}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              /holy-quran
            </code>
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            •{" "}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              /pillars-of-faith
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
