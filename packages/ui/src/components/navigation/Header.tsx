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
    { name: 'Главная', href: '/' },
    { name: 'О нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Компоненты', href: '/components-demo' },
    { name: 'Поиск', href: '/search-demo' },
    { name: 'SEO', href: '/seo-demo' },
    { name: 'Контакты', href: '/contact' }
  ]

  // Sample search documents (in real app, this would come from your content)
  useEffect(() => {
    const documents: SearchDocument[] = [
      {
        id: 'home',
        title: 'Главная страница',
        content: 'Добро пожаловать в LND Boilerplate - современную платформу для веб-разработки',
        excerpt: 'Современная платформа для веб-разработки на Next.js 14, TypeScript и Tailwind CSS',
        url: '/',
        tags: ['главная', 'платформа'],
        category: 'main'
      },
      {
        id: 'about',
        title: 'О нас',
        content: 'Узнайте больше о нашей миссии и команде разработчиков',
        excerpt: 'Информация о компании, миссии и команде разработчиков',
        url: '/about',
        tags: ['о нас', 'команда'],
        category: 'company'
      },
      {
        id: 'blog',
        title: 'Блог',
        content: 'Читайте последние статьи о веб-разработке и технологиях',
        excerpt: 'Статьи о веб-разработке, технологиях и лучших практиках',
        url: '/blog',
        tags: ['блог', 'статьи'],
        category: 'content'
      },
      {
        id: 'components',
        title: 'Демо компонентов',
        content: 'Демонстрация всех доступных компонентов: Sidebar, TableOfContents, Accordion, Form, PreviousNext',
        excerpt: 'Все доступные компоненты в одном месте',
        url: '/components-demo',
        tags: ['компоненты', 'демо'],
        category: 'ui'
      },
      {
        id: 'search',
        title: 'Демо поиска',
        content: 'Демонстрация системы поиска с различными алгоритмами и настройками',
        excerpt: 'Система поиска с различными алгоритмами',
        url: '/search-demo',
        tags: ['поиск', 'алгоритмы'],
        category: 'features'
      },
      {
        id: 'seo',
        title: 'SEO демо',
        content: 'Демонстрация SEO утилит для оптимизации веб-страниц',
        excerpt: 'SEO утилиты для оптимизации',
        url: '/seo-demo',
        tags: ['seo', 'оптимизация'],
        category: 'features'
      },
      {
        id: 'contact',
        title: 'Контакты',
        content: 'Свяжитесь с нами для получения дополнительной информации',
        excerpt: 'Форма обратной связи и контактная информация',
        url: '/contact',
        tags: ['контакты', 'связь'],
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
