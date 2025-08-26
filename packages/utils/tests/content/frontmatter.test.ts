import { describe, it, expect } from 'bun:test'
import {
  validateFrontmatter,
  normalizeFrontmatter,
  generateSEOFrontmatter,
  DEFAULT_REQUIRED_FIELDS,
  type FrontmatterData,
  type FrontmatterValidation
} from '../../src/content/frontmatter'

describe('Frontmatter Utils', () => {
  describe('validateFrontmatter', () => {
    it('should validate correct frontmatter', () => {
      const data = {
        title: 'Test Article',
        description: 'A test article',
        date: '2024-01-01',
        author: 'John Doe',
        tags: ['test', 'article'],
        image: 'https://example.com/image.jpg'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.warnings).toHaveLength(0)
    })

    it('should detect missing required fields', () => {
      const data = {
        description: 'A test article'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Missing required field: title')
    })

    it('should detect invalid date format', () => {
      const data = {
        title: 'Test Article',
        date: 'invalid-date'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid date format: invalid-date')
    })

    it('should detect invalid tags format', () => {
      const data = {
        title: 'Test Article',
        tags: 'not-an-array'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Tags must be an array')
    })

    it('should warn about invalid image URLs', () => {
      const data = {
        title: 'Test Article',
        image: 'not-a-url',
        coverImage: 'also-not-a-url'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Image URL may be invalid: not-a-url')
      expect(result.warnings).toContain('Cover image URL may be invalid: also-not-a-url')
    })

    it('should warn about common typos', () => {
      const data = {
        title: 'Test Article',
        coverimage: 'https://example.com/image.jpg'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Did you mean "coverImage" instead of "coverimage"?')
    })

    it('should warn about both author and authorId', () => {
      const data = {
        title: 'Test Article',
        author: 'John Doe',
        authorId: 'john-doe'
      }

      const result = validateFrontmatter(data)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Both "author" and "authorId" are present. Consider using only "authorId" for consistency.')
    })

    it('should use custom required fields', () => {
      const data = {
        title: 'Test Article'
      }

      const result = validateFrontmatter(data, ['title', 'author'])
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Missing required field: author')
    })
  })

  describe('normalizeFrontmatter', () => {
    it('should normalize basic frontmatter', () => {
      const data = {
        title: 'Test Article',
        description: 'A test article',
        date: '2024-01-01',
        author: 'John Doe',
        tags: ['test', 'article'],
        draft: true,
        featured: false
      }

      const result = normalizeFrontmatter(data)
      
      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('A test article')
      expect(result.date).toBe('2024-01-01')
      expect(result.author).toBe('John Doe')
      expect(result.tags).toEqual(['test', 'article'])
      expect(result.draft).toBe(true)
      expect(result.featured).toBe(false)
    })

    it('should handle missing fields with defaults', () => {
      const data = {
        title: 'Test Article'
      }

      const result = normalizeFrontmatter(data)
      
      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('')
      expect(result.date).toBeDefined()
      expect(result.author).toBe('')
      expect(result.authorId).toBe('')
      expect(result.tags).toEqual([])
      expect(result.category).toBe('')
      expect(result.image).toBe('')
      expect(result.coverImage).toBe('')
      expect(result.draft).toBe(false)
      expect(result.featured).toBe(false)
    })

    it('should handle alternative field names', () => {
      const data = {
        title: 'Test Article',
        desc: 'Alternative description',
        author_id: 'john-doe',
        cat: 'technology',
        img: 'https://example.com/image.jpg',
        cover: 'https://example.com/cover.jpg'
      }

      const result = normalizeFrontmatter(data)
      
      expect(result.description).toBe('Alternative description')
      expect(result.authorId).toBe('john-doe')
      expect(result.category).toBe('technology')
      expect(result.image).toBe('https://example.com/image.jpg')
      expect(result.coverImage).toBe('https://example.com/cover.jpg')
    })

    it('should handle non-array tags', () => {
      const data = {
        title: 'Test Article',
        tags: 'single-tag'
      }

      const result = normalizeFrontmatter(data)
      
      expect(result.tags).toEqual([])
    })

    it('should preserve additional fields', () => {
      const data = {
        title: 'Test Article',
        customField: 'custom value',
        anotherField: 123
      }

      const result = normalizeFrontmatter(data)
      
      expect(result.customField).toBe('custom value')
      expect(result.anotherField).toBe(123)
    })
  })

  describe('generateSEOFrontmatter', () => {
    it('should generate basic SEO frontmatter', () => {
      const data: FrontmatterData = {
        title: 'Test Article',
        description: 'A test article',
        date: '2024-01-01',
        author: 'John Doe',
        tags: ['test', 'article'],
        image: 'https://example.com/image.jpg',
        coverImage: 'https://example.com/cover.jpg',
        draft: false,
        featured: true
      }

      const result = generateSEOFrontmatter(data)
      
      expect(result.title).toBe('Test Article')
      expect(result.description).toBe('A test article')
      expect(result.ogTitle).toBe('Test Article')
      expect(result.ogDescription).toBe('A test article')
      expect(result.ogImage).toBe('https://example.com/cover.jpg')
      expect(result.ogType).toBe('article')
      expect(result.ogPublishedTime).toBe('2024-01-01')
      expect(result.ogAuthor).toBe('John Doe')
    })

    it('should generate description when missing', () => {
      const data: FrontmatterData = {
        title: 'Test Article',
        description: '',
        date: '',
        author: '',
        tags: [],
        image: '',
        coverImage: '',
        draft: false,
        featured: false
      }

      const result = generateSEOFrontmatter(data, { generateDescription: true })
      
      expect(result.description).toBe('Read about test article')
    })

    it('should not generate description when disabled', () => {
      const data: FrontmatterData = {
        title: 'Test Article',
        description: '',
        date: '',
        author: '',
        tags: [],
        image: '',
        coverImage: '',
        draft: false,
        featured: false
      }

      const result = generateSEOFrontmatter(data, { generateDescription: false })
      
      expect(result.description).toBe('')
    })

    it('should not include Open Graph when disabled', () => {
      const data: FrontmatterData = {
        title: 'Test Article',
        description: 'A test article',
        date: '',
        author: '',
        tags: [],
        image: '',
        coverImage: '',
        draft: false,
        featured: false
      }

      const result = generateSEOFrontmatter(data, { addOpenGraph: false })
      
      expect(result.ogTitle).toBeUndefined()
      expect(result.ogDescription).toBeUndefined()
      expect(result.ogImage).toBeUndefined()
    })

    it('should use image when coverImage is not available', () => {
      const data: FrontmatterData = {
        title: 'Test Article',
        description: 'A test article',
        date: '',
        author: '',
        tags: [],
        image: 'https://example.com/image.jpg',
        coverImage: '',
        draft: false,
        featured: false
      }

      const result = generateSEOFrontmatter(data)
      
      expect(result.ogImage).toBe('https://example.com/image.jpg')
    })
  })

  describe('DEFAULT_REQUIRED_FIELDS', () => {
    it('should contain title as default required field', () => {
      expect(DEFAULT_REQUIRED_FIELDS).toContain('title')
      expect(DEFAULT_REQUIRED_FIELDS).toHaveLength(1)
    })
  })
})
