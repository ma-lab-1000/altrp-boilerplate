import { describe, it, expect } from 'bun:test'
import {
  generateSitemap,
  generateSitemapIndex,
  generateSitemapFromContent,
  validateSitemapUrls,
  generateRobotsTxt,
  type SitemapUrl,
  type SitemapOptions
} from '../../src/seo/sitemap'

describe('Sitemap Utils', () => {
  const mockUrls: SitemapUrl[] = [
    {
      loc: 'https://example.com/',
      lastmod: '2024-01-01T00:00:00Z',
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: 'https://example.com/about',
      lastmod: '2024-01-02T00:00:00Z',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: 'https://example.com/blog/post-1',
      lastmod: '2024-01-03T00:00:00Z',
      changefreq: 'weekly',
      priority: 0.6,
      image: {
        loc: 'https://example.com/images/post-1.jpg',
        title: 'Post 1 Image',
        caption: 'Featured image for post 1'
      }
    }
  ]

  describe('generateSitemap', () => {
    it('should generate basic sitemap XML', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls
      }

      const result = generateSitemap(options)

      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      expect(result).toContain('<url>')
      expect(result).toContain('<loc>https://example.com/</loc>')
      expect(result).toContain('<lastmod>2024-01-01T00:00:00Z</lastmod>')
      expect(result).toContain('<changefreq>daily</changefreq>')
      expect(result).toContain('<priority>1</priority>')
      expect(result).toContain('</urlset>')
    })

    it('should include image namespace when includeImages is true', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        includeImages: true
      }

      const result = generateSitemap(options)

      expect(result).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')
    })

    it('should include news namespace when includeNews is true', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        includeNews: true
      }

      const result = generateSitemap(options)

      expect(result).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')
    })

    it('should include video namespace when includeVideo is true', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        includeVideo: true
      }

      const result = generateSitemap(options)

      expect(result).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"')
    })

    it('should include custom namespaces', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        customNamespaces: {
          'xmlns:custom': 'https://example.com/custom-schema'
        }
      }

      const result = generateSitemap(options)

      expect(result).toContain('xmlns:custom="https://example.com/custom-schema"')
    })

    it('should include image data when includeImages is true', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        includeImages: true
      }

      const result = generateSitemap(options)

      expect(result).toContain('<image:image>')
      expect(result).toContain('<image:loc>https://example.com/images/post-1.jpg</image:loc>')
      expect(result).toContain('<image:title>Post 1 Image</image:title>')
      expect(result).toContain('<image:caption>Featured image for post 1</image:caption>')
      expect(result).toContain('</image:image>')
    })

    it('should not include image data when includeImages is false', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: mockUrls,
        includeImages: false
      }

      const result = generateSitemap(options)

      expect(result).not.toContain('<image:image>')
      expect(result).not.toContain('<image:loc>')
    })

    it('should handle URLs without optional fields', () => {
      const minimalUrls: SitemapUrl[] = [
        {
          loc: 'https://example.com/simple'
        }
      ]

      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: minimalUrls
      }

      const result = generateSitemap(options)

      expect(result).toContain('<loc>https://example.com/simple</loc>')
      expect(result).not.toContain('<lastmod>')
      expect(result).not.toContain('<changefreq>')
      expect(result).not.toContain('<priority>')
    })

    it('should escape XML special characters', () => {
      const urlsWithSpecialChars: SitemapUrl[] = [
        {
          loc: 'https://example.com/page?param=value&other=test',
          image: {
            loc: 'https://example.com/image.jpg',
            title: 'Image with "quotes" & symbols',
            caption: 'Caption with <tags> and & symbols'
          }
        }
      ]

      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: urlsWithSpecialChars,
        includeImages: true
      }

      const result = generateSitemap(options)

      expect(result).toContain('&amp;')
      expect(result).toContain('&quot;')
      expect(result).toContain('&lt;')
      expect(result).toContain('&gt;')
    })

    it('should handle empty URLs array', () => {
      const options: SitemapOptions = {
        siteUrl: 'https://example.com',
        urls: []
      }

      const result = generateSitemap(options)

      expect(result).toContain('<urlset')
      expect(result).toContain('</urlset>')
      expect(result).not.toContain('<url>')
    })
  })

  describe('generateSitemapIndex', () => {
    it('should generate sitemap index XML', () => {
      const sitemaps = [
        {
          loc: 'https://example.com/sitemap-pages.xml',
          lastmod: '2024-01-01T00:00:00Z'
        },
        {
          loc: 'https://example.com/sitemap-blog.xml',
          lastmod: '2024-01-02T00:00:00Z'
        }
      ]

      const result = generateSitemapIndex(sitemaps)

      expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(result).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      expect(result).toContain('<sitemap>')
      expect(result).toContain('<loc>https://example.com/sitemap-pages.xml</loc>')
      expect(result).toContain('<lastmod>2024-01-01T00:00:00Z</lastmod>')
      expect(result).toContain('</sitemapindex>')
    })

    it('should handle sitemaps without lastmod', () => {
      const sitemaps = [
        {
          loc: 'https://example.com/sitemap.xml'
        }
      ]

      const result = generateSitemapIndex(sitemaps)

      expect(result).toContain('<loc>https://example.com/sitemap.xml</loc>')
      expect(result).not.toContain('<lastmod>')
    })

    it('should handle empty sitemaps array', () => {
      const result = generateSitemapIndex([])

      expect(result).toContain('<sitemapindex')
      expect(result).toContain('</sitemapindex>')
      expect(result).not.toContain('<sitemap>')
    })
  })

  describe('generateSitemapFromContent', () => {
    it('should generate sitemap from content data', () => {
      const content = [
        {
          slug: 'home',
          lastmod: '2024-01-01T00:00:00Z',
          changefreq: 'daily' as const,
          priority: 1.0
        },
        {
          slug: 'about',
          lastmod: '2024-01-02T00:00:00Z',
          changefreq: 'monthly' as const,
          priority: 0.8
        },
        {
          slug: 'blog/post-1',
          lastmod: '2024-01-03T00:00:00Z',
          changefreq: 'weekly' as const,
          priority: 0.6,
          images: [
            {
              url: 'https://example.com/images/post-1.jpg',
              title: 'Post 1 Image',
              caption: 'Featured image'
            }
          ]
        }
      ]

      const options = {
        siteUrl: 'https://example.com',
        basePath: '/blog',
        includeImages: true
      }

      const result = generateSitemapFromContent(content, options)

      expect(result).toContain('<loc>https://example.com/blog/home</loc>')
      expect(result).toContain('<loc>https://example.com/blog/about</loc>')
      expect(result).toContain('<loc>https://example.com/blog/blog/post-1</loc>')
      expect(result).toContain('<image:loc>https://example.com/images/post-1.jpg</image:loc>')
    })

    it('should handle content without basePath', () => {
      const content = [
        {
          slug: 'home',
          lastmod: '2024-01-01T00:00:00Z'
        }
      ]

      const options = {
        siteUrl: 'https://example.com',
        includeImages: false
      }

      const result = generateSitemapFromContent(content, options)

      expect(result).toContain('<loc>https://example.com/home</loc>')
    })

    it('should handle content without images when includeImages is false', () => {
      const content = [
        {
          slug: 'post-1',
          images: [
            {
              url: 'https://example.com/image.jpg',
              title: 'Image'
            }
          ]
        }
      ]

      const options = {
        siteUrl: 'https://example.com',
        includeImages: false
      }

      const result = generateSitemapFromContent(content, options)

      expect(result).not.toContain('<image:')
    })

    it('should handle empty content array', () => {
      const options = {
        siteUrl: 'https://example.com'
      }

      const result = generateSitemapFromContent([], options)

      expect(result).toContain('<urlset')
      expect(result).toContain('</urlset>')
      expect(result).not.toContain('<url>')
    })
  })

  describe('validateSitemapUrls', () => {
    it('should validate correct URLs', () => {
      const validUrls: SitemapUrl[] = [
        {
          loc: 'https://example.com/',
          lastmod: '2024-01-01T00:00:00Z',
          changefreq: 'daily',
          priority: 1.0
        }
      ]

      const result = validateSitemapUrls(validUrls)

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should detect invalid URLs', () => {
      const invalidUrls: SitemapUrl[] = [
        {
          loc: 'not-a-valid-url',
          lastmod: '2024-01-01T00:00:00Z',
          changefreq: 'daily',
          priority: 1.0
        }
      ]

      const result = validateSitemapUrls(invalidUrls)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('URL 1: Invalid URL format - not-a-valid-url')
    })

    it('should detect invalid priority values', () => {
      const invalidPriorityUrls: SitemapUrl[] = [
        {
          loc: 'https://example.com/',
          priority: 1.5
        },
        {
          loc: 'https://example.com/about',
          priority: -0.1
        }
      ]

      const result = validateSitemapUrls(invalidPriorityUrls)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('URL 1: Priority must be between 0.0 and 1.0 - 1.5')
      expect(result.errors).toContain('URL 2: Priority must be between 0.0 and 1.0 - -0.1')
    })

    it('should detect invalid changefreq values', () => {
      const invalidChangefreqUrls: SitemapUrl[] = [
        {
          loc: 'https://example.com/',
          changefreq: 'invalid' as any
        }
      ]

      const result = validateSitemapUrls(invalidChangefreqUrls)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('URL 1: Invalid changefreq value - invalid')
    })

    it('should detect invalid lastmod format', () => {
      const invalidLastmodUrls: SitemapUrl[] = [
        {
          loc: 'https://example.com/',
          lastmod: 'invalid-date'
        }
      ]

      const result = validateSitemapUrls(invalidLastmodUrls)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('URL 1: Invalid lastmod format - invalid-date')
    })

    it('should handle multiple validation errors', () => {
      const multipleErrorUrls: SitemapUrl[] = [
        {
          loc: 'invalid-url',
          priority: 2.0,
          changefreq: 'invalid' as any,
          lastmod: 'invalid-date'
        }
      ]

      const result = validateSitemapUrls(multipleErrorUrls)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(4)
    })

    it('should handle empty URLs array', () => {
      const result = validateSitemapUrls([])

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('generateRobotsTxt', () => {
    it('should generate default robots.txt', () => {
      const result = generateRobotsTxt({})

      expect(result).toContain('User-agent: *')
      expect(result).toContain('Allow: /')
    })

    it('should generate robots.txt with custom user agents', () => {
      const options = {
        userAgents: [
          {
            agent: 'Googlebot',
            rules: [
              { type: 'allow' as const, path: '/' },
              { type: 'disallow' as const, path: '/admin' }
            ]
          },
          {
            agent: 'Bingbot',
            rules: [
              { type: 'allow' as const, path: '/' }
            ]
          }
        ]
      }

      const result = generateRobotsTxt(options)

      expect(result).toContain('User-agent: Googlebot')
      expect(result).toContain('Allow: /')
      expect(result).toContain('Disallow: /admin')
      expect(result).toContain('User-agent: Bingbot')
    })

    it('should include sitemap URL', () => {
      const options = {
        sitemap: 'https://example.com/sitemap.xml'
      }

      const result = generateRobotsTxt(options)

      expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
    })

    it('should include crawl delay', () => {
      const options = {
        userAgents: [
          {
            agent: 'Googlebot',
            rules: [{ type: 'allow' as const, path: '/' }]
          }
        ],
        crawlDelay: 5
      }

      const result = generateRobotsTxt(options)

      expect(result).toContain('Crawl-delay: 5')
    })

    it('should handle empty user agents with sitemap', () => {
      const options = {
        sitemap: 'https://example.com/sitemap.xml'
      }

      const result = generateRobotsTxt(options)

      expect(result).toContain('User-agent: *')
      expect(result).toContain('Allow: /')
      expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
    })

    it('should handle complex robots.txt configuration', () => {
      const options = {
        userAgents: [
          {
            agent: '*',
            rules: [
              { type: 'allow' as const, path: '/' },
              { type: 'disallow' as const, path: '/admin' },
              { type: 'disallow' as const, path: '/private' }
            ]
          },
          {
            agent: 'BadBot',
            rules: [
              { type: 'disallow' as const, path: '/' }
            ]
          }
        ],
        sitemap: 'https://example.com/sitemap.xml',
        crawlDelay: 10
      }

      const result = generateRobotsTxt(options)

      expect(result).toContain('User-agent: *')
      expect(result).toContain('Allow: /')
      expect(result).toContain('Disallow: /admin')
      expect(result).toContain('Disallow: /private')
      expect(result).toContain('Crawl-delay: 10')
      expect(result).toContain('User-agent: BadBot')
      expect(result).toContain('Disallow: /')
      expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
    })
  })
})
