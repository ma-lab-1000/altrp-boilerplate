export interface ContentRelationship {
  sourceId: string
  targetId: string
  type: 'author' | 'category' | 'tag' | 'related' | 'series'
  metadata?: Record<string, any>
}

export interface ContentNode {
  id: string
  type: 'post' | 'author' | 'category' | 'tag'
  data: Record<string, any>
  relationships: ContentRelationship[]
}

export interface RelationshipGraph {
  nodes: Map<string, ContentNode>
  edges: ContentRelationship[]
}

/**
 * Build relationships between content items based on frontmatter
 */
export function buildRelationships(
  contentItems: Array<{
    id: string
    type: string
    frontmatter: Record<string, any>
  }>
): RelationshipGraph {
  const graph: RelationshipGraph = {
    nodes: new Map(),
    edges: []
  }
  
  // Create nodes for all content items
  contentItems.forEach(item => {
    graph.nodes.set(item.id, {
      id: item.id,
      type: item.type as any,
      data: item.frontmatter,
      relationships: []
    })
  })
  
  // Build relationships based on frontmatter
  contentItems.forEach(item => {
    const { id, frontmatter } = item
    
    // Author relationship
    if (frontmatter.authorId) {
      const relationship: ContentRelationship = {
        sourceId: id,
        targetId: frontmatter.authorId,
        type: 'author'
      }
      graph.edges.push(relationship)
      
      // Add to source node
      const sourceNode = graph.nodes.get(id)
      if (sourceNode) {
        sourceNode.relationships.push(relationship)
      }
    }
    
    // Category relationship
    if (frontmatter.category) {
      const categoryId = `category:${frontmatter.category}`
      const relationship: ContentRelationship = {
        sourceId: id,
        targetId: categoryId,
        type: 'category'
      }
      graph.edges.push(relationship)
      
      // Add to source node
      const sourceNode = graph.nodes.get(id)
      if (sourceNode) {
        sourceNode.relationships.push(relationship)
      }
    }
    
    // Tag relationships
    if (Array.isArray(frontmatter.tags)) {
      frontmatter.tags.forEach(tag => {
        const tagId = `tag:${tag}`
        const relationship: ContentRelationship = {
          sourceId: id,
          targetId: tagId,
          type: 'tag'
        }
        graph.edges.push(relationship)
        
        // Add to source node
        const sourceNode = graph.nodes.get(id)
        if (sourceNode) {
          sourceNode.relationships.push(relationship)
        }
      })
    }
  })
  
  return graph
}

/**
 * Resolve relationships for a specific content item
 */
export function resolveRelationships(
  graph: RelationshipGraph,
  contentId: string,
  relationshipTypes?: string[]
): Record<string, any[]> {
  const node = graph.nodes.get(contentId)
  if (!node) {
    return {}
  }
  
  const resolved: Record<string, any[]> = {}
  
  node.relationships.forEach(relationship => {
    if (relationshipTypes && !relationshipTypes.includes(relationship.type)) {
      return
    }
    
    const targetNode = graph.nodes.get(relationship.targetId)
    if (targetNode) {
      if (!resolved[relationship.type]) {
        resolved[relationship.type] = []
      }
      resolved[relationship.type].push({
        ...targetNode.data,
        id: targetNode.id,
        type: targetNode.type
      })
    }
  })
  
  return resolved
}

/**
 * Find related content based on shared tags or categories
 */
export function findRelatedContent(
  graph: RelationshipGraph,
  contentId: string,
  maxResults: number = 5
): Array<{ id: string; data: Record<string, any>; score: number }> {
  const node = graph.nodes.get(contentId)
  if (!node) {
    return []
  }
  
  const scores = new Map<string, number>()
  
  // Score based on shared tags
  const tagRelationships = node.relationships.filter(r => r.type === 'tag')
  tagRelationships.forEach(tagRel => {
    const tagId = tagRel.targetId
    
    // Find other content with the same tag
    graph.edges.forEach(edge => {
      if (edge.targetId === tagId && edge.sourceId !== contentId) {
        const currentScore = scores.get(edge.sourceId) || 0
        scores.set(edge.sourceId, currentScore + 1)
      }
    })
  })
  
  // Score based on shared category
  const categoryRelationships = node.relationships.filter(r => r.type === 'category')
  categoryRelationships.forEach(catRel => {
    const catId = catRel.targetId
    
    // Find other content with the same category
    graph.edges.forEach(edge => {
      if (edge.targetId === catId && edge.sourceId !== contentId) {
        const currentScore = scores.get(edge.sourceId) || 0
        scores.set(edge.sourceId, currentScore + 2) // Category gets higher weight
      }
    })
  })
  
  // Convert to array and sort by score
  const related = Array.from(scores.entries())
    .map(([id, score]) => {
      const targetNode = graph.nodes.get(id)
      return {
        id,
        data: targetNode?.data || {},
        score
      }
    })
    .filter(item => item.data.title) // Only include items with titles
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
  
  return related
}

/**
 * Get content by type with relationships
 */
export function getContentByType(
  graph: RelationshipGraph,
  type: string
): ContentNode[] {
  return Array.from(graph.nodes.values()).filter(node => node.type === type)
}

/**
 * Get content by tag
 */
export function getContentByTag(
  graph: RelationshipGraph,
  tag: string
): ContentNode[] {
  const tagId = `tag:${tag}`
  const relatedEdges = graph.edges.filter(edge => 
    edge.targetId === tagId && edge.type === 'tag'
  )
  
  return relatedEdges.map(edge => {
    const node = graph.nodes.get(edge.sourceId)
    return node!
  }).filter(Boolean)
}
