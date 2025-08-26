'use client'

import React from 'react'
import { Text } from '../../primitives/Text'
import { cn } from '../../lib'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: React.ReactNode
  description?: string
  sections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyright?: string
  className?: string
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  sections = [],
  socialLinks = [],
  copyright = '© 2025 LND Boilerplate. All rights reserved.',
  className = ''
}) => {
  return (
    <footer className={cn('bg-muted/50 border-t', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            {logo || (
              <div className="text-2xl font-bold text-primary mb-4">
                LND
              </div>
            )}
            {description && (
              <Text variant="muted" className="mb-4">
                {description}
              </Text>
            )}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <Text variant="small" className="text-muted-foreground">
            {copyright}
          </Text>
        </div>
      </div>
    </footer>
  )
}
