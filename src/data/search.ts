import { getAuthors } from './authors'
import { getCategories, getTags } from './categories'
import { getAllPosts } from './posts'

export async function getSearchResults(query: string, type: 'posts' | 'categories' | 'tags' | 'authors') {
  switch (type) {
    case 'categories':
      return {
        query,
        categories: (await getCategories()).slice(0, 15).sort(() => Math.random() - 0.5),
        totalResults: 1500,
        recommendedSearches: ['Travel', 'Food', 'Fashion', 'Technology'],
      }
    case 'tags':
      return {
        query,
        tags: (await getTags()).sort(() => Math.random() - 0.5),
        totalResults: 1000,
        recommendedSearches: ['Travel', 'Food', 'Fashion', 'Technology'],
      }
    case 'authors':
      return {
        query,
        authors: (await getAuthors()).slice(0, 12).sort(() => Math.random() - 0.5),
        totalResults: 200,
        recommendedSearches: ['Design', 'Photo', 'Vector', 'Frontend'],
      }
    default:
      return {
        query,
        posts: (await getAllPosts()).slice(0, 12).sort(() => Math.random() - 0.5),
        totalResults: 1135,
        recommendedSearches: ['Design', 'Photo', 'Vector', 'Frontend'],
      }
  }
}
