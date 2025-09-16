// src/lib/server/api.ts

const API_BASE_URL = 'https://king-prawn-app-x9z27.ondigitalocean.app'
// const API_BASE_URL = 'http://localhost:8080';

interface ApiOptions {
  requiresAuth?: boolean
  headers?: Record<string, string>
  limit?: number
  page?: number
  parentSlug?: string
  subcategorySlug?: string
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export const serverFetch = {
  get: async <T = any>(url: string, options: ApiOptions & { language?: string } = {}): Promise<T> => {
    const { requiresAuth = false, headers = {}, next, limit, page, language = 'en' } = options

    // Build query parameters
    const params = new URLSearchParams()
    params.append('lang', language)

    // Add limit if provided
    if (limit) {
      params.append('limit', limit.toString())
    }

    // Add page if provided
    if (page) {
      params.append('page', page.toString())
    }

    // Handle URL with query parameters
    const hasQuery = url.includes('?')
    const urlWithParams = `${url}${hasQuery ? '&' : '?'}${params.toString()}`

    // Set up headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    }

    if (requiresAuth) {
      // Auth logic here
    }

    try {
      // console.log(`Making API request to: ${API_BASE_URL}${urlWithParams}`)

      const response = await fetch(`${API_BASE_URL}${urlWithParams}`, {
        method: 'GET',
        headers: requestHeaders,
        next: next, // This works with Next.js fetch
      })

      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status} for URL: ${urlWithParams}`
        console.error(errorMessage)
        throw new Error(errorMessage)
      }

      const data = await response.json()
      // console.log(`API response received for: ${urlWithParams}`)
      return data
    } catch (error) {
      console.error('API Fetch Error:', error)
      throw error
    }
  },
  // Add other methods (post, put, delete) following the same pattern
}
