import matter from 'gray-matter'

export interface MDXContent {
  content: string
  data: Record<string, any>
  excerpt?: string
}

export interface MDXOptions {
  excerpt?: boolean
  excerpt_separator?: string
  engines?: Record<string, any>
}

/**
 * Parse MDX content and extract frontmatter
 */
export function parseMDX(
  source: string,
  options: MDXOptions = {}
): MDXContent {
  const { content, data, excerpt } = matter(source, options)
  
  return {
    content,
    data,
    excerpt
  }
}

/**
 * Extract frontmatter data from MDX content
 */
export function extractFrontmatter(source: string): Record<string, any> {
  const { data } = matter(source)
  return data
}

/**
 * Validate required frontmatter fields
 */
export function validateMDXFrontmatter(
  data: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field => !data[field])
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}

/**
 * Generate excerpt from MDX content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160,
  separator: string = ' '
): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[*_`~]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(separator)
  
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

/**
 * Parse MDX files from directory
 */
export async function parseMDXFiles(
  files: string[],
  options: MDXOptions = {}
): Promise<Array<MDXContent & { filepath: string }>> {
  const results = []
  
  for (const filepath of files) {
    try {
      const response = await fetch(filepath)
      const source = await response.text()
      const parsed = parseMDX(source, options)
      
      results.push({
        ...parsed,
        filepath
      })
    } catch (error) {
      console.warn(`Failed to parse MDX file: ${filepath}`, error)
    }
  }
  
  return results
}
