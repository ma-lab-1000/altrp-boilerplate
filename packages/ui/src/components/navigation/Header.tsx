'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchModal } from '../ui/SearchModal'
import { simpleSearch, SearchDocument } from '@lnd/utils/search'

export interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchDocuments, setSearchDocuments] = useState<SearchDocument[]>([])

  // Navigation items
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Components', href: '/components-demo' },
    { name: 'Search', href: '/search-demo' },
    { name: 'SEO', href: '/seo-demo' },
    { name: 'Content Demo', href: '/content-demo' },
    { name: 'Application Demo', href: '/application-demo' },
    { name: 'Docs Demo', href: '/docs-demo' },
    { name: 'Contact', href: '/contact' }
  ]

  // Sample search documents (in real app, this would come from your content)
  useEffect(() => {
    const documents: SearchDocument[] = [
      {
        id: 'home',
        title: 'Home Page',
        content: 'Welcome to LND Boilerplate - modern web development platform',
        excerpt: 'Modern web development platform built with Next.js 14, TypeScript and Tailwind CSS',
        url: '/',
        tags: ['home', 'platform'],
        category: 'main'
      },
      {
        id: 'about',
        title: 'About Us',
        content: 'Learn more about our mission and development team',
        excerpt: 'Information about company, mission and development team',
        url: '/about',
        tags: ['about', 'team'],
        category: 'company'
      },
      {
        id: 'blog',
        title: 'Blog',
        content: 'Read latest articles about web development and technologies',
        excerpt: 'Articles about web development, technologies and best practices',
        url: '/blog',
        tags: ['blog', 'articles'],
        category: 'content'
      },
      {
        id: 'components',
        title: 'Components Demo',
        content: 'Demonstration of all available components: Sidebar, TableOfContents, Accordion, Form, PreviousNext',
        excerpt: 'All available components in one place',
        url: '/components-demo',
        tags: ['components', 'demo'],
        category: 'ui'
      },
      {
        id: 'search',
        title: 'Search Demo',
        content: 'Demonstration of search system with various algorithms and settings',
        excerpt: 'Search system with various algorithms',
        url: '/search-demo',
        tags: ['search', 'algorithms'],
        category: 'features'
      },
      {
        id: 'seo',
        title: 'SEO Demo',
        content: 'Demonstration of SEO utilities for web page optimization',
        excerpt: 'SEO utilities for optimization',
        url: '/seo-demo',
        tags: ['seo', 'optimization'],
        category: 'features'
      },
      {
        id: 'content-demo',
        title: 'Content Demo',
        content: 'Demonstration of ContentLayout template for content-driven pages',
        excerpt: 'ContentLayout template for content-driven pages',
        url: '/content-demo',
        tags: ['content', 'layout', 'demo'],
        category: 'templates'
      },
      {
        id: 'application-demo',
        title: 'Application Demo',
        content: 'Demonstration of ApplicationLayout template for application-driven pages',
        excerpt: 'ApplicationLayout template for application-driven pages',
        url: '/application-demo',
        tags: ['application', 'layout', 'demo'],
        category: 'templates'
      },
      {
        id: 'docs-demo',
        title: 'Documentation Demo',
        content: 'Demonstration of DocsLayout template for documentation pages',
        excerpt: 'DocsLayout template for documentation pages',
        url: '/docs-demo',
        tags: ['documentation', 'layout', 'demo'],
        category: 'templates'
      },
      {
        id: 'contact',
        title: 'Contact',
        content: 'Contact us for additional information',
        excerpt: 'Contact form and contact information',
        url: '/contact',
        tags: ['contact', 'support'],
        category: 'company'
      }
    ]
    setSearchDocuments(documents)
  }, [])

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className={cn('bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40', className)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  LND
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <nav className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={searchDocuments}
      />
    </>
  )
}
