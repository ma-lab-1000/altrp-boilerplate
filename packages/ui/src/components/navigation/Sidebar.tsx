'use client'

import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface SidebarItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  children?: SidebarItem[]
  isActive?: boolean
}

export interface SidebarProps {
  items: SidebarItem[]
  className?: string
  onItemClick?: (item: SidebarItem) => void
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function Sidebar({
  items,
  className,
  onItemClick,
  collapsible = false,
  defaultCollapsed = false
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const renderItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const isActive = item.isActive

    return (
      <div key={item.id}>
        <div
          className={cn(
            'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            isActive && 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
            level > 0 && 'ml-4'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleItem(item.id)
            } else if (onItemClick) {
              onItemClick(item)
            }
          }}
        >
          <div className="flex items-center space-x-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span className={cn(collapsed && level === 0 && 'sr-only')}>
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-90',
                collapsed && level === 0 && 'sr-only'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-200',
        collapsed && 'w-16',
        className
      )}
    >
      {collapsible && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      )}
      <nav className="p-2">
        {items.map(item => renderItem(item))}
      </nav>
    </div>
  )
}
