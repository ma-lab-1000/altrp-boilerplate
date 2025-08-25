'use client'

import { useState, useEffect } from 'react'
import { CollectionLayout } from '@lnd/ui/templates/CollectionLayout'
import { ProductList } from '@lnd/ui/components/ecommerce'
import { simpleSearch, createSearchSuggestions, SearchDocument } from '@lnd/utils/search/simple'

// Demo content for search testing
const demoDocuments: SearchDocument[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a React framework that gives you building blocks to create web applications. Learn the basics of Next.js and how to get started with your first project.',
    excerpt: 'Learn the basics of Next.js and how to get started with your first project.',
    tags: ['Next.js', 'React', 'Tutorial', 'Getting Started'],
    category: 'Frontend',
    author: 'John Doe',
    date: '2025-01-25',
    url: '/blog/getting-started-nextjs'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    content: 'TypeScript adds static typing to JavaScript, making your code more reliable and easier to maintain. Discover best practices for writing clean, type-safe TypeScript code.',
    excerpt: 'Discover best practices for writing clean, type-safe TypeScript code.',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Development'],
    category: 'Programming',
    author: 'Jane Smith',
    date: '2025-01-24',
    url: '/blog/typescript-best-practices'
  },
  {
    id: '3',
    title: 'Tailwind CSS Design System',
    content: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Learn how to create a consistent design system.',
    excerpt: 'Learn how to create a consistent design system with Tailwind CSS.',
    tags: ['Tailwind CSS', 'CSS', 'Design System', 'Frontend'],
    category: 'Design',
    author: 'Mike Johnson',
    date: '2025-01-23',
    url: '/blog/tailwind-css-design-system'
  },
  {
    id: '4',
    title: 'Monorepo Architecture with Bun',
    content: 'Monorepos allow you to manage multiple packages in a single repository. Learn how to set up and manage a monorepo using Bun workspaces.',
    excerpt: 'Learn how to set up and manage a monorepo using Bun workspaces.',
    tags: ['Monorepo', 'Bun', 'Workspaces', 'Architecture'],
    category: 'Backend',
    author: 'Sarah Wilson',
    date: '2025-01-22',
    url: '/blog/monorepo-architecture-bun'
  },
  {
    id: '5',
    title: 'Performance Optimization Techniques',
    content: 'Performance is crucial for modern web applications. Explore various techniques to optimize your Next.js application for better user experience.',
    excerpt: 'Explore various techniques to optimize your Next.js application.',
    tags: ['Performance', 'Optimization', 'Next.js', 'Web Development'],
    category: 'Performance',
    author: 'Alex Brown',
    date: '2025-01-21',
    url: '/blog/performance-optimization-techniques'
  }
]

export default function SearchDemoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchDocument[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = simpleSearch(demoDocuments, query, {
        limit: 10,
        highlight: true,
        fields: ['title', 'content', 'tags']
      })
      
      setSearchResults(results.map(result => result.document))
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <CollectionLayout
      title="Search Demo"
      description="Demonstrating the search functionality with FlexSearch integration."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div>
          {searchQuery && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Search Results for "{searchQuery}"
              </h3>
              <p className="text-sm text-gray-500">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {searchResults.length > 0 ? (
            <ProductList
              items={searchResults.map(doc => ({
                id: doc.id,
                title: doc.title,
                description: doc.excerpt || doc.content.substring(0, 150) + '...',
                image: {
                  src: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=400&h=225&fit=crop`,
                  alt: doc.title
                },
                tags: doc.tags,
                date: doc.date,
                author: doc.author,
                href: doc.url
              }))}
              columns={2}
            />
          ) : searchQuery && !isSearching ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or check spelling</p>
            </div>
          ) : null}
        </div>

        {/* Demo Content (when no search) */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              All Articles
            </h3>
            <ProductList
              items={demoDocuments.map(doc => ({
                id: doc.id,
                title: doc.title,
                description: doc.excerpt || doc.content.substring(0, 150) + '...',
                image: {
                  src: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=400&h=225&fit=crop`,
                  alt: doc.title
                },
                tags: doc.tags,
                date: doc.date,
                author: doc.author,
                href: doc.url
              }))}
              columns={2}
            />
          </div>
        )}
      </div>
    </CollectionLayout>
  )
}
