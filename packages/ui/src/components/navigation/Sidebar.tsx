import React from 'react'
import { NavLink } from './NavLink'

interface SidebarItem {
  title: string
  href: string
  children?: Array<{
    title: string
    href: string
  }>
}

interface SidebarProps {
  navItems: SidebarItem[]
  currentPath?: string
}

/**
 * Sidebar - RTL-ready navigation sidebar component
 * 
 * Features:
 * - RTL support using logical CSS properties
 * - Hierarchical navigation with nested items
 * - Active state detection
 * - Clean, minimal design
 */
export function Sidebar({ navItems, currentPath = '' }: SidebarProps) {
  return (
    <nav className="space-y-0">
      {navItems.map((item) => (
        <div key={item.href} className="mb-1">
          <NavLink
            href={item.href}
            active={currentPath === item.href}
          >
            {item.title}
          </NavLink>
          {item.children && (
            <div className="space-y-0">
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  href={child.href}
                  active={currentPath === child.href}
                  nested
                >
                  {child.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}