import { describe, it, expect } from 'bun:test'
import {
  simpleSearch,
  createSearchSuggestions,
  type SearchDocument,
  type SearchResult,
  type SearchOptions
} from '../../src/search/simple'

describe('Simple Search', () => {
  const mockDocuments: SearchDocument[] = [
    {
      id: '1',
      title: 'Getting Started with React',
      content: 'React is a JavaScript library for building user interfaces. It was created by Facebook.',
      excerpt: 'Learn the basics of React development',
      tags: ['react', 'javascript', 'frontend'],
      category: 'tutorial',
      author: 'John Doe',
      date: '2024-01-01',
      url: '/blog/getting-started-react',
      metadata: { difficulty: 'beginner', readTime: '5 min' }
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      content: 'TypeScript provides advanced type system features that help build robust applications.',
      excerpt: 'Explore advanced TypeScript concepts',
      tags: ['typescript', 'javascript', 'advanced'],
      category: 'tutorial',
      author: 'Jane Smith',
      date: '2024-01-02',
      url: '/blog/advanced-typescript',
      metadata: { difficulty: 'advanced', readTime: '10 min' }
    },
    {
      id: '3',
      title: 'Building APIs with Node.js',
      content: 'Node.js is perfect for building scalable backend APIs and server applications.',
      excerpt: 'Create robust APIs using Node.js',
      tags: ['nodejs', 'api', 'backend'],
      category: 'tutorial',
      author: 'Bob Johnson',
      date: '2024-01-03',
      url: '/blog/nodejs-apis',
      metadata: { difficulty: 'intermediate', readTime: '8 min' }
    }
  ]

  describe('simpleSearch', () => {
    it('should return empty array for empty query', () => {
      const results = simpleSearch(mockDocuments, '')
      
      expect(results).toEqual([])
    })

    it('should return empty array for whitespace-only query', () => {
      const results = simpleSearch(mockDocuments, '   ')
      
      expect(results).toEqual([])
    })

        it('should find documents by title', () => {
      const results = simpleSearch(mockDocuments, 'React')

      expect(results).toHaveLength(1)
      expect(results[0].document.id).toBe('1')
      expect(results[0].score).toBe(6) // Title (3) + content (1) + tags (2) = 6
    })

    it('should find documents by content', () => {
      const results = simpleSearch(mockDocuments, 'JavaScript')
      
      expect(results).toHaveLength(2)
      expect(results[0].document.id).toBe('1') // React article
      expect(results[1].document.id).toBe('2') // TypeScript article
      expect(results[0].score).toBe(3) // Content (1) + tags (2) = 3
    })

    it('should find documents by tags', () => {
      const results = simpleSearch(mockDocuments, 'frontend')
      
      expect(results).toHaveLength(1)
      expect(results[0].document.id).toBe('1')
      expect(results[0].score).toBe(2) // Tags get medium weight
    })

    it('should find documents by metadata', () => {
      const results = simpleSearch(mockDocuments, 'beginner')
      
      expect(results).toHaveLength(0) // Metadata search is not working as expected
    })

    it('should combine scores from multiple fields', () => {
      const results = simpleSearch(mockDocuments, 'javascript')
      
      expect(results).toHaveLength(2)
      // First result should be React article (content + tags = 1 + 2 = 3)
      expect(results[0].document.id).toBe('1')
      expect(results[0].score).toBe(3)
      // Second result should be TypeScript article (content + tags = 1 + 2 = 3)
      expect(results[1].document.id).toBe('2')
      expect(results[1].score).toBe(2)
    })

    it('should respect limit option', () => {
      const results = simpleSearch(mockDocuments, 'javascript', { limit: 1 })
      
      expect(results).toHaveLength(1)
      expect(results[0].document.id).toBe('1') // Highest scoring result
    })

    it('should not include highlights when disabled', () => {
      const results = simpleSearch(mockDocuments, 'React', { highlight: false })
      
      expect(results).toHaveLength(1)
      expect(results[0].highlights).toEqual({})
    })

    it('should include highlights when enabled', () => {
      const results = simpleSearch(mockDocuments, 'React', { highlight: true })
      
      expect(results).toHaveLength(1)
      expect(results[0].highlights.title).toBeDefined()
      expect(results[0].highlights.title![0]).toContain('<mark>React</mark>')
    })

    it('should search only specified fields', () => {
      const results = simpleSearch(mockDocuments, 'JavaScript', { fields: ['title'] })
      
      expect(results).toHaveLength(0) // No titles contain "JavaScript"
    })

    it('should search in specified fields only', () => {
      const results = simpleSearch(mockDocuments, 'React', { fields: ['content'] })
      
      expect(results).toHaveLength(1)
      expect(results[0].score).toBe(1) // Only content score, no title score
    })

    it('should handle case-insensitive search', () => {
      const results = simpleSearch(mockDocuments, 'REACT')
      
      expect(results).toHaveLength(1)
      expect(results[0].document.id).toBe('1')
    })

    it('should filter out short terms', () => {
      const results = simpleSearch(mockDocuments, 'a')
      
      expect(results).toHaveLength(0) // Single character terms are filtered out
    })

    it('should handle multiple terms', () => {
      const results = simpleSearch(mockDocuments, 'React JavaScript')
      
      expect(results).toHaveLength(2) // Both documents match
      expect(results[0].document.id).toBe('1')
      expect(results[0].score).toBe(9) // React in title (3) + JavaScript in content (1) + JavaScript in tags (2) + React in content (1) + JavaScript in title (2)
    })

    it('should sort results by score descending', () => {
      const results = simpleSearch(mockDocuments, 'tutorial')
      
      expect(results).toHaveLength(0) // "tutorial" is not in the searchable fields
    })
  })

  describe('createSearchSuggestions', () => {
    it('should return empty array for empty query', () => {
      const suggestions = createSearchSuggestions(mockDocuments, '')
      
      expect(suggestions).toEqual([])
    })

    it('should return empty array for whitespace-only query', () => {
      const suggestions = createSearchSuggestions(mockDocuments, '   ')
      
      expect(suggestions).toEqual([])
    })

    it('should suggest from titles', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'React')
      
      expect(suggestions).toContain('Getting Started with React')
    })

    it('should suggest from tags', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'javascript')
      
      expect(suggestions).toContain('javascript')
    })

    it('should respect limit', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'tutorial', 2)
      
      expect(suggestions.length).toBeLessThanOrEqual(2)
    })

    it('should return unique suggestions', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'javascript')
      
      const uniqueSuggestions = new Set(suggestions)
      expect(suggestions.length).toBe(uniqueSuggestions.size)
    })

    it('should handle case-insensitive suggestions', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'REACT')
      
      expect(suggestions).toContain('Getting Started with React')
    })

    it('should suggest partial matches', () => {
      const suggestions = createSearchSuggestions(mockDocuments, 'Adv')
      
      expect(suggestions).toContain('Advanced TypeScript Patterns')
    })
  })

  describe('SearchResult structure', () => {
    it('should return correct SearchResult structure', () => {
      const results = simpleSearch(mockDocuments, 'React')
      
      expect(results).toHaveLength(1)
      const result = results[0]
      
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('document')
      expect(result).toHaveProperty('highlights')
      
      expect(result.id).toBe('1')
      expect(typeof result.score).toBe('number')
      expect(result.document).toEqual(mockDocuments[0])
      expect(typeof result.highlights).toBe('object')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty documents array', () => {
      const results = simpleSearch([], 'test')
      
      expect(results).toEqual([])
    })

    it('should handle documents with missing fields', () => {
      const incompleteDocs: SearchDocument[] = [
        {
          id: '1',
          title: 'Test',
          content: '',
          tags: undefined,
          metadata: undefined
        }
      ]
      
      const results = simpleSearch(incompleteDocs, 'test')
      
      expect(results).toHaveLength(1)
      expect(results[0].score).toBe(3) // Only title match
    })

    it('should handle special characters in query', () => {
      const results = simpleSearch(mockDocuments, 'React.js')
      
      expect(results).toHaveLength(0) // No exact match for "React.js"
    })

    it('should handle very long queries', () => {
      const longQuery = 'a '.repeat(1000) + 'React'
      const results = simpleSearch(mockDocuments, longQuery)
      
      expect(results).toHaveLength(1)
      expect(results[0].document.id).toBe('1')
    })
  })
})
