export interface SearchDocument {
  id: string
  title: string
  content: string
  excerpt?: string
  tags?: string[]
  category?: string
  author?: string
  date?: string
  url?: string
  metadata?: Record<string, any>
}

export interface SearchResult {
  id: string
  score: number
  document: SearchDocument
  highlights: {
    title?: string[]
    content?: string[]
    tags?: string[]
  }
}

export interface SearchOptions {
  limit?: number
  highlight?: boolean
  fields?: ('title' | 'content' | 'tags' | 'metadata')[]
}
