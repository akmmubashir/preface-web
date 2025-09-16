// src/lib/client/api.ts
const API_BASE_URL = 'https://king-prawn-app-x9z27.ondigitalocean.app'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success?: boolean
}

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, string | number | boolean>
  requiresAuth?: boolean
  signal?: AbortSignal
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params, signal } = options

    // Build URL with query parameters
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    // Add default language parameter
    url.searchParams.append('lang', 'en')

    // Prepare headers
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }

    // Prepare request config
    const config: RequestInit = {
      method,
      headers: requestHeaders,
      signal,
    }

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(url.toString(), config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`) as ApiError
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: (error as any).status,
        } as ApiError
      }
      throw {
        message: 'An unexpected error occurred',
      } as ApiError
    }
  }

  // GET request
  async get<T>(endpoint: string, options: Omit<ApiOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  // POST request
  async post<T>(
    endpoint: string,
    body: any,
    options: Omit<ApiOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body: any,
    options: Omit<ApiOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  // DELETE request
  async delete<T>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body: any,
    options: Omit<ApiOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body })
  }
}

// Export singleton instance
export const clientApi = new ApiClient(API_BASE_URL)
