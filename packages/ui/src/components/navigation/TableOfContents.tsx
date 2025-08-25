'use client'

import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

export interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

export interface TableOfContentsProps {
  items: TocItem[]
  className?: string
  onItemClick?: (id: string) => void
  activeId?: string
  sticky?: boolean
}

export function TableOfContents({
  items,
  className,
  onItemClick,
  activeId,
  sticky = true
}: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>('')

  useEffect(() => {
    if (activeId) {
      setActiveHeading(activeId)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [activeId])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (onItemClick) {
        onItemClick(id)
      }
    }
  }

  const renderTocItem = (item: TocItem, level: number = 0) => {
    const isActive = activeHeading === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <button
          onClick={() => scrollToHeading(item.id)}
          className={cn(
            'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none',
            isActive && 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
            level === 0 && 'font-medium',
            level === 1 && 'ml-3 text-sm',
            level === 2 && 'ml-6 text-xs text-gray-600 dark:text-gray-400'
          )}
        >
          {item.text}
        </button>
        {hasChildren && (
          <div className="ml-2 border-l border-gray-200 dark:border-gray-700">
            {item.children!.map(child => renderTocItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4',
        sticky && 'sticky top-4',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Содержание
      </h3>
      <nav className="space-y-1">
        {items.map(item => renderTocItem(item))}
      </nav>
    </div>
  )
}
