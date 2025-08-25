export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  author?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'blog' | 'product'
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export interface OpenGraphData {
  title: string
  description: string
  type: string
  url: string
  image?: string
  siteName?: string
  locale?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  title: string
  description: string
  image?: string
  creator?: string
  site?: string
}

export interface StructuredData {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string
  author?: {
    '@type': string
    name: string
  }
  publisher?: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
  datePublished?: string
  dateModified?: string
  mainEntityOfPage?: {
    '@type': string
    '@id': string
  }
}

/**
 * Generate complete SEO metadata object
 */
export function generateMetadata(
  data: SEOData,
  options: {
    siteName?: string
    siteUrl?: string
    defaultLocale?: string
    includeOpenGraph?: boolean
    includeTwitter?: boolean
    includeStructuredData?: boolean
  } = {}
): Record<string, any> {
  const {
    siteName = 'LND Boilerplate',
    siteUrl = 'https://lnd-boilerplate.com',
    defaultLocale = 'en_US',
    includeOpenGraph = true,
    includeTwitter = true,
    includeStructuredData = true
  } = options
  
  const metadata: Record<string, any> = {
    title: data.title,
    description: data.description,
    keywords: data.keywords?.join(', '),
    author: data.author,
    robots: 'index, follow',
    charset: 'utf-8'
  }
  
  // Open Graph
  if (includeOpenGraph) {
    metadata.openGraph = generateOpenGraph(data, { siteName, siteUrl, defaultLocale })
  }
  
  // Twitter Card
  if (includeTwitter) {
    metadata.twitter = generateTwitterCard(data)
  }
  
  // Structured Data
  if (includeStructuredData) {
    metadata.structuredData = generateStructuredData(data, { siteName, siteUrl })
  }
  
  return metadata
}

/**
 * Generate Open Graph metadata
 */
export function generateOpenGraph(
  data: SEOData,
  options: { siteName?: string; siteUrl?: string; defaultLocale?: string } = {}
): OpenGraphData {
  const { siteName = 'LND Boilerplate', siteUrl = 'https://lnd-boilerplate.com', defaultLocale = 'en_US' } = options
  
  return {
    title: data.title,
    description: data.description,
    type: data.type || 'website',
    url: data.url || siteUrl,
    image: data.image,
    siteName,
    locale: defaultLocale,
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
    author: data.author,
    section: data.section,
    tags: data.tags
  }
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(data: SEOData): TwitterCardData {
  return {
    card: data.image ? 'summary_large_image' : 'summary',
    title: data.title,
    description: data.description,
    image: data.image,
    creator: data.author,
    site: '@lndboilerplate'
  }
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(
  data: SEOData,
  options: { siteName?: string; siteUrl?: string } = {}
): StructuredData {
  const { siteName = 'LND Boilerplate', siteUrl = 'https://lnd-boilerplate.com' } = options
  
  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': data.type === 'article' ? 'Article' : 'WebPage',
    headline: data.title,
    description: data.description
  }
  
  if (data.image) {
    structuredData.image = data.image
  }
  
  if (data.author) {
    structuredData.author = {
      '@type': 'Person',
      name: data.author
    }
  }
  
  structuredData.publisher = {
    '@type': 'Organization',
    name: siteName,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`
    }
  }
  
  if (data.publishedTime) {
    structuredData.datePublished = data.publishedTime
  }
  
  if (data.modifiedTime) {
    structuredData.dateModified = data.modifiedTime
  }
  
  if (data.url) {
    structuredData.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': data.url
    }
  }
  
  return structuredData
}

/**
 * Validate SEO metadata
 */
export function validateMetadata(data: SEOData): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Required fields
  if (!data.title) {
    errors.push('Title is required')
  }
  
  if (!data.description) {
    errors.push('Description is required')
  }
  
  // Title length validation
  if (data.title && data.title.length > 60) {
    warnings.push('Title should be under 60 characters for optimal SEO')
  }
  
  // Description length validation
  if (data.description && data.description.length > 160) {
    warnings.push('Description should be under 160 characters for optimal SEO')
  }
  
  if (data.description && data.description.length < 50) {
    warnings.push('Description should be at least 50 characters for optimal SEO')
  }
  
  // URL validation
  if (data.url && !isValidUrl(data.url)) {
    errors.push('Invalid URL format')
  }
  
  // Image URL validation
  if (data.image && !isValidUrl(data.image)) {
    warnings.push('Image URL may be invalid')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Generate meta tags HTML
 */
export function generateMetaTags(metadata: Record<string, any>): string {
  const tags: string[] = []
  
  // Basic meta tags
  if (metadata.title) {
    tags.push(`<title>${escapeHtml(metadata.title)}</title>`)
  }
  
  if (metadata.description) {
    tags.push(`<meta name="description" content="${escapeHtml(metadata.description)}">`)
  }
  
  if (metadata.keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(metadata.keywords)}">`)
  }
  
  if (metadata.author) {
    tags.push(`<meta name="author" content="${escapeHtml(metadata.author)}">`)
  }
  
  if (metadata.robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(metadata.robots)}">`)
  }
  
  if (metadata.viewport) {
    tags.push(`<meta name="viewport" content="${escapeHtml(metadata.viewport)}">`)
  }
  
  // Open Graph tags
  if (metadata.openGraph) {
    const og = metadata.openGraph
    tags.push(`<meta property="og:title" content="${escapeHtml(og.title)}">`)
    tags.push(`<meta property="og:description" content="${escapeHtml(og.description)}">`)
    tags.push(`<meta property="og:type" content="${escapeHtml(og.type)}">`)
    tags.push(`<meta property="og:url" content="${escapeHtml(og.url)}">`)
    
    if (og.image) {
      tags.push(`<meta property="og:image" content="${escapeHtml(og.image)}">`)
    }
    
    if (og.siteName) {
      tags.push(`<meta property="og:site_name" content="${escapeHtml(og.siteName)}">`)
    }
    
    if (og.locale) {
      tags.push(`<meta property="og:locale" content="${escapeHtml(og.locale)}">`)
    }
  }
  
  // Twitter Card tags
  if (metadata.twitter) {
    const twitter = metadata.twitter
    tags.push(`<meta name="twitter:card" content="${escapeHtml(twitter.card)}">`)
    tags.push(`<meta name="twitter:title" content="${escapeHtml(twitter.title)}">`)
    tags.push(`<meta name="twitter:description" content="${escapeHtml(twitter.description)}">`)
    
    if (twitter.image) {
      tags.push(`<meta name="twitter:image" content="${escapeHtml(twitter.image)}">`)
    }
    
    if (twitter.creator) {
      tags.push(`<meta name="twitter:creator" content="${escapeHtml(twitter.creator)}">`)
    }
    
    if (twitter.site) {
      tags.push(`<meta name="twitter:site" content="${escapeHtml(twitter.site)}">`)
    }
  }
  
  return tags.join('\n  ')
}

/**
 * Generate structured data script tag
 */
export function generateStructuredDataScript(structuredData: StructuredData): string {
  return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`
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

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  
  return text.replace(/[&<>"']/g, m => map[m])
}
