export interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  image?: {
    loc: string
    title?: string
    caption?: string
  }
}

export interface SitemapOptions {
  siteUrl: string
  urls: SitemapUrl[]
  includeImages?: boolean
  includeNews?: boolean
  includeVideo?: boolean
  customNamespaces?: Record<string, string>
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(options: SitemapOptions): string {
  const { siteUrl, urls, includeImages = false, includeNews = false, includeVideo = false, customNamespaces = {} } = options
  
  // Default namespaces
  const namespaces: Record<string, string> = {
    'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
  }
  
  if (includeImages) {
    namespaces['xmlns:image'] = 'http://www.google.com/schemas/sitemap-image/1.1'
  }
  
  if (includeNews) {
    namespaces['xmlns:news'] = 'http://www.google.com/schemas/sitemap-news/0.9'
  }
  
  if (includeVideo) {
    namespaces['xmlns:video'] = 'http://www.google.com/schemas/sitemap-video/1.1'
  }
  
  // Add custom namespaces
  Object.assign(namespaces, customNamespaces)
  
  // Build namespace attributes
  const namespaceAttrs = Object.entries(namespaces)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
  sitemap += `<urlset ${namespaceAttrs}>\n`
  
  urls.forEach(url => {
    sitemap += `  <url>\n`
    sitemap += `    <loc>${escapeXml(url.loc)}</loc>\n`
    
    if (url.lastmod) {
      sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`
    }
    
    if (url.changefreq) {
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`
    }
    
    if (url.priority !== undefined) {
      sitemap += `    <priority>${url.priority}</priority>\n`
    }
    
    if (url.image && includeImages) {
      sitemap += `    <image:image>\n`
      sitemap += `      <image:loc>${escapeXml(url.image.loc)}</image:loc>\n`
      
      if (url.image.title) {
        sitemap += `      <image:title>${escapeXml(url.image.title)}</image:title>\n`
      }
      
      if (url.image.caption) {
        sitemap += `      <image:caption>${escapeXml(url.image.caption)}</image:caption>\n`
      }
      
      sitemap += `    </image:image>\n`
    }
    
    sitemap += `  </url>\n`
  })
  
  sitemap += `</urlset>`
  
  return sitemap
}

/**
 * Generate sitemap index file
 */
export function generateSitemapIndex(
  sitemaps: Array<{ loc: string; lastmod?: string }>,
  options: { siteUrl?: string } = {}
): string {
  const { siteUrl = '' } = options
  
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n`
  sitemapIndex += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  
  sitemaps.forEach(sitemap => {
    sitemapIndex += `  <sitemap>\n`
    sitemapIndex += `    <loc>${escapeXml(sitemap.loc)}</loc>\n`
    
    if (sitemap.lastmod) {
      sitemapIndex += `    <lastmod>${sitemap.lastmod}</lastmod>\n`
    }
    
    sitemapIndex += `  </sitemap>\n`
  })
  
  sitemapIndex += `</sitemapindex>`
  
  return sitemapIndex
}

/**
 * Generate sitemap from content data
 */
export function generateSitemapFromContent(
  content: Array<{
    slug: string
    lastmod?: string
    changefreq?: SitemapUrl['changefreq']
    priority?: number
    images?: Array<{ url: string; title?: string; caption?: string }>
  }>,
  options: {
    siteUrl: string
    basePath?: string
    includeImages?: boolean
  }
): string {
  const { siteUrl, basePath = '', includeImages = false } = options
  
  const urls: SitemapUrl[] = content.map(item => {
    const url: SitemapUrl = {
      loc: `${siteUrl}${basePath}/${item.slug}`,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority
    }
    
    if (includeImages && item.images && item.images.length > 0) {
      url.image = {
        loc: item.images[0].url,
        title: item.images[0].title,
        caption: item.images[0].caption
      }
    }
    
    return url
  })
  
  return generateSitemap({
    siteUrl,
    urls,
    includeImages
  })
}

/**
 * Validate sitemap URLs
 */
export function validateSitemapUrls(urls: SitemapUrl[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  urls.forEach((url, index) => {
    // Check if URL is valid
    if (!isValidUrl(url.loc)) {
      errors.push(`URL ${index + 1}: Invalid URL format - ${url.loc}`)
    }
    
    // Check priority range
    if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
      errors.push(`URL ${index + 1}: Priority must be between 0.0 and 1.0 - ${url.priority}`)
    }
    
    // Check changefreq values
    const validChangefreq = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    if (url.changefreq && !validChangefreq.includes(url.changefreq)) {
      errors.push(`URL ${index + 1}: Invalid changefreq value - ${url.changefreq}`)
    }
    
    // Check lastmod format (ISO 8601)
    if (url.lastmod && !isValidDate(url.lastmod)) {
      errors.push(`URL ${index + 1}: Invalid lastmod format - ${url.lastmod}`)
    }
  })
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(options: {
  userAgents?: Array<{ agent: string; rules: Array<{ type: 'allow' | 'disallow'; path: string }> }>
  sitemap?: string
  crawlDelay?: number
}): string {
  const { userAgents = [], sitemap, crawlDelay } = options
  
  let robots = ''
  
  if (userAgents.length === 0) {
    // Default user agent rules
    robots += `User-agent: *\n`
    robots += `Allow: /\n\n`
  } else {
    userAgents.forEach(({ agent, rules }) => {
      robots += `User-agent: ${agent}\n`
      
      rules.forEach(rule => {
        robots += `${rule.type === 'allow' ? 'Allow' : 'Disallow'}: ${rule.path}\n`
      })
      
      if (crawlDelay) {
        robots += `Crawl-delay: ${crawlDelay}\n`
      }
      
      robots += `\n`
    })
  }
  
  if (sitemap) {
    robots += `Sitemap: ${sitemap}\n`
  }
  
  return robots.trim()
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
 * Check if a string is a valid date (ISO 8601)
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
