'use client'

import React, { useState, useEffect } from 'react'
import { PublicLayout } from './PublicLayout'
import { useSiteConfig } from '../providers/SiteConfigProvider'
import { DocumentationConfig } from '@lnd/utils/config/site-config.types'
import { Sidebar, TableOfContents } from '../components/navigation'

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
  navigationItems?: Array<{
    title: string
    href: string
    children?: Array<{
      title: string
      href: string
    }>
  }>
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ 
  children, 
  title,
  description,
  className = '',
  showHeader = true,
  tableOfContents = [],
  navigationItems = []
}) => {
  const { config: siteConfig, isLoading, error } = useSiteConfig()
  const [config, setConfig] = useState<DocumentationConfig | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isTocOpen, setIsTocOpen] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)

  // Load configuration
  useEffect(() => {
    if (siteConfig && !isLoading) {
      try {
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
    }
  }, [siteConfig, isLoading])

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

  if (isLoading || !config) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    )
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Configuration Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </PublicLayout>
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery)
  }



  const renderTableOfContents = () => {
    if (!config.layout.toc || tableOfContents.length === 0) return null

    return (
      <div className={`hidden xl:block w-64 transition-all duration-300 ${isTocOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
        <div className="sticky top-16 h-[calc(100vh-8rem)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">On this page</h3>
            <button
              onClick={() => setIsTocOpen(false)}
              className="p-1 rounded hover:bg-accent"
              title="Hide TOC"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <TableOfContents toc={tableOfContents} />
        </div>
      </div>
    )
  }

  const renderBreadcrumbs = () => {
    if (!config.navigation.showBreadcrumbs) return null

    return (
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Home</a>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <a href="/docs" className="hover:text-foreground">Documentation</a>
        {title && (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-foreground">{title}</span>
          </>
        )}
      </nav>
    )
  }

  const renderReadingProgress = () => {
    if (!config.navigation.showProgress) return null

    return (
      <div className="fixed top-0 start-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
    )
  }

  return (
    <PublicLayout>
      {renderReadingProgress()}
      
      {/* Mobile menu button */}
      {config.navigation.enabled && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 start-4 z-50 p-2 bg-background border border-border rounded-md shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar toggle button - only show when sidebar is hidden */}
      {config.navigation.enabled && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hidden md:block fixed top-20 start-4 z-40 p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent"
          title="Show sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* TOC toggle button - only show when TOC is hidden */}
      {tableOfContents.length > 0 && !isTocOpen && (
        <button
          onClick={() => setIsTocOpen(true)}
          className="fixed top-20 end-4 z-40 p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent"
          title="Show TOC"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className="container mx-auto">
        <div className={`grid gap-8 transition-all duration-300 ${
          isSidebarOpen && isTocOpen 
            ? 'grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_240px]'
            : isSidebarOpen
            ? 'grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]'
            : isTocOpen
            ? 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px]'
            : 'grid-cols-1'
        }`}>
          
          {isSidebarOpen && (
            <aside className="hidden md:block sticky top-16 h-[calc(100vh-8rem)] py-8">
              <div className="space-y-4">
                {/* Search with toggle button */}
                {config.search.enabled && (
                  <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={config.search.placeholder}
                          className="w-full ps-10 pe-4 py-2 border border-input rounded-md focus:border-ring bg-background text-sm"
                        />
                        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </form>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 rounded-md hover:bg-accent"
                      title="Hide sidebar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                
                <Sidebar 
                  navItems={navigationItems} 
                  currentPath={typeof window !== 'undefined' ? window.location.pathname : ''}
                />
              </div>
            </aside>
          )}

          <main className="py-8">
            {showHeader && (title || description) && (
              <header className="mb-8">
                {renderBreadcrumbs()}
                {title && (
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </header>
            )}
            
            <article className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}>
              {children}
            </article>
          </main>

          {isTocOpen && renderTableOfContents()}

        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </PublicLayout>
  )
}
