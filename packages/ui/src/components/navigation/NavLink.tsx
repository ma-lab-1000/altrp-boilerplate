import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
  nested?: boolean
  className?: string
}

/**
 * NavLink - RTL-ready navigation link component
 * 
 * Features:
 * - RTL support using logical CSS properties
 * - Active state indicator with animated border
 * - Nested item support with proper indentation
 * - Smooth transitions and hover effects
 */
export function NavLink({ 
  href, 
  children, 
  active = false, 
  nested = false, 
  className = '' 
}: NavLinkProps) {
  return (
    <Link
      href={href}
      data-active={active}
      className={`
        relative flex items-center py-2 font-sans text-sm transition-colors
        text-muted-foreground hover:text-foreground
        data-[active=true]:font-medium data-[active=true]:text-primary
        ${nested ? 'ps-6' : 'ps-4'}
        ${className}
      `}
    >
      <span 
        className="
          absolute top-0 h-full w-px bg-border
          start-0
          transition-all duration-200
          data-[active=true]:w-0.5 data-[active=true]:bg-primary
        "
        data-active={active}
      />
      {children}
    </Link>
  )
}
