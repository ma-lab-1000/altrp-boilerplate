export interface FrontmatterData {
  title: string
  description?: string
  date?: string
  author?: string
  authorId?: string
  tags?: string[]
  category?: string
  image?: string
  coverImage?: string
  draft?: boolean
  featured?: boolean
  [key: string]: any
}

export interface FrontmatterValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Default required fields for frontmatter
 */
export const DEFAULT_REQUIRED_FIELDS = ['title']

/**
 * Validate frontmatter data structure
 */
export function validateFrontmatter(
  data: Record<string, any>,
  requiredFields: string[] = DEFAULT_REQUIRED_FIELDS
): FrontmatterValidation {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Check required fields
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  }
  
  // Validate date format
  if (data.date && !isValidDate(data.date)) {
    errors.push(`Invalid date format: ${data.date}`)
  }
  
  // Validate tags array
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array')
  }
  
  // Validate image URLs
  if (data.image && !isValidUrl(data.image)) {
    warnings.push(`Image URL may be invalid: ${data.image}`)
  }
  
  if (data.coverImage && !isValidUrl(data.coverImage)) {
    warnings.push(`Cover image URL may be invalid: ${data.coverImage}`)
  }
  
  // Check for common typos
  if (data.coverimage && !data.coverImage) {
    warnings.push('Did you mean "coverImage" instead of "coverimage"?')
  }
  
  if (data.author && data.authorId) {
    warnings.push('Both "author" and "authorId" are present. Consider using only "authorId" for consistency.')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Normalize frontmatter data to consistent format
 */
export function normalizeFrontmatter(data: Record<string, any>): FrontmatterData {
  const normalized: FrontmatterData = {
    title: data.title || 'Untitled',
    description: data.description || data.desc || '',
    date: data.date || new Date().toISOString(),
    author: data.author || '',
    authorId: data.authorId || data.author_id || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category || data.cat || '',
    image: data.image || data.img || '',
    coverImage: data.coverImage || data.coverimage || data.cover || '',
    draft: Boolean(data.draft),
    featured: Boolean(data.featured)
  }
  
  // Add any additional fields
  Object.keys(data).forEach(key => {
    if (!(key in normalized)) {
      normalized[key] = data[key]
    }
  })
  
  return normalized
}

/**
 * Generate SEO-friendly frontmatter
 */
export function generateSEOFrontmatter(
  data: FrontmatterData,
  options: {
    generateDescription?: boolean
    maxDescriptionLength?: number
    addOpenGraph?: boolean
  } = {}
): Record<string, any> {
  const { generateDescription = true, maxDescriptionLength = 160, addOpenGraph = true } = options
  
  const seoData: Record<string, any> = {
    ...data
  }
  
  // Generate description if not provided
  if (generateDescription && !data.description) {
    // This would typically use the content, but we don't have it here
    seoData.description = `Read about ${data.title.toLowerCase()}`
  }
  
  // Add Open Graph data
  if (addOpenGraph) {
    seoData.ogTitle = data.title
    seoData.ogDescription = data.description
    seoData.ogImage = data.coverImage || data.image
    seoData.ogType = 'article'
    
    if (data.date) {
      seoData.ogPublishedTime = data.date
    }
    
    if (data.author) {
      seoData.ogAuthor = data.author
    }
  }
  
  return seoData
}

/**
 * Check if a string is a valid date
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Check if a string is a valid URL
 */
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch {
    return false
  }
}
