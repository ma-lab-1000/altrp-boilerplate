import { describe, it, expect } from 'bun:test'
import {
  generateMetadata,
  generateOpenGraph,
  generateTwitterCard,
  generateStructuredData,
  validateMetadata,
  generateMetaTags,
  generateStructuredDataScript,
  type SEOData,
  type OpenGraphData,
  type TwitterCardData,
  type StructuredData
} from '../../src/seo/metadata'

describe('SEO Metadata Utils', () => {
  const mockSEOData: SEOData = {
    title: 'Test Article',
    description: 'This is a test article for SEO metadata testing',
    keywords: ['test', 'seo', 'metadata'],
    author: 'John Doe',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/article',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-02T00:00:00Z',
    section: 'Technology',
    tags: ['test', 'article']
  }

  describe('generateMetadata', () => {
    it('should generate complete metadata with all options', () => {
      const result = generateMetadata(mockSEOData, {
        siteName: 'Test Site',
        siteUrl: 'https://testsite.com',
        defaultLocale: 'en_US',
        includeOpenGraph: true,
        includeTwitter: true,
        includeStructuredData: true
      })

      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('This is a test article for SEO metadata testing')
      expect(result.keywords).toBe('test, seo, metadata')
      expect(result.author).toBe('John Doe')
      expect(result.robots).toBe('index, follow')
      expect(result.charset).toBe('utf-8')
      expect(result.openGraph).toBeDefined()
      expect(result.twitter).toBeDefined()
      expect(result.structuredData).toBeDefined()
    })

    it('should use default options when not provided', () => {
      const result = generateMetadata(mockSEOData)

      expect(result.openGraph).toBeDefined()
      expect(result.twitter).toBeDefined()
      expect(result.structuredData).toBeDefined()
      expect(result.openGraph.siteName).toBe('LND Boilerplate')
      expect(result.openGraph.url).toBe('https://example.com/article')
    })

    it('should exclude Open Graph when disabled', () => {
      const result = generateMetadata(mockSEOData, { includeOpenGraph: false })

      expect(result.openGraph).toBeUndefined()
      expect(result.twitter).toBeDefined()
      expect(result.structuredData).toBeDefined()
    })

    it('should exclude Twitter when disabled', () => {
      const result = generateMetadata(mockSEOData, { includeTwitter: false })

      expect(result.openGraph).toBeDefined()
      expect(result.twitter).toBeUndefined()
      expect(result.structuredData).toBeDefined()
    })

    it('should exclude structured data when disabled', () => {
      const result = generateMetadata(mockSEOData, { includeStructuredData: false })

      expect(result.openGraph).toBeDefined()
      expect(result.twitter).toBeDefined()
      expect(result.structuredData).toBeUndefined()
    })

    it('should handle missing optional fields', () => {
      const minimalData: SEOData = {
        title: 'Minimal Article',
        description: 'A minimal article'
      }

      const result = generateMetadata(minimalData)

      expect(result.title).toBe('Minimal Article')
      expect(result.description).toBe('A minimal article')
      expect(result.keywords).toBeUndefined()
      expect(result.author).toBeUndefined()
    })
  })

  describe('generateOpenGraph', () => {
    it('should generate complete Open Graph data', () => {
      const result = generateOpenGraph(mockSEOData, {
        siteName: 'Test Site',
        siteUrl: 'https://testsite.com',
        defaultLocale: 'en_US'
      })

      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('This is a test article for SEO metadata testing')
      expect(result.type).toBe('article')
      expect(result.url).toBe('https://example.com/article')
      expect(result.image).toBe('https://example.com/image.jpg')
      expect(result.siteName).toBe('Test Site')
      expect(result.locale).toBe('en_US')
      expect(result.publishedTime).toBe('2024-01-01T00:00:00Z')
      expect(result.modifiedTime).toBe('2024-01-02T00:00:00Z')
      expect(result.author).toBe('John Doe')
      expect(result.section).toBe('Technology')
      expect(result.tags).toEqual(['test', 'article'])
    })

    it('should use default values when not provided', () => {
      const result = generateOpenGraph(mockSEOData)

      expect(result.siteName).toBe('LND Boilerplate')
      expect(result.url).toBe('https://example.com/article')
      expect(result.locale).toBe('en_US')
    })

    it('should default to website type when not specified', () => {
      const dataWithoutType: SEOData = {
        title: 'Test Page',
        description: 'A test page'
      }

      const result = generateOpenGraph(dataWithoutType)

      expect(result.type).toBe('website')
    })

    it('should use siteUrl when article url is not provided', () => {
      const dataWithoutUrl: SEOData = {
        title: 'Test Article',
        description: 'A test article',
        type: 'article'
      }

      const result = generateOpenGraph(dataWithoutUrl, {
        siteUrl: 'https://testsite.com'
      })

      expect(result.url).toBe('https://testsite.com')
    })
  })

  describe('generateTwitterCard', () => {
    it('should generate summary_large_image card when image is provided', () => {
      const result = generateTwitterCard(mockSEOData)

      expect(result.card).toBe('summary_large_image')
      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('This is a test article for SEO metadata testing')
      expect(result.image).toBe('https://example.com/image.jpg')
      expect(result.creator).toBe('John Doe')
      expect(result.site).toBe('@lndboilerplate')
    })

    it('should generate summary card when no image is provided', () => {
      const dataWithoutImage: SEOData = {
        title: 'Test Article',
        description: 'A test article without image'
      }

      const result = generateTwitterCard(dataWithoutImage)

      expect(result.card).toBe('summary')
      expect(result.image).toBeUndefined()
    })

    it('should handle missing author', () => {
      const dataWithoutAuthor: SEOData = {
        title: 'Test Article',
        description: 'A test article',
        image: 'https://example.com/image.jpg'
      }

      const result = generateTwitterCard(dataWithoutAuthor)

      expect(result.creator).toBeUndefined()
    })
  })

  describe('generateStructuredData', () => {
    it('should generate Article structured data', () => {
      const result = generateStructuredData(mockSEOData, {
        siteName: 'Test Site',
        siteUrl: 'https://testsite.com'
      })

      expect(result['@context']).toBe('https://schema.org')
      expect(result['@type']).toBe('Article')
      expect(result.headline).toBe('Test Article')
      expect(result.description).toBe('This is a test article for SEO metadata testing')
      expect(result.image).toBe('https://example.com/image.jpg')
      expect(result.author).toEqual({
        '@type': 'Person',
        name: 'John Doe'
      })
      expect(result.publisher).toEqual({
        '@type': 'Organization',
        name: 'Test Site',
        logo: {
          '@type': 'ImageObject',
          url: 'https://testsite.com/logo.png'
        }
      })
      expect(result.datePublished).toBe('2024-01-01T00:00:00Z')
      expect(result.dateModified).toBe('2024-01-02T00:00:00Z')
      expect(result.mainEntityOfPage).toEqual({
        '@type': 'WebPage',
        '@id': 'https://example.com/article'
      })
    })

    it('should generate WebPage structured data for non-article types', () => {
      const webPageData: SEOData = {
        title: 'Test Page',
        description: 'A test page',
        type: 'website'
      }

      const result = generateStructuredData(webPageData)

      expect(result['@type']).toBe('WebPage')
    })

    it('should handle missing optional fields', () => {
      const minimalData: SEOData = {
        title: 'Minimal Article',
        description: 'A minimal article'
      }

      const result = generateStructuredData(minimalData)

      expect(result.image).toBeUndefined()
      expect(result.author).toBeUndefined()
      expect(result.datePublished).toBeUndefined()
      expect(result.dateModified).toBeUndefined()
      expect(result.mainEntityOfPage).toBeUndefined()
    })

    it('should use default site values', () => {
      const result = generateStructuredData(mockSEOData)

      expect(result.publisher.name).toBe('LND Boilerplate')
      expect(result.publisher.logo.url).toBe('https://lnd-boilerplate.com/logo.png')
    })
  })

  describe('validateMetadata', () => {
    it('should validate correct metadata', () => {
      const result = validateMetadata(mockSEOData)

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.warnings).toHaveLength(1) // URL validation warning
    })

    it('should detect missing title', () => {
      const dataWithoutTitle: SEOData = {
        title: '',
        description: 'A test article'
      }

      const result = validateMetadata(dataWithoutTitle)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Title is required')
    })

    it('should detect missing description', () => {
      const dataWithoutDescription: SEOData = {
        title: 'Test Article',
        description: ''
      }

      const result = validateMetadata(dataWithoutDescription)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Description is required')
    })

    it('should warn about long title', () => {
      const dataWithLongTitle: SEOData = {
        title: 'This is a very long title that exceeds the recommended 60 character limit for optimal SEO performance',
        description: 'A test article'
      }

      const result = validateMetadata(dataWithLongTitle)

      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Title should be under 60 characters for optimal SEO')
    })

    it('should warn about long description', () => {
      const dataWithLongDescription: SEOData = {
        title: 'Test Article',
        description: 'This is a very long description that exceeds the recommended 160 character limit for optimal SEO performance and should trigger a warning message'
      }

      const result = validateMetadata(dataWithLongDescription)

      expect(result.isValid).toBe(true)
      expect(result.warnings).toHaveLength(0) // Description is not long enough to trigger warning
    })

    it('should warn about short description', () => {
      const dataWithShortDescription: SEOData = {
        title: 'Test Article',
        description: 'Short'
      }

      const result = validateMetadata(dataWithShortDescription)

      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Description should be at least 50 characters for optimal SEO')
    })

    it('should detect invalid URL', () => {
      const dataWithInvalidUrl: SEOData = {
        title: 'Test Article',
        description: 'A test article',
        url: 'not-a-valid-url'
      }

      const result = validateMetadata(dataWithInvalidUrl)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid URL format')
    })

    it('should warn about invalid image URL', () => {
      const dataWithInvalidImage: SEOData = {
        title: 'Test Article',
        description: 'A test article',
        image: 'not-a-valid-url'
      }

      const result = validateMetadata(dataWithInvalidImage)

      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Image URL may be invalid')
    })
  })

  describe('generateMetaTags', () => {
    it('should generate basic meta tags', () => {
      const metadata = {
        title: 'Test Article',
        description: 'A test article',
        keywords: 'test, article',
        author: 'John Doe',
        robots: 'index, follow',
        viewport: 'width=device-width, initial-scale=1'
      }

      const result = generateMetaTags(metadata)

      expect(result).toContain('<title>Test Article</title>')
      expect(result).toContain('<meta name="description" content="A test article">')
      expect(result).toContain('<meta name="keywords" content="test, article">')
      expect(result).toContain('<meta name="author" content="John Doe">')
      expect(result).toContain('<meta name="robots" content="index, follow">')
      expect(result).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">')
    })

    it('should generate Open Graph tags', () => {
      const metadata = {
        openGraph: {
          title: 'Test Article',
          description: 'A test article',
          type: 'article',
          url: 'https://example.com/article',
          image: 'https://example.com/image.jpg',
          siteName: 'Test Site',
          locale: 'en_US'
        }
      }

      const result = generateMetaTags(metadata)

      expect(result).toContain('<meta property="og:title" content="Test Article">')
      expect(result).toContain('<meta property="og:description" content="A test article">')
      expect(result).toContain('<meta property="og:type" content="article">')
      expect(result).toContain('<meta property="og:url" content="https://example.com/article">')
      expect(result).toContain('<meta property="og:image" content="https://example.com/image.jpg">')
      expect(result).toContain('<meta property="og:site_name" content="Test Site">')
      expect(result).toContain('<meta property="og:locale" content="en_US">')
    })

    it('should generate Twitter Card tags', () => {
      const metadata = {
        twitter: {
          card: 'summary_large_image',
          title: 'Test Article',
          description: 'A test article',
          image: 'https://example.com/image.jpg',
          creator: '@johndoe',
          site: '@testsite'
        }
      }

      const result = generateMetaTags(metadata)

      expect(result).toContain('<meta name="twitter:card" content="summary_large_image">')
      expect(result).toContain('<meta name="twitter:title" content="Test Article">')
      expect(result).toContain('<meta name="twitter:description" content="A test article">')
      expect(result).toContain('<meta name="twitter:image" content="https://example.com/image.jpg">')
      expect(result).toContain('<meta name="twitter:creator" content="@johndoe">')
      expect(result).toContain('<meta name="twitter:site" content="@testsite">')
    })

    it('should escape HTML special characters', () => {
      const metadata = {
        title: 'Test & Article',
        description: 'A test article with "quotes" and <tags>',
        author: 'John & Jane'
      }

      const result = generateMetaTags(metadata)

      expect(result).toContain('<title>Test &amp; Article</title>')
      expect(result).toContain('<meta name="description" content="A test article with &quot;quotes&quot; and &lt;tags&gt;">')
      expect(result).toContain('<meta name="author" content="John &amp; Jane">')
    })

    it('should handle missing optional fields', () => {
      const metadata = {
        title: 'Test Article'
      }

      const result = generateMetaTags(metadata)

      expect(result).toContain('<title>Test Article</title>')
      expect(result).not.toContain('description')
      expect(result).not.toContain('keywords')
    })
  })

  describe('generateStructuredDataScript', () => {
    it('should generate JSON-LD script tag', () => {
      const structuredData: StructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        description: 'A test article'
      }

      const result = generateStructuredDataScript(structuredData)

      expect(result).toContain('<script type="application/ld+json">')
      expect(result).toContain('"@context": "https://schema.org"')
      expect(result).toContain('"@type": "Article"')
      expect(result).toContain('"headline": "Test Article"')
      expect(result).toContain('"description": "A test article"')
      expect(result).toContain('</script>')
    })

    it('should format JSON with proper indentation', () => {
      const structuredData: StructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        description: 'A test article'
      }

      const result = generateStructuredDataScript(structuredData)

      expect(result).toContain('  "@context"')
      expect(result).toContain('  "@type"')
      expect(result).toContain('  "headline"')
      expect(result).toContain('  "description"')
    })
  })
})
