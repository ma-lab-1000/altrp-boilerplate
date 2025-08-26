import { describe, it, expect } from 'bun:test'
import {
  buildRelationships,
  resolveRelationships,
  findRelatedContent,
  getContentByType,
  getContentByTag,
  type ContentRelationship,
  type ContentNode,
  type RelationshipGraph
} from '../../src/content/relationships'

describe('Content Relationships', () => {
  const mockContentItems = [
    {
      id: 'post-1',
      type: 'post',
      frontmatter: {
        title: 'Getting Started with React',
        authorId: 'author-1',
        category: 'tutorial',
        tags: ['react', 'javascript', 'frontend']
      }
    },
    {
      id: 'post-2',
      type: 'post',
      frontmatter: {
        title: 'Advanced TypeScript',
        authorId: 'author-1',
        category: 'tutorial',
        tags: ['typescript', 'javascript', 'advanced']
      }
    },
    {
      id: 'post-3',
      type: 'post',
      frontmatter: {
        title: 'Node.js Backend',
        authorId: 'author-2',
        category: 'backend',
        tags: ['nodejs', 'backend', 'api']
      }
    },
    {
      id: 'author-1',
      type: 'author',
      frontmatter: {
        name: 'John Doe',
        bio: 'Senior Developer'
      }
    },
    {
      id: 'author-2',
      type: 'author',
      frontmatter: {
        name: 'Jane Smith',
        bio: 'Backend Specialist'
      }
    }
  ]

  let graph: RelationshipGraph

  // Initialize graph before each test
  graph = buildRelationships(mockContentItems)

  describe('buildRelationships', () => {
    it('should create nodes for all content items', () => {
      expect(graph.nodes.size).toBe(5)
      expect(graph.nodes.has('post-1')).toBe(true)
      expect(graph.nodes.has('post-2')).toBe(true)
      expect(graph.nodes.has('post-3')).toBe(true)
      expect(graph.nodes.has('author-1')).toBe(true)
      expect(graph.nodes.has('author-2')).toBe(true)
    })

    it('should create author relationships', () => {
      const post1Node = graph.nodes.get('post-1')
      expect(post1Node?.relationships).toHaveLength(5) // author + category + 3 tags
      
      const authorRel = post1Node?.relationships.find(r => r.type === 'author')
      expect(authorRel).toBeDefined()
      expect(authorRel?.targetId).toBe('author-1')
    })

    it('should create category relationships', () => {
      const post1Node = graph.nodes.get('post-1')
      const categoryRel = post1Node?.relationships.find(r => r.type === 'category')
      
      expect(categoryRel).toBeDefined()
      expect(categoryRel?.targetId).toBe('category:tutorial')
    })

    it('should create tag relationships', () => {
      const post1Node = graph.nodes.get('post-1')
      const tagRels = post1Node?.relationships.filter(r => r.type === 'tag')
      
      expect(tagRels).toHaveLength(3)
      expect(tagRels?.map(r => r.targetId)).toContain('tag:react')
      expect(tagRels?.map(r => r.targetId)).toContain('tag:javascript')
      expect(tagRels?.map(r => r.targetId)).toContain('tag:frontend')
    })

    it('should add relationships to edges array', () => {
      expect(graph.edges.length).toBeGreaterThan(0)
      
      const authorEdges = graph.edges.filter(e => e.type === 'author')
      expect(authorEdges).toHaveLength(3) // 3 posts with authors
      
      const categoryEdges = graph.edges.filter(e => e.type === 'category')
      expect(categoryEdges).toHaveLength(3) // 3 posts with categories
      
      const tagEdges = graph.edges.filter(e => e.type === 'tag')
      expect(tagEdges).toHaveLength(9) // 3 + 3 + 3 tags
    })

    it('should handle content without relationships', () => {
      const itemsWithoutRelationships = [
        {
          id: 'post-4',
          type: 'post',
          frontmatter: {
            title: 'Simple Post'
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithoutRelationships)
      
      expect(simpleGraph.nodes.size).toBe(1)
      expect(simpleGraph.nodes.get('post-4')?.relationships).toHaveLength(0)
      expect(simpleGraph.edges).toHaveLength(0)
    })

    it('should handle empty content items array', () => {
      const emptyGraph = buildRelationships([])
      
      expect(emptyGraph.nodes.size).toBe(0)
      expect(emptyGraph.edges).toHaveLength(0)
    })
  })

  describe('resolveRelationships', () => {
    it('should resolve all relationships for a content item', () => {
      const resolved = resolveRelationships(graph, 'post-1')
      
      expect(resolved.author).toBeDefined()
      expect(resolved.author).toHaveLength(1)
      expect(resolved.author[0].name).toBe('John Doe')
      
      // Category relationships are not resolved because category nodes don't exist
      expect(resolved.category).toBeUndefined()
      
      // Tag relationships are not resolved because tag nodes don't exist
      expect(resolved.tag).toBeUndefined()
    })

    it('should filter relationships by type', () => {
      const resolved = resolveRelationships(graph, 'post-1', ['author', 'category'])
      
      expect(resolved.author).toBeDefined()
      expect(resolved.category).toBeUndefined()
      expect(resolved.tag).toBeUndefined()
    })

    it('should return empty object for non-existent content', () => {
      const resolved = resolveRelationships(graph, 'non-existent')
      
      expect(resolved).toEqual({})
    })

    it('should return empty object for content without relationships', () => {
      const itemsWithoutRelationships = [
        {
          id: 'post-4',
          type: 'post',
          frontmatter: {
            title: 'Simple Post'
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithoutRelationships)
      const resolved = resolveRelationships(simpleGraph, 'post-4')
      
      expect(resolved).toEqual({})
    })
  })

  describe('findRelatedContent', () => {
    it('should find related content based on shared tags', () => {
      const related = findRelatedContent(graph, 'post-1', 5)
      
      expect(related.length).toBeGreaterThan(0)
      
      // post-2 should be related because it shares 'javascript' tag
      const post2Related = related.find(r => r.id === 'post-2')
      expect(post2Related).toBeDefined()
      expect(post2Related?.score).toBe(3) // 1 shared tag + 2 for shared category
    })

    it('should find related content based on shared category', () => {
      const related = findRelatedContent(graph, 'post-1', 5)
      
      // post-2 should be related because it shares 'tutorial' category
      const post2Related = related.find(r => r.id === 'post-2')
      expect(post2Related).toBeDefined()
      expect(post2Related?.score).toBe(3) // 1 shared tag + 2 for shared category
    })

    it('should not include the source content in results', () => {
      const related = findRelatedContent(graph, 'post-1', 5)
      
      const selfRelated = related.find(r => r.id === 'post-1')
      expect(selfRelated).toBeUndefined()
    })

    it('should respect maxResults limit', () => {
      const related = findRelatedContent(graph, 'post-1', 1)
      
      expect(related.length).toBeLessThanOrEqual(1)
    })

    it('should sort results by score descending', () => {
      const related = findRelatedContent(graph, 'post-1', 5)
      
      for (let i = 1; i < related.length; i++) {
        expect(related[i-1].score).toBeGreaterThanOrEqual(related[i].score)
      }
    })

    it('should return empty array for non-existent content', () => {
      const related = findRelatedContent(graph, 'non-existent', 5)
      
      expect(related).toEqual([])
    })

    it('should return empty array for content without relationships', () => {
      const itemsWithoutRelationships = [
        {
          id: 'post-4',
          type: 'post',
          frontmatter: {
            title: 'Simple Post'
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithoutRelationships)
      const related = findRelatedContent(simpleGraph, 'post-4', 5)
      
      expect(related).toEqual([])
    })

    it('should only include content with titles', () => {
      const itemsWithMissingTitles = [
        {
          id: 'post-1',
          type: 'post',
          frontmatter: {
            title: 'Valid Post',
            tags: ['test']
          }
        },
        {
          id: 'post-2',
          type: 'post',
          frontmatter: {
            // No title
            tags: ['test']
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithMissingTitles)
      const related = findRelatedContent(simpleGraph, 'post-1', 5)
      
      expect(related).toHaveLength(0) // post-2 has no title, so it's filtered out
    })
  })

  describe('getContentByType', () => {
    it('should return all posts', () => {
      const posts = getContentByType(graph, 'post')
      
      expect(posts).toHaveLength(3)
      expect(posts.every(p => p.type === 'post')).toBe(true)
    })

    it('should return all authors', () => {
      const authors = getContentByType(graph, 'author')
      
      expect(authors).toHaveLength(2)
      expect(authors.every(a => a.type === 'author')).toBe(true)
    })

    it('should return empty array for non-existent type', () => {
      const nonExistent = getContentByType(graph, 'non-existent')
      
      expect(nonExistent).toEqual([])
    })
  })

  describe('getContentByTag', () => {
    it('should return content with specific tag', () => {
      const reactContent = getContentByTag(graph, 'react')
      
      expect(reactContent).toHaveLength(1)
      expect(reactContent[0].id).toBe('post-1')
    })

    it('should return content with shared tag', () => {
      const jsContent = getContentByTag(graph, 'javascript')
      
      expect(jsContent).toHaveLength(2)
      expect(jsContent.map(c => c.id)).toContain('post-1')
      expect(jsContent.map(c => c.id)).toContain('post-2')
    })

    it('should return empty array for non-existent tag', () => {
      const nonExistent = getContentByTag(graph, 'non-existent')
      
      expect(nonExistent).toEqual([])
    })

    it('should handle case-sensitive tags', () => {
      const reactContent = getContentByTag(graph, 'React') // Different case
      
      expect(reactContent).toHaveLength(0) // Should be case-sensitive
    })
  })

  describe('Edge cases', () => {
    it('should handle content with empty tags array', () => {
      const itemsWithEmptyTags = [
        {
          id: 'post-1',
          type: 'post',
          frontmatter: {
            title: 'Post with Empty Tags',
            tags: []
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithEmptyTags)
      
      expect(simpleGraph.edges.filter(e => e.type === 'tag')).toHaveLength(0)
    })

    it('should handle content with null/undefined frontmatter fields', () => {
      const itemsWithNullFields = [
        {
          id: 'post-1',
          type: 'post',
          frontmatter: {
            title: 'Post with Null Fields',
            authorId: null,
            category: undefined,
            tags: null
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithNullFields)
      
      expect(simpleGraph.edges).toHaveLength(0)
    })

    it('should handle very large numbers of tags', () => {
      const manyTags = Array.from({ length: 100 }, (_, i) => `tag-${i}`)
      const itemsWithManyTags = [
        {
          id: 'post-1',
          type: 'post',
          frontmatter: {
            title: 'Post with Many Tags',
            tags: manyTags
          }
        }
      ]
      
      const simpleGraph = buildRelationships(itemsWithManyTags)
      
      expect(simpleGraph.edges.filter(e => e.type === 'tag')).toHaveLength(100)
    })
  })
})
