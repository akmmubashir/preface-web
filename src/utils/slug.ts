/**
 * Utility functions for slug handling
 */

/**
 * Convert a name to a URL-friendly slug
 * @param name - The source name
 * @returns URL-friendly slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Validate if a slug matches a given name
 * @param slug - The URL slug
 * @param name - The source name
 * @returns boolean indicating if the slug is valid for the name
 */
export function validateSlug(slug: string, name: string): boolean {
  const expected = generateSlug(name)
  return slug.toLowerCase() === expected.toLowerCase()
}

/**
 * Find an item by slug with flexible matching
 * @param slug - The URL slug
 * @param items - Array of items that have `handle` and `name`
 * @returns The matching item or null
 */
export function findBySlug<T extends { handle?: string; name: string }>(slug: string, items: T[]): T | null {
  const normalized = slug.toLowerCase().trim()

  // First try exact handle match
  let item = items.find((it) => (it.handle ?? '').toLowerCase() === normalized)

  if (!item) {
    // Try matching by generated slug from name
    item = items.find((it) => generateSlug(it.name).toLowerCase() === normalized)
  }

  if (!item) {
    // Try partial/legacy matching
    item = items.find(
      (it) =>
        it.name.toLowerCase().replace(/\s+/g, '-') === normalized ||
        it.name.toLowerCase().replace(/\s+/g, '') === normalized
    )
  }

  return item ?? null
}
