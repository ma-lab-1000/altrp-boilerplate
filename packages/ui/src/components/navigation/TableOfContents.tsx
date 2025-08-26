import React from 'react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  toc: TOCItem[]
  currentSection?: string
}

/**
 * TableOfContents - RTL-ready table of contents component
 * 
 * Features:
 * - RTL support using logical CSS properties
 * - Hierarchical structure with proper indentation
 * - Active section highlighting
 * - Smooth scrolling to sections
 */
export function TableOfContents({ toc, currentSection }: TableOfContentsProps) {
  if (toc.length === 0) {
    return null
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="space-y-1">
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          data-active={currentSection === item.id}
          className={`
            block w-full text-start text-sm transition-colors py-1
            text-muted-foreground hover:text-foreground
            data-[active=true]:font-medium data-[active=true]:text-primary
            ${item.level === 1 ? 'font-medium' : item.level === 2 ? 'ps-3' : 'ps-6'}
          `}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}