import { useState, useEffect } from 'react'
import type { SearchDocument } from '@lnd/utils/search/client'

/**
 * Hook to load search documents from MDX content via API
 */
export function useSearchDocuments() {
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDocuments() {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/search-documents')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setDocuments(data.documents || [])
      } catch (err) {
        console.error('Failed to load search documents:', err)
        setError(err instanceof Error ? err.message : 'Failed to load search documents')
        // Fallback to empty array
        setDocuments([])
      } finally {
        setIsLoading(false)
      }
    }

    loadDocuments()
  }, [])

  return { documents, isLoading, error }
}
