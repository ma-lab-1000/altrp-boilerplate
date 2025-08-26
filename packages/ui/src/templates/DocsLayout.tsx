import React, { useState, useEffect } from 'react'
import { PublicLayout } from './PublicLayout'
import { getSiteConfig } from '@lnd/utils/config/site-config.utils'
import { DocumentationConfig } from '@lnd/utils/config/site-config.types'

/**
 * DocsLayout - Optimized for documentation pages
 * 
 * This layout is designed for documentation pages with advanced features:
 * - Configurable navigation sidebar
 * - Built-in search functionality
 * - Breadcrumb navigation
 * - Reading progress indicator
 * - Table of contents
 * - Mobile-responsive design
 * 
 * All features are configurable through site.config.json
 * 
 * @param children - Page content
 * @param title - Page title
 * @param description - Page description
 * @param className - Additional CSS classes
 * @param showHeader - Whether to show the page header
 */
interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  showHeader?: boolean
  tableOfContents?: Array<{
    id: string
    title: string
    level: number
  }>
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ 
  children, 
  title,
  description,
  className = '',
  showHeader = true,
  tableOfContents = []
}) => {
  const [config, setConfig] = useState<DocumentationConfig | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  // Load configuration
  useEffect(() => {
    try {
      const siteConfig = getSiteConfig()
      const docConfig = siteConfig.getFeatureConfig('documentation')
      setConfig(docConfig)
    } catch (error) {
      console.warn('Failed to load documentation config:', error)
      // Fallback configuration
      setConfig({
        enabled: true,
        path: '/docs',
        navigation: {
          enabled: true,
          position: 'left',
          showProgress: true,
          showBreadcrumbs: true
        },
        search: {
          enabled: true,
          provider: 'local',
          placeholder: 'Search documentation...'
        },
        layout: {
          sidebar: true,
          toc: true,
          footer: true
        }
      })
    }
  }, [])

  // Reading progress calculation
  useEffect(() => {
    if (!config?.navigation.showProgress) return

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [config])

  if (!config) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery)
  }

  const renderNavigation = () => {
    if (!config.navigation.enabled) return null

    return (
      <nav className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          {config.search.enabled && (
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={config.search.placeholder}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          )}

          {/* Navigation Menu */}
          <div className="space-y-2">
            <a href="/docs" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Getting Started
            </a>
            <a href="/docs/installation" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Installation
            </a>
            <a href="/docs/api" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              API Reference
            </a>
            <a href="/docs/examples" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Examples
            </a>
          </div>
        </div>
      </nav>
    )
  }

  const renderTableOfContents = () => {
    if (!config.layout.toc || tableOfContents.length === 0) return null

    return (
      <div className="hidden xl:block w-64 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">On this page</h3>
        <nav className="space-y-1">
          {tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm text-gray-600 hover:text-blue-600 transition-colors ${
                item.level === 1 ? 'font-medium' : item.level === 2 ? 'ml-4' : 'ml-8'
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    )
  }

  const renderBreadcrumbs = () => {
    if (!config.navigation.showBreadcrumbs) return null

    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <a href="/docs" className="hover:text-gray-700">Documentation</a>
        {title && (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900">{title}</span>
          </>
        )}
      </nav>
    )
  }

  const renderReadingProgress = () => {
    if (!config.navigation.showProgress) return null

    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
    )
  }

  return (
    <PublicLayout>
      {renderReadingProgress()}
      {renderNavigation()}
      
      {/* Mobile menu button */}
      {config.navigation.enabled && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-300 rounded-md shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className={`min-h-screen ${config.layout.sidebar ? 'lg:ml-64' : ''}`}>
        <div className="flex">
          {/* Content area */}
          <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
            {showHeader && (title || description) && (
              <header className="mb-8">
                {renderBreadcrumbs()}
                {title && (
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {description}
                  </p>
                )}
              </header>
            )}
            
            <article className={`prose prose-lg max-w-none ${className}`}>
              {children}
            </article>
          </main>

          {/* Table of Contents */}
          {renderTableOfContents()}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </PublicLayout>
  )
}
